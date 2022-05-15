const notificationApi = 'https://json-server-shopee.herokuapp.com/notification';
const searchApi = 'https://json-server-shopee.herokuapp.com/search';
const highlightApi = 'https://json-server-shopee.herokuapp.com/highlight';
const productApi = 'https://json-server-shopee.herokuapp.com/product';
const categoryApi = 'https://json-server-shopee.herokuapp.com/category';
const shopApi = 'https://json-server-shopee.herokuapp.com/shop';
const userApi = 'https://json-server-shopee.herokuapp.com/user';

$(document).ready(function () {
    getData(renderNotification, notificationApi);
    getData(renderSearchHistory, searchApi);
    
    if(sessionStorage.isLogin == "true"){
        $('.app').addClass('logged');
        let userData = JSON.parse(sessionStorage.user);
        $('.navbar-user__name').text(userData.email);
        getData(renderCartBox, productApi);
    }else{
        $('.app').removeClass('logged')
    }
    let index = sessionStorage.currentPage;
    switch(index){
        case "detail-product":
            let id = parseInt(sessionStorage.currentProduct);
            loadDetailProduct(id);
            break;
        case "search":
            loadSearch();
            break;
        case "cart":
            loadCart();
            break;
        default:
            loadHome()
    }
    
})
$('#search-btn').click(function(){
    sessionStorage.searchKey = JSON.stringify($('#search-input').val());
    loadSearch();
})

$('.cart-wrapper, .view-cart-btn').click(function(){
    loadCart();
})
$('.modal__overlay').click(()=>{
    $('.modal').css('display', 'none')
})
function getData(callback, api) {
    fetch(api)
        .then(function (res) {
            return res.json();
        })
        .then(callback)
        .catch(err => {
            console.error('Error', err);
        })
}


function renderNotification(data) {
    let htmls = data.map(function (notice) {
        return `
        <li class="notice__item">
            <a href="${notice.href}" target="blank_" class="notice__link">
                <img src="${notice.img}"
                    alt="" class="notice__img">
                <div class="notice__inf">
                    <p class="notice__title">${notice.title}</p>
                    <p class="notice__desc">${notice.desc}</p>
                </div>
            </a>
        </li>`
    })
    $("#notice-list").prepend(htmls.join(''))
}
function renderSearchHistory(data) {
    let n = 0;
    let htmls = data.map(function (search) {
        if (n < 8) {
            n++;
            return `
            <li class="search__history-item list__item search-link" onclick="handelClickSearchLink(this)">
                <a class="search-keyword">${search.key}</a>
            </li>
             `
        }
    })
    $('#list-search-history').prepend(htmls.join(''));
}
function renderHighlight(data) {
    let htmls = data.map(function (highlight) {
        return `
        <a href="" class="highlight__item">
            <img src="${highlight.img}" alt=""
                class="highlight__img">
            <p class="highlight__text">${highlight.title}</p>
        </a>
        `
    })
    $(".highlight").prepend(htmls.join(''));
}
function renderCategory(data) {
    let htmls = data.map(function (category) {
        return `
        <div class="category__item list__item search-link" onclick="handelClickSearchLink(this)">
            <img src="${category.image}" alt=""
                class="category__img">
            <span class="category__text search-keyword">${category.title}</span>
        </div>
        `
    })
    $('#list-category').prepend(htmls.join(""));
    Scroll($('#list-category'), 2);
    
}

function renderSaleProduct(products, n) {
    // var n = 0;
    var htmls = products.map(function (product) {

        if (product.isSale && n >0) {
            // n++;
            n--;
            var salePer = 100 - product.sold / (product.stock + product.sold) * 100;
            return `
            <div class="sale__product list__item" onclick= "getProduct(${product.id})">
                <div class="product__img"
                    style="background-image: url(${product.image[0]});">
                </div>
    
                <div class="sale__price">
                    <span style="font-size: 1rem; text-decoration: underline;">đ</span>
                    <span>${product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                </div>
                <div class="sale__quality">
                    <span class="sale__product-sold">Đã bán ${product.sold}</span>
                    <div style="width: ${salePer}%" class="sale__product-remain"></div>
                </div>
                <div class="discount-tag">
                    <p style="margin: 0; color: red;">${product.discount}%</p>
                    <p style="margin: 4px 0 0 0;">Giảm</p>
                </div>
            </div>
            `
        }

    })
    $('#list-sale-product').prepend(htmls.join(''));
    Scroll($('#list-sale-product'), 1);
}
function renderMall(data) {
    let htmls = data.map(function (shop) {
        if (shop.isMall) {
            return `
            <div
                style="background-image: url(${shop.img});"
                class="mall__list-link">
                ${shop.highlight}
            </div>`
        }
    });
    $('#list-mall').prepend(htmls.join(''));
    Scroll( $('#list-mall'), 2)
}
function renderTrendSearch(data, n) {
    let htmls = data.map(function (search) {
        if (n>0){
            n--;
            return `
            <div class="trend-search__link list__item search-link" onclick="handelClickSearchLink(this)">
                <div class="trend-search__desc">
                    <span class="search-keyword">${search.key}</span>
                    <span style="font-size: 1.1rem; margin-top: 5px; color: var(--gray-color)">${search.result} sản
                        phẩm</span>
                </div>

                <img src="${search.image}" alt=""
                    class="trend-search__img">
            </div>`
        }
            
    })
    $('#list-trend-search').prepend(htmls.join(''));
}
function renderTopSearch(data, n) {
    let htmls = data.map(function (search) {
        if (n>0){
            n--;
            return `
            <div class="top-search__link list__item search-link" onclick="handelClickSearchLink(this)">
                <div class="top-search__img"
                    style="background-image: url(${search.image})">

                    <div class="top-tag">
                    </div>
                    <div class="bot-tag">
                        <span>Bán ${search.sold} / tháng</span>
                    </div>
                </div>
                <div class="top-search__keyword search-keyword">
                    ${search.key}
                </div>
            </div>`;
        }
            
    })
    $('#list-top-search').prepend(htmls.join(''));
    Scroll($('#list-top-search'), 1)
}
function renderRecommendProduct(data, n) {
    let htmls = data.map(function (product, index) {
        if (n>0) {
            n--;
            return createProduct(product)
        };
    });
    $('.list-product').prepend(htmls.join(''));
}

function createProduct(product){
    return`
        <div class="product" onclick="getProduct(${product.id})">
            <div class="product__link product__link--hover">
                <div class="discount-tag discount-tag--small">
                    <p style="color: red; margin: 0;">30%</p>
                    <p style="margin: 0;">Giảm</p>
                </div>
                <div class="fav-tag">
                    Yêu thích
                </div>

                <div class="product__img" style="background-image: url(${product.image[0]});"></div>
                <div class="product__inf">
                    <div class="product__name">
                        ${product.title}
                    </div>
                    <div class="product__promotions">
                        <div class="product__discount">
                            <svg class="product__discount-svg" viewBox="-0.5 -0.5 4 16">
                                <path
                                    d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"
                                    stroke-width="1" transform="" stroke="#f69113" fill="#f69113">
                                </path>
                            </svg>
                            <span class="product__discount-amount">${product.discount}% Giảm</span>
                            <svg class="product__discount-svg" viewBox="-0.5 -0.5 4 16">
                                <path
                                    d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"
                                    stroke-width="1" transform="rotate(180) translate(-3 -15)" stroke="#f69113"
                                    fill="#f69113"></path>
                            </svg>
                        </div>

                    </div>
                    <div class="product__price-group">
                        <div class="product__price product__price--old">
                            <span style="font-size: 1rem; text-decoration: underline;">đ</span>
                            <span>400.000</span>
                        </div>
                        <div class="product__price">
                            <span>${product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                        </div>
                    </div>
                    <div class="product__review">
                        <div class="product__like">
                            <i class="heart--emty fa-regular fa-heart"></i>
                            <i class="heart--fill fa-solid fa-heart"></i>
                        </div>

                        <div class="rate rate--small">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="product__quality-sold">
                            Đã bán ${product.sold}
                        </div>
                    </div>
                    <div class="product__sell-place">Hà Nội</div>
                </div>

                <div class="tag-hover">
                    Tìm sản phẩm tương tự
                </div>
            </div>
        </div>`
}
function renderListProduct(data){
    let searchKey = JSON.parse(sessionStorage.searchKey)
    let filter = searchKey.toLowerCase();
    $('#search-input').val(searchKey);
    $('.search__header-keyword').text(searchKey);
    switch(sessionStorage.sortOption){
        case "related":
            break;
        case "sold":
            data.sort((a,b) => b.sold - a.sold);
            break;
        case "price descending":
            data.sort((a,b) => a.price - b.price);
            break;
        case "price ascending":
            data.sort((a,b) => b.price - a.price);
            break;
        default:
            break;
    }
    let htmls = data.map(function(product){
        let isInclude = product.tags.some(tag => tag.toLowerCase().includes(filter))
        if(isInclude){
           return createProduct(product);
        }
       
    });
    $('.list-product').prepend(htmls.join(''));
    
    

}
/* -------------------Routing----------------- */
function loadHome() {
    sessionStorage.currentPage = "home";
    $('#search-input').val('');
    $('main').load('../pages/home.html', function () {
        scrollTop();
        getData(renderHighlight, highlightApi);
        getData(renderCategory, categoryApi);
        // getData(renderSaleProduct, productApi);
        getData((data)=>{
            renderSaleProduct(data, 10);
        }, productApi);
        getData(renderMall, shopApi);
        getData((data)=>{
            renderTrendSearch(data, 5)
        }, searchApi);
        getData((data)=>{
            renderTopSearch(data, 12)
        }, searchApi);
        getData((data)=>{
            renderRecommendProduct(data, 24)
        }, productApi);
        showSlide();
        
    })
}
function loadSearch(){
    $('#main').load('../pages/search.html', function(){
        scrollTop();
        sessionStorage.currentPage = "search";
        sessionStorage.sortOption = "related";
        getData(renderListProduct, productApi);
    })
}
function getProduct(id){
    fetch(`${productApi}/${id}`)
        .then(res => res.json())
        .then(product => {
            sessionStorage.currentProduct = JSON.stringify(product)
            loadDetailProduct();
        })
}


function loadDetailProduct() {
    $('#search-input').val('');
    sessionStorage.currentPage = "detail-product";
    const product = JSON.parse(sessionStorage.currentProduct);
    $('#main').load('../pages/product-detail.html', function () {
        scrollTop();
        $('#product-name').text(product.title);
        $('#product-price').text(product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'}))
        $('#number-sole').text(product.sold);
        $('#inventory-number').text(product.stock);
        $('#product-desc').text(product.desc);
        renderImage(product.image);
        getData((data)=>{
            renderRecommendProduct(data, 12)
        }, productApi);
    })

}
function loadCart(){
    sessionStorage.currentPage = "cart";
    $('#main').load('../pages/cart.html', function(){
        scrollTop();
        getData(renderCart, productApi);
    })
}
function renderCart(data){
    let cart = JSON.parse(sessionStorage.user).cart;
    for(let i=0; i<cart.length; i++){
        let htmls = data.map(function(product){
            if(product.id === cart[i].id){
                let total = product.price*cart[i].quantity;
                let price = convertNumberToVND(product.price);
                total = convertNumberToVND(total);
                return`
                
                <div class="product row" id="${product.id}">
                        
                    <input class="checkbox c1" type="checkbox" name="" id="">
                    <img class="c2" src="${product.image[0]}" alt="">
                    <div class="flex-r c3">
                        <p class="product__name c1">${product.title}</p>
                        <div class="flex-r group-price">
                            <p class="c money">
                                <span class="currency">₫</span>
                                <span class="product-price">${price}</span>
                            </p>
                            <div class="group-btn-quant">
                                <button class="btn btn-quant minus-btn" onclick="changeQuantity(this, -1)">-</button>
                                <input type="number" value="${cart[i].quantity}" min="1" step="1" class="btn btn-quant quant">
                                <button class="btn btn-quant plus-btn" onclick="changeQuantity(this, +1)">+</button>
                            </div>
                            <p class="c money text-primary">
                            <span class="currency">₫</span>
                            <span class="total">${total}</span>
                            </p>
                        </div>
                    </div>
                        
                   
                    
                    <p class="c4"><i class="fa-regular fa-circle-xmark remove-btn"></i></p>
                    
                </div>`
            }
            
        })
        $('.cart-product').prepend(htmls.join(''));

    }
    // handelChangeQuantityValue();
    handelRemoveItem();
    handelChecked()
    
}
function renderCartBox(data){
    let cart = JSON.parse(sessionStorage.user).cart;
    $('.cart__product-amount').text(cart.length);
    if(cart.length == 0){
        $('.cart__content').addClass('cart--empty')
    }else{
        for(let i=0; i<cart.length && i<4; i++){
            let htmls = data.map(function(product){
                if(product.id === cart[i].id){
                    return`
                    <div class="cart__product">
                        <img src="${product.image[0]}" alt="" class="cart__product-img">
                        <span class="cart__product-name">${product.title}</span>
                        <span class="cart__product-price">${product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                    </div>`
                }
            })
            $('.cart__list-product').prepend(htmls.join(''))
    
        }
    }
    
    
}

function addProduct(api, data){
    fetch(`${api}/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        console.log('Success', data);
        sessionStorage.user = JSON.stringify(data);
        $('.cart__list-product').html('');
        getData(renderCartBox, productApi)
        
    })
    .catch(error => {
        console.error('Error', error);
    })
}




function scrollTop(){
    $('html, body').animate({
        scrollTop: 0
      }, 300, function(){
   
       
      });
}

function handelClickSearchLink(element){
    let filterValue = $(element).find('.search-keyword').text();
    sessionStorage.searchKey = JSON.stringify(filterValue);
    loadSearch();
    
}
function changeQuantity(element, k){
    const product = $(element).parents('.product');
    let userData = JSON.parse(sessionStorage.user);
    const input = $(element).siblings('.quant');
    let quant = Number(input.val());
    quant += k;
    if(quant == 0){
        quant = 1;
    }
    input.val(quant);
    if(sessionStorage.currentPage === 'cart'){
        for(let i=0; i<userData.cart.length; i++){
            if(userData.cart[i].id == product.prop('id')){
                userData.cart[i].quantity = quant;
                if(userData.cart[i].quantity > 0){
                    // input.val(userData.cart[i].quantity);
                    addProduct(userApi, userData);
                    updateTotal(product);
                    updateTotalPayment();
                }
                
            }
        }
    }
   
}
function updateCart(){
    
}
function convertNumberToVND(number){
    number = JSON.stringify(number);
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
}
function convertCurrencyToNumber(currency){
    return Number(currency.split('.').join(''))
}
function updateTotal(product){
    let total = convertCurrencyToNumber(product.find('.product-price').text()) * Number(product.find('.quant').val());
    product.find('.total').text(convertNumberToVND(total));
    
}
function handelRemoveItem(){
    $('.remove-btn').click(function(){
        let product = $(this).parents('.product');
        let id = product.attr('id');
        let userData = JSON.parse(sessionStorage.user);
        for(let i=0; i< userData.cart.length; i++){
            if(userData.cart[i].id == id){
                userData.cart.splice(i,1);
            }
        }
        if(userData.cart.length == 0){
            userData.cart=[];
        }
        addProduct(userApi, userData);
        product.remove()
        updateTotalPayment();


    })
}
function handelChecked(){
    $('.checkbox').change(function(){

        let itemCart = $(this).parents('.product');
        itemCart.toggleClass('checked');
        
        updateTotalPayment();
    })
    
}
function updateTotalPayment(){
    let total = 0;
    Array.from($('.checked')).forEach(item =>{
        let totalItem = convertCurrencyToNumber(item.querySelector('.total').innerText);
        total += Number(totalItem);
    })
    $('#payment-total').text(convertNumberToVND(total));
    $('#number-product-chosen').text($('.checked').length)
    
    
}
function showSlide() {
    var sliderElements = document.querySelectorAll(".slider");
    Array.from(sliderElements).forEach(function (sliderElement) {
        let slideIndex = -1;
        var slideElements = sliderElement.getElementsByClassName("slider__link");
        var dots = sliderElement.getElementsByClassName("slider-btn-index");
        let left = sliderElement.querySelector(".slider-btn--left");
        let right = sliderElement.querySelector(".slider-btn--right");
        left.addEventListener("click", function () {
            slideIndex--;
            showDivs(slideIndex);
        });
        right.addEventListener("click", function () {
            slideIndex++;
            showDivs(slideIndex);
        })
        Array.from(dots).forEach(function (dot, index) {
            dot.addEventListener("click", function () {
                slideIndex = index;
                showDivs(slideIndex);
            })
        })
        function showDivs(k) {
            if (k >= slideElements.length) {
                slideIndex = 0;
            }
            if (k < 0) {
                slideIndex = slideElements.length - 1;
            }

            for (var i = 0; i < slideElements.length; i++) {
               
                slideElements[i].className = slideElements[i].className.replace(" active", "");
                
                dots[i].className = dots[i].className.replace(" active", "");
               
                if(i == slideIndex){
                    slideElements[i].className = slideElements[i].className.replace("slider__link", "slider__link active");
                    
                    dots[i].className = dots[i].className.replace("slider-btn-index", "slider-btn-index active");
                }
            }
        }
        function autoShow() {
            slideIndex++;
            showDivs(slideIndex);
            setTimeout(autoShow, 3000);
        }
        autoShow();
    })

}


// Scroll new list product when click button next or pre
function Scroll(listElement, numberRow) {
    const parentElement = listElement.parents('.list-wrapper');
    const nextBtn = parentElement.find('#next-btn');
    const preBtn = parentElement.find('#pre-btn');
    const itemWidth = listElement.find('.list__item').outerWidth(true);
    const numberItemView = listElement.outerWidth() / itemWidth;
    const numberItemRow = Math.round(listElement.find('.list__item').length / numberRow);
    var numberItemOverflow = numberItemRow - numberItemView;
    var position = 0;
    nextBtn.click(function () {
        preBtn.addClass("active");
        if (numberItemOverflow >= numberItemView) {
            position = position + (numberItemView - 1) * itemWidth;
            numberItemOverflow = numberItemOverflow - (numberItemView - 1);

        }
        else {
            position = position + numberItemOverflow * itemWidth;
            numberItemOverflow = 0;
            nextBtn.removeClass('active');
        }
        listElement.css("transform", "translateX(-"+position+"px)")
    });
    preBtn.click(function () {
        numberItemOverflow = numberItemOverflow + (numberItemView - 1);
        nextBtn.addClass('active')
        if (numberItemOverflow < (numberItemRow - numberItemView)) {
            position = position - (numberItemView - 1) * itemWidth;
        }
        else {
            position = 0;
            numberItemOverflow = numberItemRow - numberItemView;
            preBtn.removeClass('active');
        }
        listElement.css("transform",  "translateX(-"+position+"px)");

    })
}



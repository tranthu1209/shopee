const notificationApi = 'http://localhost:3000/notification';
const searchApi = 'http://localhost:3000/search';
const highlightApi = 'http://localhost:3000/highlight';
const productApi = 'http://localhost:3000/product';
const categoryApi = 'http://localhost:3000/category';
const shopApi = 'http://localhost:3000/shop';
const userApi = 'http://localhost:3000/user';

$(document).ready(function () {
    getData(renderNotification, notificationApi);
    getData(renderSearchHistory, searchApi);
    if(sessionStorage.isLogin == "true"){
        $('.app').addClass('logged');
        // let userName = JSON.parse(sessionStorage.user);
        // $('.navbar-user__name').text(userName.email);
        console.log(sessionStorage.user)
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
        default:
            loadHome()
    }
})
$('#search-btn').click(function(){
    loadSearch();
})
$('.cart-wrapper').click(function(){
    loadCart();
})
function getData(callback, api) {
    fetch(api)
        .then(function (res) {
            return res.json();
        })
        .then(callback)
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
            <li class="search__history-item">
                <a href="search.html">${search.key}</a>
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
        <div class="category__item list__item">
            <img src="${category.image}" alt=""
                class="category__img">
            <span class="category__text">${category.title}</span>
        </div>
        `
    })
    $('#list-category').prepend(htmls.join(""));
    Scroll($('#list-category'), 2);
    $('.category__item').click(function(){
        let filterValue = $(this).find('.category__text').text();
        $('#search-input').val(filterValue);
        loadSearch();
    })
}
function renderSaleProduct(products) {
    var n = 0;
    var htmls = products.map(function (product) {

        if (product.isSale && n < 12) {
            n++;
            var salePer = 100 - product.sold / (product.stock + product.sold) * 100;
            return `
            <div class="sale__product list__item" onclick= "getProduct(${product.id})">
                <div class="product__img"
                    style="background-image: url(${product.image[0]});">
                </div>
    
                <div class="sale__price">
                    <span style="font-size: 1rem; text-decoration: underline;">đ</span>
                    <span>${product.price}</span>
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
function renderTrendSearch(data) {
    let htmls = data.map(function (search, index) {
        if (index < 5)
            return `
            <div class="trend-search__link">
                <div class="trend-search__desc">
                    <span>${search.key}</span>
                    <span style="font-size: 1.1rem; margin-top: 5px; color: var(--gray-color)">${search.result} sản
                        phẩm</span>
                </div>

                <img src="${search.image}" alt=""
                    class="trend-search__img">
            </div>`
    })
    $('#list-trend-search').prepend(htmls.join(''));
}
function renderTopSearch(data) {
    let htmls = data.map(function (search, index) {
        if (index < 12)
            return `
            <div class="top-search__link list__item">
                <div class="top-search__img"
                    style="background-image: url(${search.image})">

                    <div class="top-tag">
                    </div>
                    <div class="bot-tag">
                        <span>Bán ${search.sold} / tháng</span>
                    </div>
                </div>
                <div class="top-search__keyword">
                    ${search.key}
                </div>
            </div>`;
    })
    $('#list-top-search').prepend(htmls.join(''));
    Scroll($('#list-top-search'), 1)
}
function renderRecommendProduct(data) {
    let htmls = data.map(function (product, index) {
        if (index < 12) {
            return `
            <div class="product" onclick="loadDetailProduct(${product.id})">
                <a class="product__link">
                    <div class="discount-tag discount-tag--small">
                        <p style="color: red; margin: 0;">30%</p>
                        <p style="margin: 0;">Giảm</p>
                    </div>
                    <div class="fav-tag">
                        Yêu thích
                    </div>

                    <div class="product__img"
                        style="background-image: url(${product.image[0]});">
                    </div>
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
                                        stroke-width="1" transform="rotate(180) translate(-3 -15)"
                                        stroke="#f69113" fill="#f69113"></path>
                                </svg>
                            </div>

                        </div>
                        <div class="product__desc">
                            <div class="product__price">
                                <span style="font-size: 1rem; text-decoration: underline;">đ</span>
                                <span>${product.price}</span>
                            </div>
                            <span class="product__quality-sold">Đã bán ${product.sold}</span>
                        </div>

                    </div>


                </a>
            </div>`
        };
    });
    $('.list-product').prepend(htmls.join(''));
}

function createProduct(product){
    return`
        <div class="product" onclick="loadDetailProduct(${product.id})">
            <a href="" class="product__link product__link--hover">
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
                            <span style="font-size: 1rem; text-decoration: underline;">đ</span>
                            <span>${product.price}</span>
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
            </a>
        </div>`
}
function renderListProduct(data){
    let filter = $('#search-input').val().toLowerCase();
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
            return createProduct(product)
        }
       
    });
    $('.list-product').prepend(htmls.join(''));
    
    

}
/* -------------------Routing----------------- */
function loadHome() {
    sessionStorage.currentPage = "home";
    $('#search-input').val('');
    $('main').load('../pages/home.html', function () {
        getData(renderHighlight, highlightApi);
        getData(renderCategory, categoryApi);
        getData(renderSaleProduct, productApi);
        getData(renderMall, shopApi);
        getData(renderTrendSearch, searchApi);
        getData(renderTopSearch, searchApi);
        getData(renderRecommendProduct, productApi);
        showSlide();
    })
}
function loadSearch(){
    $('#main').load('../pages/search.html', function(){
        sessionStorage.currentPage = "search";
        sessionStorage.sortOption = "related"
        getData(renderListProduct, productApi);
    })
}
function loadDetailProduct(id) {
    $('#search-input').val('');
    sessionStorage.currentPage = "detail-product";
    sessionStorage.currentProduct =  JSON.stringify(id);
    $('#main').load('../pages/product-detail.html', function () {
        getData(renderDetailProduct, productApi);
    })

}
function loadCart(){
    $('#main').load('../pages/cart.html')
}
function renderDetailProduct(products) {
    let productId = parseInt(sessionStorage.getItem("currentProduct"));
    products.map(function(product){
        if(product.id == productId){
            console.log(product.id)
            $(window).scrollTop(0);
            $('#product-name').text(product.title);
            $('#product-price').text(product.price)
            $('#number-sole').text(product.sold);
            $('#inventory-number').text(product.stock);
            $('#product-desc').text(product.desc);
            renderImage(product.image)
            getData(renderRecommendProduct, productApi);
            
        } 
    });
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
    const parentElement = listElement.parents('.list-wrapper')
    const nextBtn = parentElement.find('#next-btn');
    const preBtn = parentElement.find('#pre-btn');
    const itemWidth = listElement.find('.list__item').outerWidth();
    const numberItemView = listElement.outerWidth() / itemWidth;
    const numberItemRow = Math.round(listElement.find('.list__item').length / numberRow);
    var numberItemOverflow = numberItemRow - numberItemView;
    var position = 0;
    nextBtn.click(function () {
        console.log('ss')
        preBtn.addClass("active");
        if (numberItemOverflow >= numberItemView) {
            position = position + (numberItemView - 1) * itemWidth;
            numberItemOverflow = numberItemOverflow - (numberItemView - 1);

        }
        else {
            console.log(listElement);
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
        listElement.css("transform",  "translateX(-"+position+"px)")
    })
}



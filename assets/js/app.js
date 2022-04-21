
var productApi = 'http://localhost:3000/product';

function start() {
    getList(renderSearchHistory, searchApi);
    getList(renderCategory, categoryApi);
    getList(renderSaleProduct, productApi);
    getList(renderRecommendProduct, productApi);
    getList(renderTrendSearch, searchApi);
    getList(renderTopSearch, searchApi);
}



function getList(callback, api) {
    fetch(api)
        .then(function (res) {
            return res.json();
        })
        .then(callback)
}

function renderSaleProduct(products) {
    var listSaleBlock = document.querySelector('#list-sale-product');
    var n = 0;
    var htmls = products.map(function (product) {

        if(product.isSale && n < 12){
            n++;
            var salePer = 100 - product.sold / (product.stock + product.sold) * 100;
            return `
            <a href="" class="sale__product list__item">
                <div class="product__img"
                    style="background-image: url(${product.image});">
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
            </a>
            `
        }
       
    })
    listSaleBlock.innerHTML = htmls.join('');

}

function renderRecommendProduct(products) {
    var listRecommendBlock = document.querySelector('#list-recommend-product');
    var n = 0;
    var htmls = products.map(function (product) {

        if(n < 50){
            n++;
            var salePer = 100 - product.sold / (product.stock + product.sold) * 100;
            return `
            <div class="product product-recommend">
                <a href="" class="product__link product__link--hover">
                    <div class="discount-tag discount-tag--small">
                        <p style="color: red; margin: 0;">${product.discount}%</p>
                        <p style="margin: 0;">Giảm</p>
                    </div>
                    <div class="fav-tag">
                        Yêu thích
                    </div>

                    <div class="product__img"
                        style="background-image: url(${product.image});">
                    </div>
                    <div class="product__inf">
                        <div class="product__name">
                            ${product.title}
                        </div>
                        <div class="product__discount-pro"></div>
                        <div class="product__desc">
                            <div class="product__price">
                                <span style="font-size: 1rem; text-decoration: underline;">đ</span>
                                <span>${product.price}</span>
                            </div>
                            <div class="product__quality-sold">
                                <span>Đã bán ${product.sold}</span>
                            </div>
                        </div>
                        <div class="tag-hover">
                            Tìm sản phẩm tương tự
                        </div>
                    </div>

                </a>
            </div>
            `
        }
       
    })
    listRecommendBlock.innerHTML = htmls.join('');

}

var categoryApi = 'http://localhost:3000/category'
function renderCategory(categorys) {
    var listCategoryBlock = document.querySelector('#list-category');
    var htmls = categorys.map(function (category) {
        return `
        <a href="#" class="category__item">
            <img src="${category.image}" alt=""
                class="category__img">
            <span class="category__text">${category.title}</span>
        </a>
         `
       
    })
    listCategoryBlock.innerHTML = htmls.join('');

}

var searchApi = 'http://localhost:3000/search'
function renderTrendSearch(searchs) {
    var listTrendSearchBlock = document.querySelector('#list-trend-search');
    var htmls = searchs.map(function (search) {
        return `
        <a href="./search.html" class="trend-search__link">
            <div class="trend-search__desc">
                <span>${search.key}</span>
                <span style="font-size: 1.1rem; margin-top: 5px; color: var(--gray-color)">${search.result} sản
                    phẩm</span>
            </div>

            <img src="${search.image}" alt=""
                class="trend-search__img">
        </a>
         `
    })
    listTrendSearchBlock.innerHTML = htmls.join('');

}

function renderTopSearch(searchs) {
    var listTopSearchBlock = document.querySelector('#list-top-search');
    var htmls = searchs.map(function (search) {
        return `
        <a href="" class="top-search__link">
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
        </a>
         `
    })
    listTopSearchBlock.innerHTML = htmls.join('');

}

function renderSearchHistory(searchs) {
    var listSearchHistoryBlock = document.querySelector('#list-search-history');
    var n = 0
    var htmls = searchs.map(function (search) {
        if(n < 8){
            n++;
            return `
            <li class="search__history-item">
                <a href="search.html">${search.key}</a>
            </li>
             `
        }
       
    })
    listSearchHistoryBlock.innerHTML = htmls.join('');

}



function renderImage(images) {
    $('#product-img').css("background-image", "url(" + images[0] + ")");
    let htmls = images.map(function (img) {
        return `
        <div class="list__item">
            <img src="${img}" alt="">
        </div>
        `
    });
    
    $('.list-img').prepend(htmls.join(''));
    setTimeout(()=>{
        Scroll($('#list-img-top'), 1)
    }, 100)
   
    $('#list-img-top img').mouseenter(function () {
        let src = $(this).attr('src');
        $('#list-img-top img').removeClass('active')
        $(this).addClass('active');
        $('#product-img').css("background-image", "url(" + src + ")");
    });

}
$('.product__like').click(function () {
    $(this).toggleClass('product__like--liked');

})
$('.comment-like i').click(function () {
    let count = $(this).siblings('input').val();
    if ($(this).hasClass('commnet-like--liked')) {
        count--;
        $(this).removeClass('commnet-like--liked')
    } else {
        count++;
        $(this).addClass('commnet-like--liked')
    }
    $(this).siblings('input').val(count);
})




$('#add-to-cart').click(function(){
    let productId = JSON.parse(sessionStorage.currentProduct).id;
    let quantity = Number($('#quantity').val())
    if(sessionStorage.isLogin == "true"){
        let userData = JSON.parse(sessionStorage.user);
        if(userData.hasOwnProperty('cart')){
            let cart = userData.cart;
            let product = cart.find(function(item){
                return item.id == productId;
            })
            if(product){
                product.quantity = Number(product.quantity) + quantity;
            }else{
                cart.push({id: productId, quantity: quantity})
            }
        }else{
            userData.cart = [product]; 
        }
        // console.log(userData)
        addProduct(userApi, userData);
        $('.notice-card').css('display', 'block');
    }else{
        $('#login').click();
    }  
})


function renderImage(images) {
    $('#product-img').css("background-image", "url(" + images[0] + ")");
    let htmls = images.map(function (img) {
        return `
        <img class="list-img__img" src="${img}" alt="">`
    })
    $('#list-product-image').prepend(htmls.join(''));
    $('#list-product-image .list-img__img').mouseenter(function () {
        let src = $(this).attr('src');
        $('.list-img__img').removeClass('active')
        $(this).addClass('active');
        $('#product-img').css("background-image", "url(" + src + ")");
    })

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
$('#quant-plus').click(function () {
    let quant = $('#quantity').val();
    quant++;
    $('#quantity').val(quant);
})
$('#quant-minus').click(function () {
    let quant = $('#quantity').val();
    if (quant > 1) {
        quant--;
        $('#quantity').val(quant);
    }
})

$('#add-to-cart').click(function(){
    let productId = parseInt(sessionStorage.getItem("currentProduct"));
    let quantity = $('#quantity').val()
    let product = {id: productId, quantity: quantity};
    let userData = JSON.parse(sessionStorage.user);
    if(userData.hasOwnProperty('cart')){
        userData.cart.push(product);
    }else{
        userData.cart = [product];
    }
    console.log(userData)
    fetch(userApi+'/'+ userData.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
   
        .then(res => res.json)
        .then(data => {
            console.log('Success', data);
            sessionStorage.isLogin = "true";
            sessionStorage.user = JSON.stringify(data);
            location.assign("../index.html");
        })
        .catch(error => {
            console.error('Error', error);
        })
    
      
})


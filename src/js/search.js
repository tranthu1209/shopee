$('.sort-btn').click(function(){
    if(!$(this).hasClass("btn--primary")){
        
        sessionStorage.sortOption = this.id;
        $('.sort-btn').removeClass('btn--primary');
        $(this).addClass('btn--primary');
        $('.list-product').text("");
        getData(renderListProduct, productApi)
    }
})
$('.filter-btn').click(()=>{
    $('.modal').css('display', 'flex')
    $('.filter-wrapper').css('width', '90%')
})
$('.modal').click(()=>{
    $('.filter-wrapper').css('width', '0')
})


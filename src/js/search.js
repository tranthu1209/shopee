$('.sort-btn').click(function(){
    if(!$(this).hasClass("btn--primary")){
        
        sessionStorage.sortOption = this.id;
        $('.sort-btn').removeClass('btn--primary');
        $(this).addClass('btn--primary');
        $('.list-product').text("");
        getData(renderListProduct, productApi)
    }
})


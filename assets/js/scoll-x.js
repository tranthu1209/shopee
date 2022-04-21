function Scoll() {
    var scollBlocks = document.querySelectorAll(".section__content--sale");
    scollBlocks.forEach(function (scollElement) {
        let index = 1;
        let pre = scollElement.querySelector("#pre-btn");
        let next = scollElement.querySelector("#next-btn");
        var List = scollElement.querySelector(".scroll-list");
        var widthList = List.offsetWidth;
        // var widthItem = List.querySelector(".list__item").offsetWidth;
        var numberItems = List.querySelectorAll(".list__item").length;
        console.log('Số sản phẩm trong list: '+ numberItems);
        // const numberItemView = widthList / widthItem;
        // var n = numberItems / numberItemView;
        // next.addEventListener("click", function(){
        //     move(1);
        //     console.log(n);
        // })
        // pre.addEventListener("click", function(){
        //     move(-1);
            
        // })
        // function move(k){
        //     index += k;
        //     if(index > n){
        //         // List.style.transform = `translateX(${-100 * (n-1)}%)`;
        //         List.style.transform = `translateX(${-100 * (n-1)}%)`;
        //         next.classList.remove("active");
        //     }
           
        //     if(index >=1 && index<=n){
        //         List.style.transform = `translateX(${-100 * (index-1)}%)`;
        //         if(index == 1){
        //             pre.classList.remove("active");
        //         }
        //     }
        //     if(index>1){
        //         pre.classList.add("active");
        //     }
        //     if(index<n){
        //         next.classList.add("active")
        //     }
               
        // }

    })
}
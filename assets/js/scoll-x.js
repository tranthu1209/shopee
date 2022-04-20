function Scoll() {
    var scollBlocks = document.querySelectorAll(".list-wrapper");
    scollBlocks.forEach(function (scollElement) {
        let index = 1;
        let pre = scollElement.querySelector("#pre-btn");
        let next = scollElement.querySelector("#next-btn");
        var List = scollElement.querySelector(".scroll-list")
        var overflowList = List.scrollWidth;
        var widthList = List.offsetWidth;
        var n = overflowList / widthList;
        next.addEventListener("click", function(){
            move(1);
        })
        pre.addEventListener("click", function(){
            move(-1);
            
        })
        function move(k){
            index += k;
            if(index > n){
                // List.style.transform = `translateX(${-100 * (n-1)}%)`;
                List.style.transform = `translateX(${-100 * (n-1)}%)`;
                next.classList.remove("active");
            }
           
            if(index >=1 && index<=n){
                List.style.transform = `translateX(${-100 * (index-1)}%)`;
                if(index == 1){
                    pre.classList.remove("active");
                }
            }
            if(index>1){
                pre.classList.add("active");
            }
            if(index<n){
                next.classList.add("active")
            }
               
        }

    })
}
function showSlide() {
    var sliderElements = document.querySelectorAll(".slider");
    Array.from(sliderElements).forEach(function (sliderElement) {
        let slideIndex = 0;
        
        var x = sliderElement.getElementsByClassName("slider__link");
        var dots = sliderElement.getElementsByClassName("slider-btn-index");

        // Click move btn
        let left = sliderElement.querySelector(".slider-btn--left");
        let right = sliderElement.querySelector(".slider-btn--right");
        left.addEventListener("click", function(){
            slideIndex--;
            showDivs(slideIndex);
        });
        right.addEventListener("click", function(){
            slideIndex++;
            showDivs(slideIndex);
        })
        // Click dot
        Array.from(dots).forEach(function(dot, index){
            dot.addEventListener("click", function(){
                slideIndex = index;
                showDivs(slideIndex);
            })
        })
        function showDivs(k){
            if (k >= x.length) {
                slideIndex = 0;
                k = slideIndex;
            }
            if (k < 0) {
                slideIndex = x.length - 1;
                k = slideIndex
            }
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
                dots[i].className = dots[i].className.replace(" slider-btn-index-active", "")
            }
            x[k].style.display = "block";
            dots[k].className += " slider-btn-index-active";
        }
        setInterval(() => {
            showDivs(slideIndex);
            slideIndex++;
        }, 2000); // Change image every 2 seconds
    })

}


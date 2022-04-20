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

// function responsiveSlider() {

//     var sliders = document.querySelectorAll(".slider");
//     Array.from(sliders).forEach(function (slider) {
//         var sliderWidth = slider.offsetWidth;
//         var slideList = slider.querySelector(".slider-wrapper");
//         var count = 1;
//         var items = slideList.querySelectorAll(".slider__link").length;
//         var prev = slider.querySelector(".slider-btn--left");
//         var next = slider.querySelector(".slider-btn--right");
//         console.log(next)
//         window.addEventListener('resize', function () {
//             sliderWidth = slider.offsetWidth;
//         });

//         var prevSlide = function () {
//             if (count > 1) {
//                 count = count - 2;
//                 slideList.style.left = "-" + count * sliderWidth + "px";
//                 count++;
//             }
//             else if (count = 1) {
//                 count = items - 1;
//                 slideList.style.left = "-" + count * sliderWidth + "px";
//                 count++;
//             }
//         };

//         var nextSlide = function () {
//             if (count < items) {
//                 slideList.style.left = "-" + count * sliderWidth + "px";
//                 count++;
//             }
//             else if (count = items) {
//                 slideList.style.left = "0px";
//                 count = 1;
//             }
//         };

//         next.addEventListener("click", function () {
//             nextSlide();
//         });

//         prev.addEventListener("click", function () {
//             prevSlide();
//         });

//         setInterval(function () {
//             nextSlide()
//         }, 5000);
//     })


// };
// responsiveSlider();
// // window.onload = function () {
// //     responsiveSlider();
// // }


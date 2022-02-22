var slideIndex = 1;
showDivs(slideIndex);
function plusDivs(k){
    showDivs(slideIndex += k);
}
function currentDiv(k){
    showDivs(slideIndex = k);
}
function showDivs(k) {
    var i;
    var x = document.getElementsByClassName("slider-img");
    var dots = document.getElementsByClassName("slider-btn-index");
    if (k>x.length){
        slideIndex = 1;
    }
    if (k<1){
        slideIndex = x.length;
    }
    for (i = 0; i <x.length; i++){
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" slider-btn-index-active", "")
    }
    x[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " slider-btn-index-active";
}

showSlide();

function showSlide() {
  var i;
  var slides = document.getElementsByClassName("slider-img");
  var dots = document.getElementsByClassName("slider-btn-index");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" slider-btn-index-active", "")

  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " slider-btn-index-active";
  setTimeout(showSlide, 3000); // Change image every 2 seconds
}


// 
// window.onscroll = function() {myFunction()};

// var header = document.getElementById("header");
// var sticky = header.offsetTop;

// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }

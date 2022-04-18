


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


// Register
function loginFunc() {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}
function registerFunc() {

    document.getElementById("modal").style.display = "flex";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";

}
function backFunc() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "none";

}

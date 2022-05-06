
$('#login').click(function () {
    $('.modal').css("display", "flex");
    $('#login-form').css('display', 'block');
    $('#register-form').css('display', 'none');
    Validator({
        form: "#login-form",
        errorSelector: ".auth-form__message",
        formGroupSelector: ".auth-form__group",
        rules: [
            Validator.isRequired("#email"),
            Validator.isEmail('#email'),
            Validator.isRequired('#password')
        ],
        onSubmit: function (data) {
            fetch(userApi)
                .then(res => res.json())
                .then(res=> {
                    res.filter(user => {
                        if(user.email === data.email && user.password === data.password){
                            sessionStorage.isLogin = "true";
                            sessionStorage.user = JSON.stringify(user);
                            console.log(user)
                            location.assign("../index.html");
                        }
                            
                    })
                    
                })
                .catch(error => {
                    console.error('Error', error);
                })
                
            // console.log(data);
        }
    })
})

$('#register').click(function () {
    $('.modal').css("display", "flex");
    $('#register-form').css('display', 'block');
    $('#login-form').css('display', 'none');
    Validator({
        form: "#register-form",
        errorSelector: ".auth-form__message",
        formGroupSelector: ".auth-form__group",
        rules: [
            Validator.isRequired("#email"),
            Validator.isEmail('#email'),
            Validator.isRequired('#password'),
            Validator.isRequired('#password-confirmation'),
            Validator.isConfirmed('#password-confirmation', function () {
                return document.querySelector('#register-form #password').value;
            }, 'Mật khẩu nhập vào không chính xác'),
            Validator.isRequired('input[name="gender"]'),
        ],
        onSubmit: function (data) {
            data.cart = [];
            fetch(userApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(data => {
                    sessionStorage.user = JSON.stringify(data)
                    console.log('Success', data);
                    sessionStorage.isLogin = "true";
                    // location.assign("../index.html");
                })
                
                .catch(error => {
                    console.error('Error', error);
                })
            
        }
    });
})

$('#logout').click(function(){
    sessionStorage.isLogin = 'false';
    sessionStorage.user = '';
    location.assign('../index.html')
    loadHome();
})


$('.auth-form__switch').click(function(){
    let formName = $(this).parents('.auth-form').attr('id');
    if(formName == 'login-form'){
        $('#register').click();
    }else{
        $('#login').click()
    }
})
$('.auth-form__control-back').click(function(){
    $('.modal').css("display", "none");
   
})



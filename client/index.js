$(document).ready(function() {
    $('#login-content').hide();

    if(localStorage.getItem('token')){
        isLogin(true);
    } else {
        isLogin(false);
    }

    $('#login_click').click(function() {
        console.log("show form login")
        $('#login-content').show()
        $('#login_form').show()
        $('#register_form').hide()
        $('#google_signin').show()
    })

    $('#login_form').submit(function() {
        event.preventDefault()
    })

    $('#register_click').click(function() {
        console.log("show form register")
        $('#login-content').show()
        $('#register_form').show()
        $('#login_form').hide()
    })

    $('#register_form').submit(function() {
        event.preventDefault()
    })

    $('#sign_in').click(function() {
        $('#login-content').show()
        $('#register_form').hide()
        $('#login_form').show()
    })
})

function register() {
    console.log($('#emailReg').val())
    console.log($('#pwReg').val())
    $.ajax({
        url: 'http://localhost:3000/users/register',
        method: 'POST',
        data: {
            email: $('#emailReg').val(),
            password: $('#pwReg').val()
        }
    })
    .done(data => {
        $('#register_form').hide()
        $('#login_form').show()
    })
    .fail(err => {
        console.log(err)
    }) 
}

function isLogin(input) {
    if(input == false) {
        console.log("login is ===>", input)
        $('#login-content').hide();
        $('#main-content').hide();
    } else {
        console.log("login is ===>", input)
        $('#main-content').show();
    }
}
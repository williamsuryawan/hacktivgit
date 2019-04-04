
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log("cek apa isi ini====", googleUser.getAuthResponse())
    
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("cek token google", id_token)
    $.ajax({
        url: `${baseURL}/users/login`,
        method: 'POST',
        data: {
          id_token: id_token,
          loginVia: 'googleSignIn'
        }
    })
        .done(data => {
          localStorage.setItem('token', data.token);
          isLogin(true);
          $('#login-content').hide();
        })
        .fail(error => {
          console.log(error)
        })

}

function login() {
    console.log($('#emailLogin').val())
    console.log($('#pwLogin').val())
    $.ajax({
        url: 'http://localhost:3000/users/login',
        method: 'POST',
        data: {
            email: $('#emailLogin').val(),
            password: $('#pwLogin').val(),
            loginVia: 'website'
        }
    })
    .done(data => {
        localStorage.setItem('token', data.token)
        isLogin(true);
        $('#login-content').hide();
    })
    .fail(err => {
        console.log(err)
    })
} 

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token');
    $('#main-content').hide();
    $('#login-content').hide();
}

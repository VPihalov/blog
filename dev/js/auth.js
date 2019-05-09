$(function () {
    //toggle 4
    var flag = true;
    $('.switch-button').on('click', function(e) {
        e.preventDefault();
        if (flag) {
            flag = false;
            $('.register').show('slow');
            $('.login').hide();
        } else {
            flag = true;
            $('.login').show('slow');
            $('.register').hide()
        }
    });

});

//register
$('.register-button').on('click', function (e) {
    e.preventDefault();
    var data = {
        login: $('#register-login').val(),
        password: $('#register-password').val(),
        passwordConfirm: $('#register-password-confirm').val()
    };
    console.log("data", data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application.json',
        url: '/api/auth/register',
        crossDomain: true,
        xhrFields: {withCredentials: true},
        header: 'Access-Control-Allow-Origin: *'
    }).done(function (data) {
        console.log("data", data)
    })
});


$(function () {

    var editor = new MediumEditor('#post-body', {
        placeholder: {
            text: '',
            hideOnClick: true
        }
    });

    function removeErrors() {
        $('.post-form p.error').remove();
        $('.post-form input, #post-body').removeClass('error')
    }

    //clear
    $('.post-from input, #post-body').on('focus', function (e) {
        removeErrors()
    });

    //publish
    $('.publish-button').on('click', function (e) {
        e.preventDefault();
        removeErrors();

        var data = {
            title: $('#post-title').val(),
            body: $('#post-body').html()
        };
        console.log(`data`, data);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/post/add'
            // crossDomain: true,
            // xhrFields: {withCredentials: true},
            // header: 'Access-Control-Allow-Origin: *'
        }).done(function (data) {
            console.log(`data`, data)
            if (!data.ok) {
                $('.post-form h2').after('<p class="error">' + data.error + '</p>');
                if (data.fields) {
                    data.fields.forEach(function (item) {
                        $('#post-' + item).addClass('error')
                    })
                }
            } else {
                // $('.register h2').after('<p class="success">Регистрация прошла успешно</p>')
                $(location).attr('href', '/')
            }
        })
    })
});
$(function () {
    console.log('test');
    var commentForm;
    //add form
    $('#new, #reply').on('click', function () {
        console.log('test');
        commentForm = $('form.comment').clone(true, true);  //second true - cloning include all behaviours, events...
        if($(this).attr('id') === 'new') {
            commentForm.appendTo('.comment-list')
        }

        commentForm.css({display: 'flex'})
    });

    //publish
    $('form.comment .send').on('click', function (e) {
        e.preventDefault();
        // removeErrors();

        var data = {
            body: $('#post-body').html()
        };
        // console.log(`data`, data);
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

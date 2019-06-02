const express = require('express');
const router = express.Router();
const models = require('../models');
const TurndownService = require('turndown');

//GET for post
router.get('/add', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if (!userId || !userLogin) {
        res.redirect('/')
    } else {
        res.render('post/add', {
            user: {
                id: userId,
                login: userLogin
            }
        })
    };

});

// POST is add
router.post('/add', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if (!userId || !userLogin) {
        res.redirect('/')
    } else {
        const title = req.body.title.trim().replace( / +(?= )/g, ' ');  //убираем пробелы в начале/конце и заменяем два пробела на один
        const body = req.body.body;
        const turndownService = new TurndownService()

        if (!title || !body) {
            const fields = [];
            if (!title) fields.push('title');
            if (!body) fields.push('body');

            res.json({
                ok: false,
                error: 'Все поля должны быть заполнены!',
                fields
            });
        }  else if (body.length > 1500) {
            res.json({
                ok: false,
                error: 'Длина заголовка от 3 до 64 символов!',
                fields: ['title']
            });
        }  else if (body.length < 3) {
            res.json({
                ok: false,
                error: 'Длина текста должна быть не менее трех символов',
                fields: ['body']
            });
        } else {
            models.POST.create({
                title,
                body: turndownService.turndown(body),
                owner: userId
            }).then(post => {
                console.log(`post`, post);
                res.json({
                    ok: true
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    ok: false
                })
            })

        }
    };



});

module.exports = router;
const express = require('express');
const bcrypt = require('bcrypt-nodejs');  //may use passport package
const router = express.Router();
const models = require('../models');

//POST is authorized
router.post('/register', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const saltRounds = 5;

    if (!login || !password || !passwordConfirm) {
        res.json({
            ok: false,
            error: "Все поля должны быть заполнены",
            fields: ['login', 'password', 'passwordConfirm'] //поля, которые необходимо подсветить красным
        })
    } else if (login.length < 3 || login.length > 16) {
        res.json({
            ok: false,
            error: "Длина логина должна быть от 3 до 16 символов",
            fields: ['login']
        })
    } else if (password != passwordConfirm){
        res.json({
            ok: false,
            error: "Пароли не совпадают",
            fields: ['password', 'passwordConfirm']
        })
    } else {
        bcrypt.hash(password, null, null, (err, hash) => {
            models.USER.create({
                login: login,
                password: hash
            }).then(user => {
                console.log(user);
                res.json({
                    ok: true
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    ok: false,
                    error: "Ошибка, попробуйте позже. Возможно такой логин уже зарегистрирован",
                    fields: ['login']
                })
            })
        });
    }
});

module.exports = router;
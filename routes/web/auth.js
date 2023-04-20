var express = require('express');
var router = express.Router();
const md5 = require('md5')

// 导入模型
const UserModel = require('../../models/UserModel')

//  注册
router.get('/reg', function (req, res, next) {
    //  响应HTML内容
    res.render('auth/reg');

});


//  注册用户
router.post('/reg', function (req, res, next) {

    // 做表单验证

    // 获取请求体的数据
    UserModel.create({ ...req.body, password: md5(req.body.password) }, (err, data) => {
        if (err) {
            res.status(500).send('注册失败');
            return;
        }
        const msg = '注册成功';
        const url = '/login';
        res.render('success', { msg, url })

    })

});



//  登录
router.get('/login', function (req, res, next) {
    //  响应HTML内容
    res.render('auth/login');

});



//  登录操作
router.post('/login', function (req, res, next) {

    // 查询数据库
    const { username, password } = req.body

    // 获取请求体的数据
    UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            res.status(500).send('登录失败');
            return;
        }
        if (!data) {
            return res.send('账号或者密码错误')
        }

        // 写入  session
        req.session.username = data.username;
        req.session._id = data._id;

        //  登陆成功的响应
        res.render('success', { msg: '登陆成功', url: '/account' })

    })

});


//  退出登录
router.post('/logout', function (req, res, next) {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', { msg: '退出成功', url: '/login' })
    })

});


module.exports = router;

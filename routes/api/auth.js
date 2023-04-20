var express = require('express');
var router = express.Router();
const md5 = require('md5')

// 导入模型
const UserModel = require('../../models/UserModel')

//  导入  jwt
const jwt = require('jsonwebtoken');


//  登录操作
router.post('/login', function (req, res, next) {

    // 查询数据库
    const { username, password } = req.body

    // 获取请求体的数据
    UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            res.json({
                code: '2001',
                msg: '数据库读取失败',
                data: null
            })
            return;
        }
        if (!data) {
            return res.json({
                code: '2002',
                msg: '账号或者密码错误',
                data: null
            })
        }


        //  创建  token
        const token = jwt.sign({
            username: data.username,
            _id: data._id
        }, 'atguigu', {
            expiresIn: 60  //  单位是 秒
        });

        // 响应  token
        res.json({
            code: '0000',
            msg: '登陆成功',
            data: token
        })

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

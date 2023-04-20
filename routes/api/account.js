const express = require('express');
//  导入  jwt
const jwt = require('jsonwebtoken');
// 声明中间件
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');
// 导入 moment
const moment = require('moment')
const AccountModel = require('../../models/AccountModel');

const router = express.Router();


/* GET home page. */
//  记账本的列表
router.get('/account', checkTokenMiddleware, function (req, res, next) {
    //  获取所有的账单信息
    //  读取集合信息
    AccountModel.find().sort({ time: -1 }).exec((err, data) => {
        if (err) {
            res.json({
                // 响应编号
                code: '1001',
                // 响应的信息
                msg: '读取失败',
                // 响应的数据
                data: null
            })
            return;
        }
        res.json({
            // 响应编号
            code: '0000',
            // 响应的信息
            msg: '读取成功',
            // 响应的数据
            data: data
        })
    })



});

//  获取单个账本的信息
router.get('/account/:id', checkTokenMiddleware, function (req, res, next) {
    //  获取id参数
    let { id } = req.params;
    // 查询数据库
    AccountModel.findById(id, (err, data) => {
        if (err) {
            res.json({
                // 响应编号
                code: '1004',
                // 响应的信息
                msg: '读取失败',
                // 响应的数据
                data: null
            })
            return;
        }
        res.json({
            // 响应编号
            code: '0000',
            // 响应的信息
            msg: '读取成功',
            // 响应的数据
            data: data
        })
    })

});

//  添加记录
router.get('/account/create', checkTokenMiddleware, function (req, res, next) {
    res.render('create', { title: 'Express' });

});

// 新增记录
router.post('/account', checkTokenMiddleware, function (req, res, next) {
    // 获取请求体的数据
    let data = req.body;
    // 表单验证

    //  写入数据
    AccountModel.create({
        ...data,
        // 修改time 值  从string转为Date
        time: moment(data.time).toDate()

    }, (err, data) => {
        if (err) {
            res.json({
                // 响应编号
                code: '1002',
                // 响应的信息
                msg: '插入失败',
                // 响应的数据
                data: null
            })
            return;
        }
        res.json({
            // 响应编号
            code: '0000',
            // 响应的信息
            msg: '添加成功',
            // 响应的数据
            data: data
        })


    })
});

//  删除记录
router.delete('/account/:id', checkTokenMiddleware, function (req, res, next) {
    //  获取  params的id

    let id = req.params.id;
    // 删除
    AccountModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.json({
                // 响应编号
                code: '1003',
                // 响应的信息
                msg: '插入失败',
                // 响应的数据
                data: null
            })
            return;
        }
        // 提醒
        res.json({
            // 响应编号
            code: '0000',
            // 响应的信息
            msg: '删除成功',
            // 响应的数据
            data: {}
        })
    })

});

// 更新记录
router.patch('/account/:id', checkTokenMiddleware, function (req, res, next) {
    //  获取  params的id
    let id = req.params.id;

    // 获取请求体的数据
    let data = req.body;
    // 表单验证

    // 更新数据
    AccountModel.updateOne({
        _id: id

    }, data, (err, data) => {
        if (err) {
            res.json({
                // 响应编号
                code: '1005',
                // 响应的信息
                msg: '更新失败',
                // 响应的数据
                data: null
            })
            return;
        }
        // 再次查询数据库  获取单条数据
        // 查询数据库
        AccountModel.findById(id, (err, data) => {
            if (err) {
                res.json({
                    // 响应编号
                    code: '1004',
                    // 响应的信息
                    msg: '读取失败',
                    // 响应的数据
                    data: null
                })
                return;
            }
            res.json({
                // 响应编号
                code: '0000',
                // 响应的信息
                msg: '更新成功',
                // 响应的数据
                data: data
            })

        })



    })
});



module.exports = router;

const express = require('express');
// 导入 moment
const moment = require('moment')

const AccountModel = require('../../models/AccountModel');

// 声明中间件检测登录
const checkLoginMiddleware = require('../../middlewares/checkloginMiddleware')

// 创建路由对象
const router = express.Router();

//  添加首页路由规则
router.get('/', function (req, res, next) {
  // 重定向到 /account
  res.redirect('/account')
})

/* GET home page. */
//  记账本的列表
router.get('/account', checkLoginMiddleware, function (req, res, next) {

  //  获取所有的账单信息
  //  读取集合信息
  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      res.status(500).send('读取失败');
      return;
    }
    res.render('list', { accounts: data, moment: moment });
  })

});

//  添加记录
router.get('/account/create', checkLoginMiddleware, function (req, res, next) {
  res.render('create', { title: 'Express' });
});

// 新增记录
router.post('/account', checkLoginMiddleware, function (req, res, next) {
  // 获取请求体的数据
  let data = req.body;

  //  写入数据
  AccountModel.create({
    ...data,
    // 修改time 值  从string转为Date
    time: moment(data.time).toDate()

  }, (err, data) => {
    if (err) {
      res.status(500).send('插入失败');
      return;
    }
    const msg = '添加成功';
    const url = '/account';
    res.render('success', { msg, url })


  })
});

//  删除记录
router.get('/account/:id', checkLoginMiddleware, function (req, res, next) {
  //  获取  params的id

  let id = req.params.id;
  // 删除
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send('插入失败');
      return;
    }
    // 提醒
    res.render('success', { msg: '删除成功', url: '/account' })
  })

});



module.exports = router;

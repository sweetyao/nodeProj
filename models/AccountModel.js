const mongoose = require('mongoose');


// 设置集合中文档的属性以及属性值的类型
let AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: Date,
    type: {
        type: Number,
        default: -1
    },
    account: {
        type: Number,
        required: true
    },
    remarks: String,
    price: Number
});

// 创建模型对象   对文档操作的封装对象
let AccountModel = mongoose.model('accounts', AccountSchema);

module.exports = AccountModel;
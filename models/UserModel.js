const mongoose = require('mongoose');


// 设置集合中文档的属性以及属性值的类型
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

// 创建模型对象   对文档操作的封装对象
let UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
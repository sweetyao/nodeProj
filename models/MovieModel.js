const mongoose = require('mongoose');


// 设置集合中文档的属性以及属性值的类型
let MovieSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
});

// 创建模型对象   对文档操作的封装对象
let MovieModel = mongoose.model('movies', MovieSchema);

module.exports = MovieModel;
/* *
* @param {*} success   数据库连接成功的回调
* @param {*} error   数据库连接失败的回调
 */
module.exports = function (success, error) {
    if (typeof error !== 'function') {
        error = () => {
            console.log('连接失败');
        }
    }

    // 导入  mongoose
    // node版本不能过低，不然会有报错

    const mongoose = require('mongoose');

    const { DBHOST, DBPORT, DBNAME } = require('../config/config')

    // 设置strictQuery
    mongoose.set('strictQuery', true)

    // 链接mongodb 服务                 数据库名
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)


    //  设置回调
    // 设置连接成功的回调  once 一次  时间回调函数只执行一次
    mongoose.connection.once('open', () => {
        success();
    })

    // 连接失败
    mongoose.connection.on('error', () => {
        error();
    })

    // 连接关闭
    mongoose.connection.on('close', () => {
        console.log('连接关闭');
    })

}

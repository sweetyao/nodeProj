// 声明中间件检测token
module.exports = (req, res, next) => {
    // 获取token
    const token = req.get('token');
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token 缺失',
            data: null
        })
    }

    //  校验  token
    jwt.verify(token, 'atguigu', function (err, data) {
        if (err) {
            return res.json({
                code: '2004',
                msg: 'token 校验失败',
                data: null
            });
        }
        //  如果  token  校验成功
        next()
    })

}

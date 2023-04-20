// 导入
const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
// 获取  db  对象
const db = low(adapter)

// 初始化数据
// Set some defaults
db.defaults({ posts: [], user: {} })
    .write()

// Add a post
//  写入数据
// db.get('posts')
//     .push({ id: 2, title: 'lowdb is awesome' })

//     .write()
db.get('posts')
    .unshift({ id: 3, title: 'lowdb is awesome' })

    .write()

// // 获取单条数据
let res1 = db.get('posts').find({ id: 1 }).value();
console.log(res1);

// 获取数据
console.log(db.get('posts').value());



// 删除数据
let res = db.get('posts').remove({ id: 3 }).write();

// 更新数据
db.get('posts').find({ id: 1 }).assign({ title: '今天下雨' }).write();

console.log(res);

// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
    .write()
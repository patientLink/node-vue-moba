const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {type: String},
  password: {
    type: String, 
    select: false, // 默认不返回password
    set(val) { // 对由前端接收到的密码进行散列加密
      return require('bcrypt').hashSync(val, 10)
    }}
})

module.exports = mongoose.model('AdminUser', schema)
module.exports = app => {
  const express = require('express')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')

  const router = express.Router({
    mergeParams: true
  })
  

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除资源
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 资源列表
  router.get('/',  async (req, res) => {
    const queryOptions = {};
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    // if(req.Model.modelName === 'Article') {
    //   queryOptions.populate = 'categories'
    // }
    // console.log(req.app)
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  // 资源中间件
  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads'  })

  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://pvp.patientlink.cn/uploads/${file.filename}`
    res.send(file)
  })

  // 用户的id、password、token之间的关系:
  // 创建用户:接收前端传来的username和password，同时给password哈希化(hashSync)，存到数据库中
  // 登录:对比username和数据库中的数据，再对比password(compareSync)，验证成功后返回由对应用户的
  //      id和app.secret生成的token
  // 登录权限校验:接收前端请求头中的authorization，取出其中的token值，与app.secret还原回id，再
  //     取出数据库中的用户信息放入req中


  app.post('/admin/api/login', async (req, res) => {
    const {username, password} = req.body
    // 1.根据用户名找用户
    
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')
    // if(!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }

    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    if(!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    
    // 3.返回token
    
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.setHeader('User', user.username)
    res.send({token})
  })

  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const Hero = mongoose.model('Hero')
  const CommonSkill = mongoose.model('CommonSkill')
  const Item = mongoose.model('Item')
  const Video = mongoose.model('Video')
  const Intro = mongoose.model('Intro')
  const Ad = mongoose.model('Ad')

  // 新闻列表
  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    let cats = await Category.aggregate([{
        $match: {
          parent: parent._id
        }
      }, 
      { 
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      }
    ])
    // 取_id最大的也即最新的资源 数量限制为5
    cats.forEach(v => {
      v.newsList.reverse()
      v.newsList = v.newsList.slice(0,5)
    })

    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: {
          $in: subCats
        }
      }).sort({_id:-1}).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门' ?
          news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  // 视频列表
  router.get('/videos/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '精彩视频'
    })
    let cats = await Category.aggregate([{
        $match: {
          parent: parent._id
        }
      }, // 过滤数据
      { // 关联查询
        $lookup: {
          from: 'videos',
          localField: '_id',
          foreignField: 'categories',
          as: 'videoList'
        }
      }
    ])
    cats.forEach(v => {
      v.videoList.reverse()
      v.videoList = v.videoList.slice(0,4)
    })
    res.send(cats)
  })

  // 攻略列表
  router.get('/intros/list', async (req, res) => {
    const typeToName = ['最新','英雄','新手','官方','同人']
    const payload = req.query || {}
    const query = {type: 5, page: 0}

    if(payload.page) {
      let page = parseInt(payload.page)
      if(!isNaN(page)) {
        query.page = page
      }
    }

    if(payload.type) {
      let type = parseInt(payload.type)
      if(type < 6 && type >= 0) {
        query.type = type
      }
    }

    const parent = await Category.findOne({
      name: '图文攻略'
    })
    let cats = await Category.aggregate([{
        $match: {
          parent: parent._id,
          name: typeToName[query.type]
        },
      }, // 过滤数据
      { // 关联查询
        $lookup: {
          from: 'intros',
          localField: '_id',
          foreignField: 'categories',
          as: 'introList'
        }
      },
      // { // 限制数量 一次最多访问4条
      //   $addFields: {
      //     introList: {
      //       $slice: ['$introList', query.page*4, 4]
      //     }
      //   }
      // }
    ])
    cats.forEach(v => {
      v.introList.reverse()
      v.introList = v.introList.splice(query.page*4, 4)
    })

    res.send(cats)
  })

  // 英雄列表
  router.get('/heroes/list', async (req, res) => {

    const parent = await Category.findOne({
      name: '英雄列表'
    })
    const cats = await Category.aggregate([{
        $match: {
          parent: parent._id
        }
      }, 
      { 
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: {
          $in: subCats
        }
      }).limit(10).lean()
    })
    res.send(cats)
  })

  // 广告列表
  router.get('/ads/list', async (req, res) => {
    const payload = req.query || {name: 'home'}
    const cats = await Ad.aggregate([
      {
        $match: {
          name: payload.name
        }
      }, 
      { 
        $unwind: '$items'
      },
      {
        $sort: {'items._id': -1}
      },
      {
        $project: {_id: 0, items: 1}
      }
    ])
    let subCats = cats.slice(0,3);
    subCats = subCats.map((item, i) => {
      return {
        _id: item.items._id,
        url: item.items.url,
        img: item.items.image
      }
    })
    res.send(subCats)
  })

  // 文章详情
  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean()
    data.related = await Article.find().where({
      categories: {
        $in: data.categories
      }
    }).limit(2)

    res.send(data)
  })

  // 攻略详情
  router.get('/intros/:id', async (req, res) => {
    const data = await Intro.findById(req.params.id).lean()
    data.related = await Intro.find().where({
      categories: {
        $in: data.categories
      }
    }).limit(2)
    res.send(data)
  })


  // 英雄详情
  router.get('/heroes/:id', async (req, res) => {
    const data = await Hero
      .findById(req.params.id)
      .populate('categories items1 items2 partners.hero partners1.hero partners2.hero recommendSkills.common')
      .lean()
    res.send(data)
  })


  app.use('/web/api', router)
}
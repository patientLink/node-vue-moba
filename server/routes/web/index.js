module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  // const News = require('../../models/Article')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const Hero = mongoose.model('Hero')
  const CommonSkill = mongoose.model('CommonSkill')
  const Item = mongoose.model('Item')
  const Video = mongoose.model('Video')
  const Intro = mongoose.model('Intro')

  // 初始化新闻数据
  // router.get('/news/init', async (req, res) => {
  //   const parent = await Category.findOne({
  //     name: '新闻资讯'
  //   })
  //   const cats = await Category.find().where({
  //     parent: parent
  //   }).lean()
  //   const newsTitles = ["【520情侣皮肤】所有等待，只为重逢", "UI改造日志第四期：背包系统优化在即，局内快捷消息更智能！", "《五虎上将交响曲》揭秘，一起来看看你的音乐公开课随堂笔记吧！", "0元免流畅玩包，轻轻松松上王者", "王者荣耀联合乘车码送豪华大礼，五五开黑不氪金！", "5月20日全服不停机更新公告", "时之恋人皮肤及商城赠礼中心皮肤展示动画显示异常问题说明", "5月20日英雄平衡性调整公告", "5月19日体验服停机更新公告", "跨系统角色转移后点亮守护星活动蔷薇之心可重复获取处理公告", "爱在峡谷 甜蜜520", "DIY告白信 520陪您花式告白", "峡谷迎初夏，好礼领不停", "黄忠-烈魂五虎上将限定皮肤即将上架，缤纷好礼齐降临", "“五五打卡游”活动开启", "虎牙明星主播踢馆名校战队，峡谷高材生与学霸的荣耀对决", "2020年KPL春季赛常规赛最佳阵容及最佳选手评选方式公布", "2020年KPL春季赛季后赛赛程赛制公布，5月28日16:00热血开战", "【原创内容大赛音乐比赛】优秀作品合集（二）", "大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态"]
  //   const newsList = newsTitles.map(title => {
  //     const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
  //     return {
  //       categories: randomCats.slice(0, 2),
  //       title: title
  //     }
  //   })
  //   await Article.deleteMany({})
  //   await Article.insertMany(newsList)
  //   res.send(newsList)
  // })

  // 新闻列表
  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    let cats = await Category.aggregate([{
        $match: {
          parent: parent._id
        }
      }, // 过滤数据
      { // 关联查询
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      // { // 限制数量
      //   $addFields: {
      //     newsList: {
      //       $slice: ["$newsList", 5]
      //     }
      //   }
      // }
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

    // 新闻列表
  // router.get('/news/list', async (req, res) => {
  //   const parent = await Category.findOne({
  //     name: '新闻资讯'
  //   })
  //   console.log(parent)
  //   const cats = await Category.aggregate([
  //     {
  //       $match: {
  //         parent: parent._id
  //       }
  //     }, // 过滤数据
  //     { // 关联查询
  //       $lookup: {
  //         from: 'articles',
  //         localField: '_id',
  //         foreignField: 'categories',
  //         as: 'newsList'
  //       }
  //     }, 
  //     { // 限制数量
  //       $addFields: {
  //         newsList: {
  //           $slice: ['$newsList', 5]
  //         }
  //       }
  //     }
  //   ])
  //   const subCats = cats.map(v => v._id)
  //   cats.unshift({
  //     name: '热门',
  //     newsList: await Article.find().where({
  //       categories: {
  //         $in: subCats
  //       }
  //     }).populate('categories').limit(5).lean()
  //   })

  //   cats.map(cat => {
  //     cat.newsList.map(news => {
  //       news.categoryName = cat.name === '热门' ?
  //         news.categories[0].name : cat.name
  //       return news
  //     })
  //     return cat
  //   })
  //   res.send(cats)
  // })

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
      },
      // { // 限制数量
      //   $addFields: {
      //     videoList: {
      //       $slice: ['$videoList', 4]
      //     }
      //   }
      // }
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
    console.log(payload)

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
      }, // 过滤数据
      { // 关联查询
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }
      // { // 限制数量
      //   $addFields: {
      //     heroList: {
      //       $slice: ['$heroList', 5]
      //     }
      //   }
      // }
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

    // cats.map(cat => {
    //   cat.heroList.map(hero => {
    //     hero.categoryName = cat.name === '热门' ?
    //       hero.categories[0].name : cat.name
    //     return hero
    //   })
    //   return cat
    // })

    res.send(cats)
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
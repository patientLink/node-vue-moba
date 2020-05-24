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
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["【520情侣皮肤】所有等待，只为重逢", "UI改造日志第四期：背包系统优化在即，局内快捷消息更智能！", "《五虎上将交响曲》揭秘，一起来看看你的音乐公开课随堂笔记吧！", "0元免流畅玩包，轻轻松松上王者", "王者荣耀联合乘车码送豪华大礼，五五开黑不氪金！", "5月20日全服不停机更新公告", "时之恋人皮肤及商城赠礼中心皮肤展示动画显示异常问题说明", "5月20日英雄平衡性调整公告", "5月19日体验服停机更新公告", "跨系统角色转移后点亮守护星活动蔷薇之心可重复获取处理公告", "爱在峡谷 甜蜜520", "DIY告白信 520陪您花式告白", "峡谷迎初夏，好礼领不停", "黄忠-烈魂五虎上将限定皮肤即将上架，缤纷好礼齐降临", "“五五打卡游”活动开启", "虎牙明星主播踢馆名校战队，峡谷高材生与学霸的荣耀对决", "2020年KPL春季赛常规赛最佳阵容及最佳选手评选方式公布", "2020年KPL春季赛季后赛赛程赛制公布，5月28日16:00热血开战", "【原创内容大赛音乐比赛】优秀作品合集（二）", "大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: title
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  // 新闻列表
  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    const cats = await Category.aggregate([{
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
      { // 限制数量
        $addFields: {
          newsList: {
            $slice: ['$newsList', 5]
          }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: {
          $in: subCats
        }
      }).populate('categories').limit(5).lean()
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
    const cats = await Category.aggregate([{
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
      { // 限制数量 一次最多访问4条
        $addFields: {
          introList: {
            $slice: ['$introList', query.page*4, 4]
          }
        }
      }
    ])

    res.send(cats)
  })


  // 导入召唤师技能
  // router.get('/skills/init', async (req, res) => {
  //   const rawData = [{
  //       name: '惩击',
  //       icon: 'https://game.gtimg.cn/images/yxzj/img201606/summoner/80104.jpg'
  //     },
  //     {
  //       name: '终结',
  //       icon: 'https://game.gtimg.cn/images/yxzj/img201606/summoner/80108.jpg'
  //     },
  //     {
  //       name: '狂暴',
  //       icon: 'https://game.gtimg.cn/images/yxzj/img201606/summoner/80110.jpg'
  //     },
  //     {
  //       name: '疾跑',
  //       icon: 'https://game.gtimg.cn/images/yxzj/img201606/summoner/80109.jpg'
  //     },
  //     {
  //       name: '治疗术',
  //       icon: 'https://game.gtimg.cn/images/yxzj/img201606/summoner/80102.jpg'
  //     },
  //     {
  //       name: '干扰',
  //       icon: 'https://game.gtimg.cn/images/yxzj/img201606/summoner/80105.jpg'
  //     },
  //     {
  //       name: '晕眩',
  //       icon: 'https://game.gtimg.cn/images/yxzj/img201606/summoner/80103.jpg'
  //     },
  //     {
  //       name: '净化',
  //       icon: 'https://game.gtimg.cn/images/yxzj/img201606/summoner/80107.jpg'
  //     },
  //     {
  //       name: '弱化',
  //       icon: 'https://game.gtimg.cn/images/yxzj/img201606/summoner/80121.jpg'
  //     },
  //     {
  //       name: '闪现',
  //       icon: 'https://game.gtimg.cn/images/yxzj/img201606/summoner/80115.jpg'
  //     }
  //   ]
  //   await CommonSkill.deleteMany({})
  //   await CommonSkill.insertMany(rawData)
  //   res.send(await CommonSkill.find())
  // })

  // 导入物品
  // router.get('/items/init', async (req, res) => {
  //   const rawData = [{
  //     "name": "铁剑",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1111.jpg"
  //   }, {
  //     "name": "匕首",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1112.jpg"
  //   }, {
  //     "name": "搏击拳套",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1113.jpg"
  //   }, {
  //     "name": "吸血之镰",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1114.jpg"
  //   }, {
  //     "name": "雷鸣刃",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1116.jpg"
  //   }, {
  //     "name": "冲能拳套",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1117.jpg"
  //   }, {
  //     "name": "风暴巨剑",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1121.jpg"
  //   }, {
  //     "name": "日冕",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1122.jpg"
  //   }, {
  //     "name": "狂暴双刃",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1123.jpg"
  //   }, {
  //     "name": "陨星",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1124.jpg"
  //   }, {
  //     "name": "碎星锤",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1131.jpg"
  //   }, {
  //     "name": "末世",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1126.jpg"
  //   }, {
  //     "name": "名刀·司命",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1127.jpg"
  //   }, {
  //     "name": "冰霜长矛",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1128.jpg"
  //   }, {
  //     "name": "速击之枪",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1129.jpg"
  //   }, {
  //     "name": "制裁之刃",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/11210.jpg"
  //   }, {
  //     "name": "泣血之刃",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1132.jpg"
  //   }, {
  //     "name": "无尽战刃",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1133.jpg"
  //   }, {
  //     "name": "宗师之力",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1134.jpg"
  //   }, {
  //     "name": "闪电匕首",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1135.jpg"
  //   }, {
  //     "name": "影刃",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg"
  //   }, {
  //     "name": "暗影战斧",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1137.jpg"
  //   }, {
  //     "name": "破军",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1138.jpg"
  //   }, {
  //     "name": "纯净苍穹",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/11311.jpg"
  //   }, {
  //     "name": "逐日之弓",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/91040.jpg"
  //   }, {
  //     "name": "破魔刀",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1125.jpg"
  //   }, {
  //     "name": "穿云弓",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1154.jpg"
  //   }, {
  //     "name": "破晓",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1155.jpg"
  //   }, {
  //     "name": "咒术典籍",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1211.jpg"
  //   }, {
  //     "name": "蓝宝石",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1212.jpg"
  //   }, {
  //     "name": "炼金护符",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1213.jpg"
  //   }, {
  //     "name": "圣者法典",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1214.jpg"
  //   }, {
  //     "name": "元素杖",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1216.jpg"
  //   }, {
  //     "name": "大棒",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1221.jpg"
  //   }, {
  //     "name": "破碎圣杯",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1229.jpg"
  //   }, {
  //     "name": "光辉之剑",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1223.jpg"
  //   }, {
  //     "name": "魅影面罩",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1224.jpg"
  //   }, {
  //     "name": "进化水晶",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1225.jpg"
  //   }, {
  //     "name": "血族之书",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1222.jpg"
  //   }, {
  //     "name": "炽热支配者",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1227.jpg"
  //   }, {
  //     "name": "梦魇之牙",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/12211.jpg"
  //   }, {
  //     "name": "虚无法杖",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1231.jpg"
  //   }, {
  //     "name": "博学者之怒",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1232.jpg"
  //   }, {
  //     "name": "辉月",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1239.jpg"
  //   }, {
  //     "name": "回响之杖",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1233.jpg"
  //   }, {
  //     "name": "冰霜法杖",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1234.jpg"
  //   }, {
  //     "name": "痛苦面具",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1235.jpg"
  //   }, {
  //     "name": "巫术法杖",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1236.jpg"
  //   }, {
  //     "name": "圣杯",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1226.jpg"
  //   }, {
  //     "name": "时之预言",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1237.jpg"
  //   }, {
  //     "name": "贤者之书",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1238.jpg"
  //   }, {
  //     "name": "噬神之书",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1240.jpg"
  //   }, {
  //     "name": "红玛瑙",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1311.jpg"
  //   }, {
  //     "name": "布甲",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1312.jpg"
  //   }, {
  //     "name": "抗魔披风",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1313.jpg"
  //   }, {
  //     "name": "提神水晶",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1314.jpg"
  //   }, {
  //     "name": "力量腰带",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1321.jpg"
  //   }, {
  //     "name": "熔炼之心",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1322.jpg"
  //   }, {
  //     "name": "神隐斗篷",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1323.jpg"
  //   }, {
  //     "name": "雪山圆盾",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1324.jpg"
  //   }, {
  //     "name": "守护者之铠",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1325.jpg"
  //   }, {
  //     "name": "近卫荣耀",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1724.jpg"
  //   }, {
  //     "name": "奔狼纹章",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1723.jpg"
  //   }, {
  //     "name": "反伤刺甲",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1327.jpg"
  //   }, {
  //     "name": "血魔之怒",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1328.jpg"
  //   }, {
  //     "name": "红莲斗篷",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1331.jpg"
  //   }, {
  //     "name": "霸者重装",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1332.jpg"
  //   }, {
  //     "name": "冲击铠甲",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1341.jpg"
  //   }, {
  //     "name": "不祥征兆",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1333.jpg"
  //   }, {
  //     "name": "不死鸟之眼",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1334.jpg"
  //   }, {
  //     "name": "魔女斗篷",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1335.jpg"
  //   }, {
  //     "name": "极寒风暴",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1336.jpg"
  //   }, {
  //     "name": "冰痕之握",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/13310.jpg"
  //   }, {
  //     "name": "贤者的庇护",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1337.jpg"
  //   }, {
  //     "name": "暴烈之甲",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1338.jpg"
  //   }, {
  //     "name": "神速之靴",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1411.jpg"
  //   }, {
  //     "name": "影忍之足",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1421.jpg"
  //   }, {
  //     "name": "抵抗之靴",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1422.jpg"
  //   }, {
  //     "name": "冷静之靴",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1423.jpg"
  //   }, {
  //     "name": "秘法之靴",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1424.jpg"
  //   }, {
  //     "name": "急速战靴",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1425.jpg"
  //   }, {
  //     "name": "疾步之靴",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1426.jpg"
  //   }, {
  //     "name": "狩猎宽刃",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1511.jpg"
  //   }, {
  //     "name": "游击弯刀",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1521.jpg"
  //   }, {
  //     "name": "巡守利斧",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1522.jpg"
  //   }, {
  //     "name": "追击刀锋",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1523.jpg"
  //   }, {
  //     "name": "符文大剑",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1531.jpg"
  //   }, {
  //     "name": "巨人之握",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1532.jpg"
  //   }, {
  //     "name": "贪婪之噬",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1533.jpg"
  //   }, {
  //     "name": "鼓舞之盾",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1714.jpg"
  //   }, {
  //     "name": "风灵纹章",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1713.jpg"
  //   }, {
  //     "name": "救赎之翼",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1722.jpg"
  //   }, {
  //     "name": "风之轻语",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1712.jpg"
  //   }, {
  //     "name": "极影",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1721.jpg"
  //   }, {
  //     "name": "星泉",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1725.jpg"
  //   }, {
  //     "name": "星之佩饰",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1726.jpg"
  //   }, {
  //     "name": "凤鸣指环",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1711.jpg"
  //   }, {
  //     "name": "学识宝石",
  //     "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1701.jpg"
  //   }]
  //   await Item.deleteMany({})
  //   await Item.insertMany(rawData)
  //   res.send(await Item.find())
  // })

  // 导入视频信息
  // router.get('/videos/init', async (req, res) => {
  //   const rawData = [{
  //     "categoryName": "精品栏目",
  //     "list": [{
  //       "title": "《嘴强青铜》铠：打人都没力气，还说自己是法师！",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=619144&e_code=pvpweb_m.statictypenew.type587",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052412/92eb5ffee6ae2fec3ad71c777531578f.1590296155.80a3510bbb57f17efcd3ab5dac5f45ce.230x140_67722.jpg"
  //     }, {
  //       "title": "【大仙不闹】萌新必玩英雄！小鲁班在线教你认技能",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=618534&e_code=pvpweb_m.statictypenew.type587",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052020/d6aa98398d49a3cd42996090e3467571.1589978165.d64115a107a14b946536a1ffce7c029c.230x140_53640.jpg"
  //     }, {
  //       "title": "皮肤彩蛋大揭秘！花木兰局内终极彩蛋，奇特手法才能触发！",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=618797&e_code=pvpweb_m.statictypenew.type587",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052021/d6aa98398d49a3cd42996090e3467571.1589981818.006767e78062a328b8588ca08223fc3a.230x140_60808.jpg"
  //     }, {
  //       "title": "【大仙不闹】T0英雄的陨落，这下饭的滋味我还能承受吗？",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=618796&e_code=pvpweb_m.statictypenew.type587",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052021/d6aa98398d49a3cd42996090e3467571.1589980281.39bdc0b84cf08c08991a7fe22aae5219.230x140_50398.jpg"
  //     }]
  //   }, {
  //     "categoryName": "英雄攻略",
  //     "list": [{
  //       "title": "王者荣耀s16边路上分英雄首选是谁？职业玩家都玩的英雄橘子！",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=539533&e_code=pvpweb_m.statictypenew.type623",
  //       "img": "https://puui.qpic.cn/qqvideo_ori/0/p0904oeyu12_1280_720/0"
  //     }, {
  //       "title": "王者荣耀排位日常：功能型法师张良，更偏向于控制，多游走支援！",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550203&e_code=pvpweb_m.statictypenew.type619",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190831/34ba14d7e74b333126620db8148b7a4a.1567236016.96cfd48480b6f569f5deb0869ddd8925.230x140_43156.jpg"
  //     }, {
  //       "title": "在这个模式玩钟馗，不想成辅助都难哦！",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=549402&e_code=pvpweb_m.statictypenew.type675",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190828/c81e728d9d4c2f636f067f89cc14862c.1566979174.49877d84db3db2e7e7c9dec467347647.230x140_16202.jpg"
  //     }, {
  //       "title": "猴子和兰陵王遇到神级马可，连续的反杀操作，打得两人没有脾气",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=549791&e_code=pvpweb_m.statictypenew.type641",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190829/0fed9150bb660fe087fc5b81a2b8d50b.1567084750.7a6176cf4229f5978f81c252e59b1c71.230x140_19614.jpg"
  //     }]
  //   }, {
  //     "categoryName": "赛事精品",
  //     "list": [{
  //       "title": "KPL春季赛 常规赛 VG vs DYG 第五局",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=619252&e_code=pvpweb_m.statictypenew.type587",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/13a08167955396b73c18d33a8a3434ce/0/?width=230&height=140"
  //     }, {
  //       "title": "KPL春季赛 常规赛 VG vs DYG 第四局",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=619239&e_code=pvpweb_m.statictypenew.type587",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/de5331a2ddef4aba7973f6533982bb17/0/?width=230&height=140"
  //     }, {
  //       "title": "KPL春季赛 常规赛 VG vs DYG 第三局",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=619238&e_code=pvpweb_m.statictypenew.type587",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/bd4299866f9bcf4ab4d7ce8d582b5d67/0/?width=230&height=140"
  //     }, {
  //       "title": "KPL春季赛 常规赛 VG vs DYG 第二局",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=619224&e_code=pvpweb_m.statictypenew.type587",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/097c0e4ccfe74b6bb4f9c0189bd5ca17/0/?width=230&height=140"
  //     }]
  //   }, {
  //     "categoryName": "赛事视频",
  //     "list": [{
  //       "title": "王者荣耀世冠：远游之枪华丽收割，花满楼世冠马可波罗击杀集锦",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550567&e_code=pvpweb_m.statictypenew.type751",
  //       "img": "https://puui.qpic.cn/qqvideo_ori/0/z092122i7uv_1280_720/0"
  //     }, {
  //       "title": "Djie一闪侧翼进场，梦奇小爪子疯狂乱舞！",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550792&e_code=pvpweb_m.statictypenew.type751",
  //       "img": "https://puui.qpic.cn/qqvideo_ori/0/g0921jhs0ha_1280_720/0"
  //     }, {
  //       "title": "花海云中君暴走时刻，这波三杀真的帅气！",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550566&e_code=pvpweb_m.statictypenew.type751",
  //       "img": "https://puui.qpic.cn/qqvideo_ori/0/r09212zlrm4_1280_720/0"
  //     }, {
  //       "title": "世冠雨雨关羽集锦：这就是实力！千万雄兵莫敢当，单刀匹马斩四方",
  //       "link": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550251&e_code=pvpweb_m.statictypenew.type751",
  //       "img": "https://puui.qpic.cn/qqvideo_ori/0/b0921yawkou_1280_720/0"
  //     }]
  //   }]
  //   await Video.deleteMany({})
  //   for (let cat of rawData) {
  //     const category = await Category.findOne({
  //       name: cat.categoryName
  //     })
  //     cat.list = cat.list.map(item => {
  //       item.categories = [category]
  //       return item
  //     })
  //     Video.insertMany(cat.list)
  //   }
  //   res.send(await Video.find())
  // })

  // 导入攻略信息
  // router.get('/intros/init', async (req, res) => {
  //   const rawData = [{
  //     "categoryName": "同人",
  //     "list": [ {
  //       "title": "《创世王者》——长城之战五   庆功宴",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424907",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190829/eacd38458cfba7d1012065af5c0141d4.1567058487.cd3eda659d3b0371dc9376e2ca4b0625.230x140_80409.png"
  //     }, {
  //       "title": "露娜 紫霞仙子 孙悟空 至尊宝cos：往哪跑？",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=425067",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190831/9c4e28a00fab8e6ff485c82daf7a1861.1567183527.a0dd21dbf3ca582cc920bc4d2f647d20.230x140_67799.JPG"
  //     }, {
  //       "title": "同人插画：马超帅出新高度，面对千军万马无所畏惧",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424774",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190828/3667f6a0c97490758d7dc9659d01ea34.1566958747.878a495b915f940ae21952408e90acdb.230x140_38067.jpg"
  //     }, {
  //       "title": "我家李白不可能那么可爱31  夜猎1",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424699",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190827/d63d9f8016e03a8d913cf6f4b6b1c02c.1566918578.b2f8d75c2c36b0383450330ed9fe1236.230x140_15097.jpg"
  //     }, {
  //       "title": "沈括｜多观察小地图这事，800年前他就懂！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424575",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190826/b6d767d2f8ed5d21a44b0e5886680cb9.1566806415.ede419ca10ee5ec66cde7d8ee4f77513.230x140_61786.png"
  //     }, {
  //       "title": "王者荣耀：第48章  苏烈大战钟馗，百里玄策巧妙助战",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424581",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190826/9521c1d7b2b90c010b533b0680e571c1.1566812249.dea17c7564ef2ccee85656c0314efa54.230x140_94092.png"
  //     }, {
  //       "title": "《创世王者》——第十章   长城之战四   清扫工作",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424587",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190826/eacd38458cfba7d1012065af5c0141d4.1566829001.0fa871e960418491afedeb6028686f08.230x140_80409.png"
  //     }, {
  //       "title": "王者小漫画：戏精的虞姬，项羽很无奈",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424599",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190827/858635160cca233f0db06f0ee53df356.1566867252.27e00f816a40f98912b87d9df71a9662.230x140_72617.jpg"
  //     }, {
  //       "title": "【COS偶像季】第40期：蜕变的天鹅公主——小乔",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424663",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190827/ca18223ccc9136c23ac25c3760d9954a.1566899068.2d3fa8f2cf03edec04dd4462a9682dfb.750x422_41845.jpg"
  //     }, {
  //       "title": "绝密公布！五虎上将团照上线！C位英雄居然有五把武器？！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=423202",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/10801fc69a79c3229961031e8a7af3a0/0/?width=230&height=140"
  //     }, {
  //       "title": "同人文学：在路上——稷下学院的日常（番外一）{暑期篇}",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424542",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190826/8799827c9418434cc47d7b6485e391f6.1566806457.73f25c65dfd871c72bdb516c4e0628e5.230x140_24708.jpg"
  //     }, {
  //       "title": "设计了一套稷下学院的现代风格校服",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424374",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190824/90428f9bb1a9d0a64834195f7c5ac4cb.1566640478.1735f22f977d210b10da4c4a70ea1cd0.230x140_50770.jpg"
  //     }, {
  //       "title": "司马懿：黑夜是刺客潜行最好掩护，但冲破黑暗也需你足够的勇气！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424449",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190825/59349fcbec003eac9a992bcebd6ca9e3.1566705586.c4682cbc4447fcd54f58f28e89e2ee8f.230x140_13825.jpg"
  //     }, {
  //       "title": "西施：就这样开始吧，曜，接下来还请多多指教呦，谢谢你",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424435",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190825/7fb64646a792c3821388e79d189986eb.1566662469.ec1d6f757d56eae49d367ee77cc579c1.230x140_16918.jpg"
  //     }, {
  //       "title": "【COS偶像季】第39期：青莲剑仙——李白",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424283",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190823/6e7665f0778696a59cdc87c4ce9da604.1566543888.40999bce0e478634eda6ed2a51bc09a5.128x128_6670.jpg"
  //     }, {
  //       "title": "我的稷下学院   第六章   我赌你枪里没有子弹",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424321",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190823/966a68ce35b7d043edb64b212c0cc441.1566575410.fbd21ef228a0174799e97e6720453598.230x140_16875.jpg"
  //     }]
  //   }, {
  //     "categoryName": "最新",
  //     "list": [{
  //       "title": "王者荣耀之最终幻想196章：诛仙阵中的困兽之斗！（连载中）",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460547",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020051921/c81e728d9d4c2f636f067f89cc14862c.1589896785.3ebb19e90dbcc979531918a20ca6fa2d.230x140_33990.jpg"
  //     }, {
  //       "title": "王者荣耀：如何玩好赵云？掌握好刷野节奏，上分其实很轻松",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460561",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052400/cfcd208495d565ef66e7dff9f98764da.1590252272.c0221a35c84b3e6c49c963120bfc8f6b.230x140_49587.jpg"
  //     }, {
  //       "title": "5.22体验服更新，玄策火舞双双增强，迎来曙光",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460568",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052323/66d8facfe04d7c07022166e272296829.1590249024.ba287ae38380168825870213458422b1.230x140_53651.jpg"
  //     }, {
  //       "title": "[体验服]蒙恬上分小技巧",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460574",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052319/3f8b6c21ef216a0f0d77626134d30b8b.1590232581.008627c6eb67bd2803b07c82e3fe26fb.230x140_42051.JPG"
  //     }, {
  //       "title": "手速太快会翻车，现版本唯一T0打野，敲法升级一套连招打4棍",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460591",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052411/c3a7bde100e3368f434b425bc8496085.1590292063.ffdd333ec2e78b45773f8a7d773dddc2.230x140_52047.jpg"
  //     }, {
  //       "title": "御三家扬言炖鹅久竞做到了，关键团战久竞逆天改命二换五",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460595",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052321/36ff36e5b00ae02449ed4ee20f265c2a.1590240297.2e987e7e6a3d51b19733e3ab104a09d4.230x140_83229.png"
  //     }, {
  //       "title": "王者荣耀:这些皮肤真的太稀有，有这些皮肤的玩家都是本命英雄！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460602",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052208/d41d8cd98f00b204e9800998ecf8427e.1590106202.45bae06578b4def4fbc89b01d0144b9a.230x140_66935.jpg"
  //     }, {
  //       "title": "时隔三年跳舞的舞娘终于迎来加强，貂蝉的玩家有福了附带细节教学",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460604",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052317/cfcd208495d565ef66e7dff9f98764da.1590226043.8b0ac924b730a335eed9ba948a362563.230x140_50439.jpg"
  //     }, {
  //       "title": "【王者荣耀巅峰再启】第十章 妲己爱你哟",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460610",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052413/cfcd208495d565ef66e7dff9f98764da.1590299138.2de31b9d5423efc5dba82169686e8d49.230x140_52770.jpg"
  //     }, {
  //       "title": "四个赛季的磨砺，TES状态爆棚，零封eStar首次挺进季后赛",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460614",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052414/77ed36f4b18679ce54d4cebda306117e.1590302395.da6667b5eb0b135172a138767d1f4c35.230x140_58751.jpg"
  //     }, {
  //       "title": "王者荣耀里的坦克装备，你真的了解它们嘛？",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460616",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052414/cfcd208495d565ef66e7dff9f98764da.1590303061.07006d95048b5cc3341fb6250e5fd000.230x140_70557.jpg"
  //     }, {
  //       "title": "进阶·盾山一技能后摇取消的两种方法",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460620",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052411/aed4821733b28723af6d95a483066fea.1590292577.4cbcd3dc39bd151e84634a2b92806fa0.230x140_47853.jpeg"
  //     }, {
  //       "title": "“御三家”仅剩AG超玩会，QG无缘季后赛，E星难以自我救赎？",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460622",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052412/48d7dcc6f96ef19f408b61243d02a522.1590296384.242f6ac4d23ec60dd1bc51da639a4820.230x140_49894.jpg"
  //     }, {
  //       "title": "S2王者模拟战，一图了解520更新后非主流强势的『霹雳重战』",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460652",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052415/d41d8cd98f00b204e9800998ecf8427e.1590306817.f68cb5932f55a52e03c0e24582c2b5f2.230x140_65171.png"
  //     }, {
  //       "title": "新打法边路东皇太一，前期对线强势，中期与打野互换成为关键",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460656",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052416/d41d8cd98f00b204e9800998ecf8427e.1590308176.7e486ab8a21fd60fc2903888f3db920d.230x140_55131.jpg"
  //     }, {
  //       "title": "王者荣耀：冷门节奏大师沈梦溪攻略，团战轰炸机了解一下",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=460659",
  //       "img": "https://itea-cdn.qq.com/file/tgl/2020052417/fd4a903e455f336626907f33117df1c4.1590311128.ee8835d5df0ebb4e0a2bc209f03fbbfd.230x140_76969.png"
  //     }]
  //   }, {
  //     "categoryName": "英雄",
  //     "list": [{
  //       "title": "女王出品 | 为肉辅发声！辅助类型与肉辅玩法全解析",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=424677",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190827/4b9fb5615512ad71115ed062e599de01.1566889716.90134ab702c29ce46151b5a8654f999b.230x140_12605.jpg"
  //     }, {
  //       "title": "新赛季辅助上分优选，没有坦克选廉颇，选孙膑不用看阵容",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=421872",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190807/d3d9446802a44259755d38e6d163e820.1565174139.3a8f697382408c962d68db29594e8c43.184x124_66404.jpg"
  //     }, {
  //       "title": "S16上分法师首选诸葛亮，安琪拉一控到死，她团控全场！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=421921",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190807/b93e5dee4a244e287388983768cc9e0a.1565192507.db0887289226b225c731b9e837014842.230x140_23723.jpg"
  //     }, {
  //       "title": "世冠上路都用啥？孙策橘右京已经不是首选，最强势的根本猜不到",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=421368",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190803/9d70f1cf5e7587ab741eaef46597c305.1564839804.47e16b7bbe41d270aba329d78b45d22f.230x140_57850.jpg"
  //     }, {
  //       "title": "S16一个合格辅助需要完成的六件事，能全部完成的不超过10%！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=417697",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/425196ebdeca54b84c54a20c0c5c7cae/0/?width=230&height=140"
  //     }, {
  //       "title": "Hero兵法讲堂：刺客篇",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=421633",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/760ea7e6667ce5065b305b0134e8041a/0/?width=230&height=140"
  //     }, {
  //       "title": "王者荣耀：射手遇到兰陵王都颤抖？，这几位却让他有来无回",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=420670",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190802/22348f642503adaf7d3641928e6ef285.1564728271.05622b4e034fc6ddd20662b94fc3444f.230x140_17371.jpg"
  //     }, {
  //       "title": "营地数据榜：射手榜首易主，狄仁杰微调第二都没保住，他后来居上",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=420650",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190802/c8070d27b86aa1bc7489142aa8d82a55.1564753294.ef6375f0e332fb24e691953f741a5f05.230x140_19218.jpg"
  //     }, {
  //       "title": "王者荣耀：最考验意识的三位辅助，新手玩不好，大神当成宝！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=420634",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190802/6da9003b743b65f4c0ccd295cc484e57.1564734748.c412f7ff79ce5118fc6c0f2dc7bc21f8.230x140_22324.jpg"
  //     }, {
  //       "title": "王者荣耀：射手出肉会更强？打惯了输出装的，不妨来看看吧！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=420251",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190801/6da9003b743b65f4c0ccd295cc484e57.1564635606.8cf7fc5a37204778f7abb641d3396c36.230x140_22161.jpg"
  //     }, {
  //       "title": "上分秘诀之射手，站桩射手的三件法宝！后羿实战打法简介！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=420086",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190731/b0ca4eff978167e0f1953fcea8832d3f.1564566213.f0663874be6d1c54418f87519ae9c4b4.230x140_44966.jpg"
  //     }, {
  //       "title": "草丛两个小可爱喜迎增强，妲己安琪拉下限再次提升，中路上分首选",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=420374",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190801/cfcd208495d565ef66e7dff9f98764da.1564663108.3ae6598382d0152ff4ecdeaff5c05109.230x140_23155.jpg"
  //     }, {
  //       "title": "S16辅助国服荣耀战力排榜|鬼谷子稳居前三，黑马的她排在榜首",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=420062",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190731/6da9003b743b65f4c0ccd295cc484e57.1564558615.656819319d1c8b7b96b6be2137fb78b5.230x140_62701.jpg"
  //     }, {
  //       "title": "辅助英雄又引玩家们吐槽，三种出门思路到底该选哪一种好？",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=420070",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190731/903ce9225fca3e988c2af215d4e544d3.1564562825.6823dae008c0961396585188126858ce.230x140_14746.jpg"
  //     }, {
  //       "title": "峡谷小短腿，输出扛大旗——鲁班七号 进阶攻略",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=418699",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/a8c46a69d38abc5c9892261e38185773/0/?width=230&height=140"
  //     }, {
  //       "title": "S16上分三大辅助！用瑶拿金牌，用她稳星耀！他才是王者!",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=419980",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190730/0e5d3556154fd589bfd3fd1940ef2905.1564476384.d5ce7b3a5f6d90008d2e867cabddc0fc.230x140_58999.jpg"
  //     }]
  //   }, {
  //     "categoryName": "新手",
  //     "list": [{
  //       "title": "王者荣耀除了需要熟练度，常见细节技巧分享，高端局玩家都知道",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=418285",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190724/bf58dde0eae7ed9a9d0f34398114b549.1563953637.749d4f23ff7944ce316231955293f7f4.230x140_64704.jpg"
  //     }, {
  //       "title": "王者荣耀：超强实战中路游走技巧，学好三大原则轻松上分",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=415873",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190715/02e74f10e0327ad868d138f2b4fdd6f0.1563167064.84d08c51c719aea1ab113f9b80921bb6.230x140_88394.jpg"
  //     }, {
  //       "title": "全英雄铭文搭配思路，干货教程-战士篇",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=415258",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190713/22c25c4f633efd5c33709cc12e60ac9b.1562949914.01a72a26af86b805b1cbde5c6fda25fe.230x140_18586.jpg"
  //     }, {
  //       "title": "全英雄铭文搭配思路，干货教程-刺客+辅助篇",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=415267",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190713/cd53d53ef16137b6446a595b0c09b808.1562950751.0786380e3ce07bee8ce71cd7ee82f1e3.230x140_16668.jpg"
  //     }, {
  //       "title": "鞋子作为6大神装之一，每人必出，但你真的对它研究过吗？",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=415308",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190713/ccb3d22a44e997e6b33296013a6383b3.1562987847.75d1dc343f85e661887755df3db8ef76.230x140_20839.jpg"
  //     }, {
  //       "title": "王者荣耀：领悟装备中“唯一被动”的意思，别再被说不会出装了",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=414149",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190709/4134d9e2acb614ea98c12902490a8541.1562656487.ad2289a391fbeb879ae38941f82af8bf.230x140_16538.jpg"
  //     }, {
  //       "title": "王者荣耀：如何成为一名优秀的上单玩家？这十点意识你必须掌握！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=414606",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190710/0ac88cfa3358a41a848a0996ba2980d1.1562760261.c6b7c09ebef1df462c7df296aa94cc46.230x140_7096.jpg"
  //     }, {
  //       "title": "王者荣耀：常用铭文搭配，真的很详细啦",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=411327",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190628/4134d9e2acb614ea98c12902490a8541.1561707086.1aea7d895e4c6afdca57e1547e6becfd.230x140_16538.jpg"
  //     }, {
  //       "title": "上分攻略︱这件装备虽然冷门，但却是射手英雄的翻盘利器！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=410125",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190623/c81e728d9d4c2f636f067f89cc14862c.1561227097.8ed946a29c732181c6c469af7bd4a3ff.230x140_49973.jpg"
  //     }, {
  //       "title": "王者荣耀：上单第一件出暗影战斧，难怪守塔守不住",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=408785",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190618/d612ae2e1245a287f727b3b758d70e9f.1560835832.6ea731298b68e947584a4a511fcf84f3.230x140_12022.jpg"
  //     }, {
  //       "title": "王者荣耀：很难出的装备，破晓ADC必出，破军看情况，贤者尴尬",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=407191",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190613/c81e728d9d4c2f636f067f89cc14862c.1560392596.4ac5f197c8c25020e1fec1e540afdf83.230x140_19684.jpg"
  //     }, {
  //       "title": "王者荣耀S15法师通用铭文 新赛季法师铭文怎么搭配",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=407752",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190614/d64288cca2eed9b7fa8762d4822490f7.1560500295.0b3a8d01ce4aa02db7571f43e92598a1.230x140_19501.jpg"
  //     }, {
  //       "title": "打野修炼手册：作为打野，如何呼风唤雨，掌控节奏，拿下胜利？",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=398160",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190524/4dd8f10a65df6c0daadd17d9785d257f.1558712716.32f439e02d6092b071215d7b89d32355.230x140_5469.jpg"
  //     }, {
  //       "title": "【虎扑攻略】S15五排最简单上分法则：拒绝花里胡哨，保护我方输出",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=396861",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/0b32c8593bcb7baf62365634c0c7493c/0/?width=230&height=140"
  //     }, {
  //       "title": "玩辅助不会站位开视野？这里教你轻松学会辅助的所有视野站位",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=396685",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190517/424de7a8a3c9bb09f108f4f24d597297.1558087000.ade3dafb7c7a4f67049e151830a3f768.230x140_9427.jpg"
  //     }, {
  //       "title": "哪些装备好用？真正的作用你清楚吗？",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=395489",
  //       "img": "https://itea-cdn.qq.com/file/tgl/20190517/291e57f744222bcb7e7254061eb6d36b.1558070541.71ceed3d48109b68f78b5718e22e984e.230x140_50682.jpg"
  //     }]
  //   }, {
  //     "categoryName": "官方",
  //     "list": [{
  //       "title": "马超：兄弟的热血不会白流，西凉的纯洁我来守护",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=422677",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/6a1420625349827f075de3b38d89ff3d/0/?width=230&height=140"
  //     }, {
  //       "title": "王者荣耀首批金牌特权门店现已上线",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=422577",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/952e1b385c626f1a6f54bf12d974c25a/0/?width=230&height=140"
  //     }, {
  //       "title": "吃喝玩 赚一夏 来王者人生享暑期豪礼！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=422055",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/7cd4951fdcf9a47779a8175fa73c7af1/0/?width=230&height=140"
  //     }, {
  //       "title": "英雄故事 | 孙膑：为了我的挚友，流动吧，时间之力！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=415164",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/b0bfa37d5549734d96debd154358888b/0/?width=230&height=140"
  //     }, {
  //       "title": "云中君vs瑶：隔着一颗眼泪，也看不清生死的羁绊",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=412463",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/27cdca796c0f520fbce6f61536d1cb51/0/?width=230&height=140"
  //     }, {
  //       "title": "中二少年的独白：我就是想证明自己",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=411944",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/0b2742a68d0c30046a9b751b2c1733ae/0/?width=230&height=140"
  //     }, {
  //       "title": "王者世界观体验站更新！绝密档案已曝光",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=411180",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/b179d7510c7e2a1087c043766a972c3f/0/?width=230&height=140"
  //     }, {
  //       "title": "英雄故事 | 曜-星辰之子",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=410886",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/8006f57e49f156441ca43784b8644d04/0/?width=230&height=140"
  //     }, {
  //       "title": "稷下学院 | 诸葛学长带你逛母校",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=409771",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/9e5fbde7944361ae0a81c01142a11c1e/0/?width=230&height=140"
  //     }, {
  //       "title": "王者大陆行 | 云中漠地-都护府",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=407509",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/baea4fbea5add7ab7404e23d7650e104/0/?width=230&height=140"
  //     }, {
  //       "title": "王者大陆行 | 云中漠地-千窟城",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=396677",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/a75eca0408b2ef7a81f0ad4add6b611a/0/?width=230&height=140"
  //     }, {
  //       "title": "英雄故事 | 云中君：小鹿女，你的谎言我都懂",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=392672",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/150adce63d4d8f0c7575f3e88d852255/0/?width=230&height=140"
  //     }, {
  //       "title": "英雄故事 | 云中君：不是天使，胜是天使",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=392660",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/4994706713e802d3b4985bfe52e51a2a/0/?width=230&height=140"
  //     }, {
  //       "title": "英雄小传 | 第一个全程飞的英雄，必承受更多痛苦！",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=392336",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/3a877748232c96c1711904f872b88737/0/?width=230&height=140"
  //     }, {
  //       "title": "王者大陆行 | 云中漠地-玉城",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=384957",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/adade14f5990bc18d0e024dd8a175d27/0/?width=230&height=140"
  //     }, {
  //       "title": "英雄故事 | 瑶-过去生于未来",
  //       "link": "https://pvp.qq.com/m/m201606/newCont.shtml?G_Biz=18&tid=381210",
  //       "img": "https://shp.qpic.cn/cfwebcap/0/33b05fb59efff9b2a4619dc3e1ea4ff7/0/?width=230&height=140"
  //     }]
  //   }]
  //   await Intro.deleteMany({})
  //   for (let cat of rawData) {
  //     const category = await Category.findOne({
  //       name: cat.categoryName
  //     })
  //     cat.list = cat.list.map(item => {
  //       item.categories = [category]
  //       return item
  //     })
  //     Intro.insertMany(cat.list)
  //   }
  //   res.send(await Intro.find())
  // })

  // 导入英雄数据
  // router.get('/heroes/init', async (req, res) => {
  //   const rawData = [{
  //     "categoryName": "热门",
  //     "heroes": [{
  //       "name": "后羿",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
  //     }, {
  //       "name": "孙悟空",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
  //     }, {
  //       "name": "铠",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
  //     }, {
  //       "name": "安琪拉",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
  //     }, {
  //       "name": "亚瑟",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
  //     }, {
  //       "name": "鲁班七号",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
  //     }, {
  //       "name": "妲己",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
  //     }, {
  //       "name": "甄姬",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
  //     }, {
  //       "name": "韩信",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
  //     }, {
  //       "name": "伽罗",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"
  //     }]
  //   }, {
  //     "categoryName": "战士",
  //     "heroes": [{
  //       "name": "赵云",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
  //     }, {
  //       "name": "墨子",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
  //     }, {
  //       "name": "钟无艳",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
  //     }, {
  //       "name": "吕布",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
  //     }, {
  //       "name": "夏侯惇",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
  //     }, {
  //       "name": "曹操",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"
  //     }, {
  //       "name": "典韦",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"
  //     }, {
  //       "name": "宫本武藏",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"
  //     }, {
  //       "name": "达摩",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
  //     }, {
  //       "name": "老夫子",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"
  //     }, {
  //       "name": "关羽",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"
  //     }, {
  //       "name": "程咬金",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
  //     }, {
  //       "name": "露娜",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
  //     }, {
  //       "name": "花木兰",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
  //     }, {
  //       "name": "橘右京",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
  //     }, {
  //       "name": "亚瑟",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
  //     }, {
  //       "name": "孙悟空",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
  //     }, {
  //       "name": "刘备",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"
  //     }, {
  //       "name": "钟馗",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
  //     }, {
  //       "name": "杨戬",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"
  //     }, {
  //       "name": "雅典娜",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"
  //     }, {
  //       "name": "哪吒",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"
  //     }, {
  //       "name": "铠",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
  //     }, {
  //       "name": "苏烈",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
  //     }, {
  //       "name": "裴擒虎",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
  //     }, {
  //       "name": "狂铁",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"
  //     }, {
  //       "name": "孙策",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
  //     }, {
  //       "name": "李信",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"
  //     }, {
  //       "name": "盘古",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"
  //     }, {
  //       "name": "云中君",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
  //     }, {
  //       "name": "曜",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"
  //     }, {
  //       "name": "马超",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"
  //     }]
  //   }, {
  //     "categoryName": "法师",
  //     "heroes": [{
  //       "name": "小乔",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"
  //     }, {
  //       "name": "墨子",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
  //     }, {
  //       "name": "妲己",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
  //     }, {
  //       "name": "嬴政",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"
  //     }, {
  //       "name": "高渐离",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"
  //     }, {
  //       "name": "孙膑",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
  //     }, {
  //       "name": "扁鹊",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"
  //     }, {
  //       "name": "芈月",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
  //     }, {
  //       "name": "周瑜",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"
  //     }, {
  //       "name": "甄姬",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
  //     }, {
  //       "name": "武则天",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"
  //     }, {
  //       "name": "貂蝉",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
  //     }, {
  //       "name": "安琪拉",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
  //     }, {
  //       "name": "露娜",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
  //     }, {
  //       "name": "姜子牙",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
  //     }, {
  //       "name": "王昭君",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"
  //     }, {
  //       "name": "张良",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"
  //     }, {
  //       "name": "不知火舞",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
  //     }, {
  //       "name": "钟馗",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
  //     }, {
  //       "name": "诸葛亮",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"
  //     }, {
  //       "name": "干将莫邪",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"
  //     }, {
  //       "name": "女娲",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"
  //     }, {
  //       "name": "杨玉环",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
  //     }, {
  //       "name": "弈星",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"
  //     }, {
  //       "name": "米莱狄",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"
  //     }, {
  //       "name": "司马懿",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
  //     }, {
  //       "name": "沈梦溪",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"
  //     }, {
  //       "name": "上官婉儿",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
  //     }, {
  //       "name": "嫦娥",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
  //     }, {
  //       "name": "西施",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"
  //     }]
  //   }, {
  //     "categoryName": "坦克",
  //     "heroes": [{
  //       "name": "廉颇",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
  //     }, {
  //       "name": "庄周",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
  //     }, {
  //       "name": "刘禅",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
  //     }, {
  //       "name": "钟无艳",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
  //     }, {
  //       "name": "白起",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
  //     }, {
  //       "name": "芈月",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
  //     }, {
  //       "name": "吕布",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
  //     }, {
  //       "name": "夏侯惇",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
  //     }, {
  //       "name": "达摩",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
  //     }, {
  //       "name": "项羽",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
  //     }, {
  //       "name": "程咬金",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
  //     }, {
  //       "name": "刘邦",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
  //     }, {
  //       "name": "亚瑟",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
  //     }, {
  //       "name": "牛魔",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
  //     }, {
  //       "name": "张飞",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
  //     }, {
  //       "name": "太乙真人",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
  //     }, {
  //       "name": "东皇太一",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
  //     }, {
  //       "name": "铠",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
  //     }, {
  //       "name": "苏烈",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
  //     }, {
  //       "name": "梦奇",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
  //     }, {
  //       "name": "孙策",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
  //     }, {
  //       "name": "嫦娥",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
  //     }, {
  //       "name": "猪八戒",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
  //     }]
  //   }, {
  //     "categoryName": "刺客",
  //     "heroes": [{
  //       "name": "赵云",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
  //     }, {
  //       "name": "阿轲",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"
  //     }, {
  //       "name": "李白",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"
  //     }, {
  //       "name": "貂蝉",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
  //     }, {
  //       "name": "韩信",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
  //     }, {
  //       "name": "兰陵王",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"
  //     }, {
  //       "name": "花木兰",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
  //     }, {
  //       "name": "不知火舞",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
  //     }, {
  //       "name": "娜可露露",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"
  //     }, {
  //       "name": "橘右京",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
  //     }, {
  //       "name": "孙悟空",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
  //     }, {
  //       "name": "百里守约",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
  //     }, {
  //       "name": "百里玄策",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"
  //     }, {
  //       "name": "裴擒虎",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
  //     }, {
  //       "name": "元歌",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"
  //     }, {
  //       "name": "司马懿",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
  //     }, {
  //       "name": "上官婉儿",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
  //     }, {
  //       "name": "云中君",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
  //     }, {
  //       "name": "马超",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"
  //     }, {
  //       "name": "镜",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg"
  //     }]
  //   }, {
  //     "categoryName": "射手",
  //     "heroes": [{
  //       "name": "孙尚香",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
  //     }, {
  //       "name": "鲁班七号",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
  //     }, {
  //       "name": "马可波罗",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"
  //     }, {
  //       "name": "狄仁杰",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"
  //     }, {
  //       "name": "后羿",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
  //     }, {
  //       "name": "李元芳",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"
  //     }, {
  //       "name": "虞姬",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"
  //     }, {
  //       "name": "成吉思汗",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"
  //     }, {
  //       "name": "黄忠",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"
  //     }, {
  //       "name": "百里守约",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
  //     }, {
  //       "name": "公孙离",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"
  //     }, {
  //       "name": "伽罗",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"
  //     }, {
  //       "name": "蒙犽",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg"
  //     }]
  //   }, {
  //     "categoryName": "辅助",
  //     "heroes": [{
  //       "name": "庄周",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
  //     }, {
  //       "name": "刘禅",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
  //     }, {
  //       "name": "孙膑",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
  //     }, {
  //       "name": "姜子牙",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
  //     }, {
  //       "name": "牛魔",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
  //     }, {
  //       "name": "张飞",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
  //     }, {
  //       "name": "蔡文姬",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"
  //     }, {
  //       "name": "太乙真人",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
  //     }, {
  //       "name": "大乔",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"
  //     }, {
  //       "name": "鬼谷子",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"
  //     }, {
  //       "name": "明世隐",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"
  //     }, {
  //       "name": "杨玉环",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
  //     }, {
  //       "name": "盾山",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"
  //     }, {
  //       "name": "瑶",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"
  //     }, {
  //       "name": "鲁班大师",
  //       "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg"
  //     }]
  //   }]
  //   await Hero.deleteMany({})
  //   const tempData = []
  //   for (let cat of rawData) {
  //     if (cat.categoryName === '热门') {
  //       continue
  //     }
  //     // 找到当前分类在数据库中对应的数据
  //     const category = await Category.findOne({
  //       name: cat.categoryName
  //     })
  //     cat.heroes = cat.heroes.map(hero => {
  //       hero.categories = [category]

  //       if (tempData.length === 0) {
  //         tempData.push(hero)
  //       } else {
  //         let target = tempData.filter((tempHero) => {
  //           return tempHero.name === hero.name
  //         })
  //         if (!target.length) {
  //           tempData.push(hero)
  //         } else {
  //           target[0].categories = [...target[0].categories, ...hero.categories]
  //         }
  //       }

  //       return hero
  //     })
  //     // await Hero.insertMany(cat.heroes)
  //   }
  //   // console.log(tempData)
  //   await Hero.insertMany(tempData)
  //   res.send(await Hero.find())
  // })

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
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  avatar: {type: String},
  banner: {type: String},
  title: {type: String},
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  scores: {
    difficult: {type: Number},
    skill: {type: Number},
    attack: {type: Number},
    survive: {type: Number},
  },
  recommendSkills: {
    main: {
      icon: {type: String},
      name: {type: String}
    },
    vice: {
      icon: {type: String},
      name: {type: String}
    },
    common: [{type: mongoose.SchemaTypes.ObjectId, ref: 'CommonSkill'}]
  },
  skills: [{
    icon: {type: String},
    name: {type: String},
    delay: {type: String},
    cost: {type: String},
    description: {type: String},
    tips: {type: String},
  }],
  items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  usageTips: {type: String},
  battleTips: {type: String},
  teamTips: {type: String},
  partners: [{
    hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    description: {type: String}
  }],
  partners1: [{
    hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    description: {type: String}
  }],
  partners2: [{
    hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    description: {type: String}
  }],
  

})

module.exports = mongoose.model('Hero', schema, 'heroes')
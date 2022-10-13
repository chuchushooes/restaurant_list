// 首頁路由
const express = require('express')
const router = express.Router()
// 導入 rest model
const Restaurant = require('../../models/restaurants')

// show main content
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants =>  res.render('index', { restaurants }))
    .catch(error => console.log(error))
})



module.exports = router // 匯出express.Router
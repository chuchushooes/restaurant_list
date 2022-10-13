// 搜尋路由

const express = require('express')
const router = express.Router()
// 導入 rest model
const Restaurant = require('../../models/restaurants')

// show Query String, use query
router.get('/', (req, res) => {
  const keyword = req.query.keyword

  // MongoDB 可使用正則表達式(regex) 執行字串模式匹配的查詢
  // 這裡利用 $or 是 find 內的第一個參數 Query，條件是讓name和category都能符合搜尋條件
  // 在 name 內的 $regex 是 MongoDB 提供搜尋字串的方法，是模糊搜尋用
  // $options 是 $regex 提供的附加指令，這裡打 i 的意思是不區分大小寫
  Restaurant.find({$or: [ 
    {name:{$regex: keyword, $options: 'i',}},
    {category:{$regex: keyword, $options: 'i',}},
  ]})
  .lean()
  .then(restaurants => {
    const notFound = !restaurants.length // 加入搜尋不到的條件
    res.render('index',{restaurants, keyword, notFound}) // 參數導入篩選過後的陣列(物件)
  })

});



module.exports = router // 匯出express.Router
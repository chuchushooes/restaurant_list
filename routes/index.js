// 總路由

const express = require('express') // 引用 Express 與 Express 路由器
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const searchBar = require('./modules/search')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', searchBar)


module.exports = router // 匯出express.Router
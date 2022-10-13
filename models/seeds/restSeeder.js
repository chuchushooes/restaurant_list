const db = require('../../config/mongoose') //導入 mongoose模組
const restaurant = require('../restaurants') //導入restaurant js
const restaurantList =  require('../../restaurant.json') // 上二層的路徑
const stores = restaurantList.results


db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  restaurant.create(stores)
  console.log(`done.`)
})
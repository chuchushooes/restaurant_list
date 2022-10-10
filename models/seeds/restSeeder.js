// 導入 mongoose
const mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGODB_URI_restaurant}`)
const restaurantList = require("./restaurant.json") //導入restaurant json

// db設置
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
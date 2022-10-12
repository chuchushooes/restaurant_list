// 導入 mongoose
const mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGODB_URI_restaurant}`)
const restaurant = require('../restaurants') //導入restaurant js
const restaurantList =  require('../../restaurant.json') // 上二層的路徑
const stores = restaurantList.results

// db設置
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
   for(let i = 0; i < stores.length; i++) { // 避免使用 magic number(缺乏意義的數值)
  restaurant.create(
      {
       name: stores[i].name},
       name_en: stores[i].name_en,
       category: stores[i].category,
       image: stores[i].image,
       location:{stores[i].location,
       phone: stores[i].phone,
       google_map: stores[i].google_map,
       embed_map: stores[i].embed_map,
       rating: stores[i].rating},
       description: stores[i].description,
      }
    )
  }
    console.log(`done.`)
  }
  
)



// 更快它會自己對應
    // restaurant.create(stores) 
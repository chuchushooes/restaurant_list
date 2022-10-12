const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require("./restaurant.json") //導入restaurant json

// 導入 mongoose
const mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGODB_URI_restaurant}`)
// 導入 rest model
const Restaurant = require('./models/restaurants')


app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))
// 定義靜態檔資料夾，告訴express名稱位置

// 記得家engine(新版)
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
// view engine, the template engine to use. For example, to use the Pug template engine: app.set('view engine', 'pug').
app.set('view engine', 'handlebars')

app.listen(port, () => { // 監聽終端執行完成後console
  console.log(`localhost:${port} has been active`)
})


// db設置
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// show main content
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants =>  res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// show add new store page
app.get('/restaurants/newPage', (req, res) => {
  return res.render('newPage')
})

// show store data page, use params
app.get('/restaurants/:id', (req, res) => {
  const id  = req.params.id
  return Restaurant.findById(id) // 找到id後回傳資料
    .lean()
    .then(store => res.render('show',{ store }))
    .catch(error => console.log(error))
})


// show edit store page, use params
app.get('/restaurants/:id/edit', (req, res) => {
  const id  = req.params.id
  return Restaurant.findById(id) // 找到id後回傳資料
    .lean()
    .then(store => res.render('edit',{ store }))
    .catch(error => console.log(error))
})


// create new data
app.post('/restaurants', (req, res) => {
   Restaurant.create(req.body)
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})


// update store data
app.post('/restaurants/:id/edit', (req, res) => {
  const id  = req.params.id
  const body = req.body
  //  return Restaurant.findByIdAndUpdate(id, req.body) 精簡用法
  return Restaurant.findById(id)
    .then(store => {
      store.name = body.name
      store.name_en = body.name_en
      store.category = body.category
      store.image = body.image
      store.location = body.location
      store.phone = body.phone
      store.google_map = body.google_map
      store.embed_map = body.embed_map
      store.rating = body.rating
      store.description = body.description
      return store.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})



// delete store data
app.post('/restaurants/:id/delete', (req, res) => {
  const id  = req.params.id
  //  return Restaurant.findByIdAndDelete(id) 精簡用法
  return Restaurant.findById(id)
    .then(store => store.remove())  
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

// show Query String, use query
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keyword_trim = keyword.toLowerCase().trim()

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



  /* 簡化前
  Restaurant.find() //撈出全部restaurants的陣列資料
      .lean()
      .then(restaurants => {
        const storeSearch = restaurants.filter(
          (store) => 
            store.name.toLowerCase().includes(keyword_trim) || 
            store.category.toLowerCase().includes(keyword_trim))

        const notFound = !storeSearch.length // 加入搜尋不到的條件
        res.render('index',{restaurants: storeSearch, keyword, notFound}) // 參數導入篩選過後的陣列(物件)
      })
      .catch(error => console.log(error))
  */
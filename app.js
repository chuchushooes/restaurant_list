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

// show store data, use params
app.get('/restaurants/:id', (req, res) => {
  const id  = req.params.id
  // console.log(id)
  return Restaurant.findById(id) // 找到id後回傳資料
  .lean()
  .then(store => res.render('show',{ store }))
  .catch(error => console.log(error))
})
  


// show Query String, use query
app.get('/search', (req, res) => {
  // console.log(req.query.keyword)
  const keyword = req.query.keyword
  const keyword_trim = keyword.toLowerCase().trim()
  const storeSearch = restaurantList.results.filter((store) => 
  store.name.toLowerCase().includes(keyword_trim) || 
  store.category.toLowerCase().includes(keyword_trim))

  // 加入搜尋不到的條件
  const notFound = !storeSearch.length

  res.render('index',{restaurants: storeSearch, keyword: keyword, notFound: notFound}) // 參數導入篩選過後的陣列(物件)

})



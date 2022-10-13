const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require("./restaurant.json") //導入restaurant json
const router = require('./routes')

// 導入 mongoose
const mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGODB_URI_restaurant}`)
// 導入 rest model
const Restaurant = require('./models/restaurants')


app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))
// 定義靜態檔資料夾，告訴express名稱位置

app.use(methodOverride('_method')) //新增覆寫

app.use(router)

// 記得加engine(新版)
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



const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require("./restaurant.json") //導入restaurant json


app.use(express.static('public'))
// 定義靜態檔資料夾，告訴express名稱位置

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// view engine, the template engine to use. For example, to use the Pug template engine: app.set('view engine', 'pug').
app.set('view engine', 'handlebars')

app.listen(port, () => { // 監聽終端執行完成後console
  console.log(`localhost:${port} has been active`)
})


// show main content
app.get('/', (req, res) => {
  res.render('index',{restaurants: restaurantList.results})
  // 透過 res.render() 的第二個參數把 restaurantList.results陣列 傳到 index.handlebars 中，並可以透過 restaurants 這個變數取得
})

// show store data, use params
app.get('/restaurants/:store_id', (req, res) => {
  const store = restaurantList.results.find((store) => store.id.toString() ===  req.params.store_id)
  res.render('show',{store: store})
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



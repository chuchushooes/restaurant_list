const express = require('express')
const app = express()
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const router = require('./routes')
const port = 3000

require('./config/mongoose')//啟動時就自動執行不用設定變數

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))//新增覆寫
app.use(router)

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))// 記得加engine(新版)
app.set('view engine', 'handlebars')

app.listen(port, () => { console.log(`localhost:${port} has been active`) })
// 監聽終端執行完成後console
// 餐廳新增刪除修改路由
const express = require('express')
const router = express.Router()
// 導入 rest model
const Restaurant = require('../../models/restaurants')


// show add new store page
router.get('/newPage', (req, res) => {
  return res.render('newPage')
})

// show store data page, use params
router.get('/:id', (req, res) => {
  const id  = req.params.id
  return Restaurant.findById(id) // 找到id後回傳資料
    .lean()
    .then(store => res.render('show',{ store }))
    .catch(error => console.log(error))
})


// show edit store page, use params
router.get('/:id/edit', (req, res) => {
  const id  = req.params.id
  return Restaurant.findById(id) // 找到id後回傳資料
    .lean()
    .then(store => res.render('edit',{ store }))
    .catch(error => console.log(error))
})


// create new data
router.post('/', (req, res) => {
   Restaurant.create(req.body)
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})


// update store data
router.put('/:id', (req, res) => {
  const id  = req.params.id
  const body = req.body
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})



// delete store data
router.delete('/:id', (req, res) => {
  const id  = req.params.id
  return Restaurant.findByIdAndDelete(id) 
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})



module.exports = router // 匯出express.Router
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
router.delete('/:id', (req, res) => {
  const id  = req.params.id
  //  return Restaurant.findByIdAndDelete(id) 精簡用法
  return Restaurant.findById(id)
    .then(store => store.remove())  
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})



module.exports = router // 匯出express.Router
### 迷其林餐廳簡介 - Introduction

一個簡單的美食餐廳網站，可以點擊至你想要看的餐廳查看詳細資料，也可藉由搜尋來尋找自己想要的餐廳，趕快來用看看吧。

## 功能列表 - Features

- 使用者可藉由搜尋列表進行餐廳名稱搜尋
- 使用者可點擊任一餐廳，查看更多餐廳資訊，例如電話、地址、google map 導航等等
- 使用者可利用導覽列回到迷其林主頁
- 使用者當在頁面底層，可點擊箭頭按鈕移至最上層

## 環境建立與需求 - Set up environment

- [Node.js](https://nodejs.org/en/)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [express 版本號@4.16.4](https://www.npmjs.com/package/express)
- [express handlebars 版本號@3.0.0](https://www.npmjs.com/package/express-handlebars)

## 安裝步驟 Install

1. 開啟終端機(terminal) clone 此專案
2. 移動到此專案資料夾
   `cd restaurant_list`
3. 安裝 express 4.16.4 版本 - 為 node.js 網路框架
   `npm i express@4.16.4`
4. 安裝 express-handlebars 3.0.0 版本 - 為樣板引擎
   `npm i express-handlebars@3.0.0`
5. 安裝 nodemon - 可自動偵測重啟伺服器
   `npm install -g nodemon`
6. 執行專案，輸入以下至終端`nodemon app.js`成功後就會如下顯示
   `localhost:3000 has been active`
7. 至瀏覽器打上`http://localhost:3000/`畫面即可顯示

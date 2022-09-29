// gotop

const button = document.querySelector('#goTop')

// 瀏覽器在滑鼠滾動時執行 goTopDisplay function
onscroll = function() {
  goTopDisplay()
}

// 當滾動大於 20 就顯示 goTop 鍵
// 這裡的document.documentElement.scrollTop 是瀏覽器預設指令但有可能一些瀏覽器不吃(但 chrome 測試可以)
function goTopDisplay() {
  if(document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

// 點擊 button 時讓他回到最上層
button.addEventListener('click', goTop)
function goTop() {
  document.documentElement.scrollTop = 0;
}
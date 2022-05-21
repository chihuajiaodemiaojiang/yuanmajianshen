// 导入样式
require('../css/adverti.less');
let jumpTime = document.querySelector('.jumpTime')
let time = 5;
let timer = setInterval(() => {
    jumpTime.innerHTML = time-- + 's';
    if (time < 0) {
        clearInterval(timer);
        location.href = './login.html';
    }
}, 1000);
document.querySelector('.jump').onclick = function() {
    clearInterval(timer);
    location.href = './login.html';

}
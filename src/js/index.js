// 导入样式
require('../css/index.less');
let jumpTime = document.querySelector('.jumpTime')
// 设置五秒倒计时,倒计时结束后跳转login页面
let time = 5;
let timer = setInterval(() => {
    jumpTime.innerHTML = time-- + 's';
    if (time < 0) {
        clearInterval(timer);
        window.location.href = './login.html';
    }
}, 1000);
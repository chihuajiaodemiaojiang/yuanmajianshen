require('../css/login.less')
let axios=require('axios')
function getValue(name){
    return document.querySelector(name).value;
}
let phone = getValue('#phone');
let password = getValue('#password');
let warns = document.querySelector('.warns');
let btn = document.querySelector('.btn');
btn.onclick = function(){
axios.post('http://139.9.177.51:8099/users/login', {
    account: phone,
    password: password
}).then(res=>{
// 登录成功
    if(res.data.msg === 'OK') {
        const userData = res.data.user
// 将用户数据存储在本地存储中
        window.localStorage.setItem('user', JSON.stringify({
            userId: userData.userId, // 用户 ID
            account: userData.userData, // 账号
            nickname: userData.nickname, // 昵称
            gender: userData.gender, // 性别
            birthday: userData.birthday, // 生日
            imgurl: userData.imgurl, // 头像图片地址
            address: userData.address, // 省市区地址
            sign: userData.sign // 个人签名
        }));
        window.localStorage.setItem('token', res.data.token);
// URL 跳转至首页
        window.location.href = './index.html';
    } else {
// 登录失败
        warns.textContent = res.msg;
    }
})
}
let registerAnAccount = document.querySelector('.registerAnAccount');
registerAnAccount.onclick = function(){
    window.location.href = './reg.html';
}


require("../css/reg.less");
let CaptchaMini = require("captcha-mini");
let captchaDrawer = new CaptchaMini();
let captchaCode = "";
let axios = require("axios");
let utils = require("./utils.js");
captchaDrawer.draw(document.querySelector("#captcha"), function (code) {
  captchaCode = code;
});
//跳转到登录页
let passwordToLogin = document.querySelector(".passwordToLogin");
passwordToLogin.onclick = function () {
  location.href = "./login.html";
};
// let captcha2 = new CaptchaMini({
//     lineWidth: 1,   //线条宽度
//     lineNum: 6,       //线条数量
//     dotR: 2,          //点的半径
//     dotNum: 25,       //点的数量
//     preGroundColor: [10, 80],    //前景色区间
//     backGroundColor: [150, 250], //背景色区间
//     fontSize: 30,           //字体大小
//     fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'],  //字体类型
//     fontStyle: 'stroke',      //字体绘制方法，有fill和stroke
//     content: '一个验证码abcdefghijklmnopqrstuvw生成的插件使用的是canvas显示',  //验证码内容
//     length: 6    //验证码长度
// });
// captcha2.draw(document.querySelector('#captcha2'), r => {
//     console.log(r, '验证码2');
// });
// 注册表单验证
let btn = document.querySelector(".btn");
let warn = document.querySelector(".warn");
function getValue(name) {
  return document.querySelector(name).value.trim();
}
// 点击注册按钮后，要进行以下流程处理：
// 1.表单验证：判空、手机号格式、验证码、密码一致性
// 2.请求注册接口
// 3.注册成功后自动登录，跳转到首页
btn.onclick = function () {
  let phone = getValue("#phone");
  console.log(phone);
  let code = getValue("#code");
  let password = getValue("#password");
  let repassword = getValue("#repassword");
  if (!phone) {
    utils.getAlertBox("shouji", "手机号不能为空");
    return;
  }
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    utils.getAlertBox("shouji", "手机号格式不正确");
    return;
  }
  if (!code) {
    utils.getAlertBox("yanzhengmacuowu", "验证码不能为空");
    return;
  }
  if (code !== captchaCode) {
    utils.getAlertBox("yanzhengmacuowu", "验证码错误");
    return;
  }
  // 密码格式
  if (!/^\w{6,16}$/.test(password)) {
    utils.getAlertBox("mima", "密码格式不正确");
    return;
  }
  if (!password) {
    utils.getAlertBox("mima", "密码不能为空");
    return;
  }
  if (password !== repassword) {
    utils.getAlertBox("mima", "两次密码不一致");
    return;
  }
  axios
    .post("http://47.96.154.185:3701/api/user/register", {
      account: phone,
      password: password,
    })
    .then((res) => {
      console.log(res);
      if (res.data.errno === 0) {
        utils.getAlertBox("zhucechenggong", "注册成功", function () {
          location.href = "./login.html";
        });
      } else {
        utils.getAlertBox("__zhuceshibai", res.data.message);
      }
    });
};

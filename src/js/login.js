require("../css/login.less");
let axios = require("axios");
const utils = require("./utils");
function getValue(name) {
  return document.querySelector(name).value.trim();
}
let btn = document.querySelector(".btn");
btn.onclick = function () {
  let phone = getValue("#phone");
  let password = getValue("#password");
  console.log(phone, password);
  if (!phone) {
    utils.getAlertBox("shouji", "手机号不能为空");
    return;
  }
  if (!password) {
    utils.getAlertBox("mima", "密码不能为空");
    return;
  }
  axios
    .post("http://47.96.154.185:3701/api/user/login", {
      account: phone,
      password: password,
    })
    .then((res) => {
      console.log(res);
      // 登录成功
      if (res.data.errno === 0) {
        localStorage.setItem("userObj", JSON.stringify(res.data.data));
        utils.getAlertBox("dengluchenggong", "登入成功", function () {
          location.href = "./index.html";
        });
      } else {
        // 登录失败
        utils.getAlertBox("denglushibai", res.data.message);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};
let registerAnAccount = document.querySelector(".registerAnAccount");
registerAnAccount.onclick = function () {
  window.location.href = "./reg.html";
};

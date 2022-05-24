require("../css/account.less");
let utils = require("./utils.js");
utils.getfooter("account");
let headers = document.querySelector(".headers");
let personalizedSignature = document.querySelector(".personalizedSignature");
let userName = document.querySelector(".userName");
let theMovementTimeMain = document.querySelector(".theMovementTime-main");
let calorie1 = document.querySelector(".calorie1");
let badgeItem = document.querySelectorAll(".badge-item");
let upheadimg = document.querySelector("#upheadimg");
console.log(upheadimg);
let axios = require("axios");
let userObj = JSON.parse(localStorage.getItem("userObj"));
axios.defaults.headers.common["Authorization"] = "Bearer " + userObj.token;
let api = "http://139.9.177.51:3701";
axios.get(api + "/api/user/info").then((res) => {
  if (res.data.errno === 0) {
    let data = res.data.data;
    console.log(data.badges);
    console.log(headers);
    headers.src = api + data.imgUrl;
    userName.textContent = data.nickName;
    personalizedSignature.textContent = data.sign
      ? data.sign
      : "这个很懒,什么也没有留下";
    theMovementTimeMain.textContent = data.duration;
    calorie1.textContent = data.calorie;
    if (data.badges === 2) {
      badgeItem[2].style.display = "none";
    }
    if (data.badges === 1) {
      badgeItem[2].style.display = "none";
      badgeItem[1].style.display = "none";
    }
    if (data.badges === 0) {
      badgeItem[2].style.display = "none";
      badgeItem[1].style.display = "none";
      badgeItem[0].style.display = "none";
    }
  }
});
upheadimg.addEventListener("change", function () {
  console.dir(this.files[0]);
  // 文件上传必须使用FormData这个js内置对象
  let formData = new FormData();
  // 将图片信息添加到formData里面
  formData.append("file", this.files[0]);
  // 发起请求, 上传头像
  axios
    .post(api + "/api/shared/uploadPortrait1", formData)
    .then(function (res) {
      console.log(res);
      if (res.data.errno === 0) {
        //  替换头像
        headers.src = api + res.data.data.url;
        axios.post(api + '/api/user/changeInfo', {
          imgUrl: res.data.data.url
        }).then(function (res) {
          console.log(res);
        }).catch(function (err) {
          console.log(err);
        })
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

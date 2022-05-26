require("../css/riding.less");
require("axios");
let utils = require("./utils.js");
const axios = require("axios");
let url = "http://47.96.154.185:3701";
let userObj = JSON.parse(localStorage.getItem("userObj"));
axios.defaults.headers.common["Authorization"] = "Bearer " + userObj.token;
utils.getfooter("drill");
utils.getheader("riding");
let distance = document.querySelector(".distance");
let go = document.querySelector("#go");
let timer = null;
let num = 4;
go.onclick = function () {
  clearInterval(timer);
  timer = setInterval(function () {
    console.log(111);
    num--;
    go.innerHTML = num;
    if (num <= 0) {
      go.innerHTML = "GO";
      location.href = "./inmovement.html";
      clearInterval(timer);
    }
  }, 1000);
};
axios.get(url + "/api/exercise").then((res) => {
  console.log(res);
  let data = res.data.data;
  // 截取字符串
  let str = data.sum7Meter.toString();
  let str1 = str.substring(0, str.length - 2);
  let str2 = str.substring(str.length - 2, str.length);
  distance.innerHTML = str1 + "." + str2;
});

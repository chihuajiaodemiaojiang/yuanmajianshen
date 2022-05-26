require("../css/running.less");
let utils = require("./utils.js");
const axios = require("axios");
utils.getfooter("drill");
utils.getheader("running");
let url = "http://47.96.154.185:3701";
let userObj = JSON.parse(localStorage.getItem("userObj"));
axios.defaults.headers.common["Authorization"] = "Bearer " + userObj.token;
let distance = document.querySelector(".distance");
let go = document.querySelector("#go");
let timer = null;
let num = 4;
let types = "";
let btn = document.querySelectorAll(".runningbox div");
let main = document.querySelector(".main");
for (let i = 0; i < btn.length; i++) {
  btn[i].onclick = function () {
    for (let j = 0; j < btn.length; j++) {
      btn[j].className = "";
    }
    this.className = "on";
  };
  if (btn[i].className === "on") {
    types = btn[i].dataset.type;
  }
}
go.onclick = function () {
  clearInterval(timer);
  timer = setInterval(function () {
    num--;
    go.innerHTML = num;
    if (num <= 0) {
      go.innerHTML = "GO";
      clearInterval(timer);
      location.href = "./inmovement.html?type=" + types;
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

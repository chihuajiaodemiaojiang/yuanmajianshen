require("../css/badge.less");
const axios = require("axios");
let li = document.querySelectorAll("ul li");
let head = document.querySelector(".head");
let mask = document.querySelector(".mask1");
let back4 = document.querySelector(".back4");
// 获取地址栏参数type
let type = location.search.split("=")[1];
console.log(type);
if (type === "index") {
  back4.href = "./index.html";
}
head.onclick = function () {
  console.log(111);
  mask.style.display = "none";
};
let url = "http://47.96.154.185:3701";
let userObj = JSON.parse(localStorage.getItem("userObj"));
let ranking = document.querySelector(".ranking");
axios.defaults.headers.common["Authorization"] = "Bearer " + userObj.token;
axios.get(url + "/api/exercise/badge").then((res) => {
  console.log(res);
  let data = res.data.data;
  data.forEach((item, index) => {
    console.log(item);
    li[item.id - 1].style.display = "flex";
    li[item.id - 1].children[1].textContent = item.name;
    li[item.id - 1].onclick = function () {
      mask.style.display = "block";
      mask.children[1].src = this.children[0].src;
      mask.children[2].textContent = item.detail.name;
      mask.children[3].textContent = item.detail.desc;
      mask.children[4].textContent = item.date + "获取";
    };
  });
});
axios.get(url + "/api/user/info").then((res) => {
  let data = res.data.data;
  console.log(data);
  ranking.children[1].textContent = data.ranking;
});

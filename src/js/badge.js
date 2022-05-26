require("../css/badge.less");
const axios = require("axios");
let li = document.querySelectorAll("ul li");
let url = "http://47.96.154.185:3701";
let userObj = JSON.parse(localStorage.getItem("userObj"));
let ranking = document.querySelector(".ranking");
axios.defaults.headers.common["Authorization"] = "Bearer " + userObj.token;
axios.get(url + "/api/exercise/badge").then((res) => {
  console.log(res);
  let data = res.data.data;
  data.forEach((item, index) => {
    console.log(item.id);
    li[item.id - 1].style.display = "flex";
    li[item.id - 1].children[1].textContent = item.name;
  });
});
axios.get(url + "/api/user/info").then((res) => {
  let data = res.data.data;
  console.log(data);
  ranking.children[1].textContent = data.ranking;
});

require("../css/index.less");
require("../../node_modules/swiper/swiper-bundle.min.js");
require("../../node_modules/swiper/swiper-bundle.min.css");
let utils = require("./utils.js");
let jumspors = document.querySelector("#jumspors");
let jumbadge = document.querySelector("#jumbadge");
jumbadge.onclick = function () {
  location.href = "./badge.html?type=index";
};
jumspors.onclick = function () {
  location.href = "./sportsData.html?type=index";
};
utils.getfooter("index");
let axios = require("axios");
var mySwiper = new Swiper(".swiper", {
  direction: "horizontal", // 垂直切换选项
  loop: true, // 循环模式选项
  // 如果需要分页器
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
});
let ranking = document.querySelector(".ranking");
let day = document.querySelector(".day");
let medal = document.querySelector(".medal");
let todayCard = document.querySelector(".today-card");
let userObj = JSON.parse(localStorage.getItem("userObj"));
axios.defaults.headers.authorization = `Bearer ${userObj.token}`;
axios.get("http://47.96.154.185:3701/api/user/info").then(function (res) {
  console.log(res);
  if (res.data.errno === 0) {
    let data = res.data.data;
    ranking.innerHTML = data.ranking;
    day.innerHTML = data.clockCount;
    medal.innerHTML = data.badges;
    card();
  }
});
todayCard.onclick = function () {
  card();
};
function card() {
  axios
    .post("http://47.96.154.185:3701/api/user/clockIn")
    .then(function (res) {
      console.log(res);
      if (res.data.errno === 0) {
        todayCard.innerHTML = "打卡成功";
      } else if (res.data.errno === -1) {
        todayCard.innerHTML = "已打卡!";
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

require("../css/riding.less");
let utils = require("./utils.js");
utils.getfooter("drill");
utils.getheader("riding");
let go = document.querySelector("#go");
let timer = null;
let num = 4;
go.onclick = function () {
  timer = setInterval(function () {
    console.log(111);
    num--;
    go.innerHTML = num;
    if (num <= 0) {
      go.innerHTML = "GO";
      location.href = "../Inmovement.html";
      clearInterval(timer);
    }
  }, 1000);
};
// location.href = './详情页01.html?uid='+this.dataset['uid']+'&title='+this.dataset['title'];

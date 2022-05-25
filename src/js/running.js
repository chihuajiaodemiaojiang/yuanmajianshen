require("../css/running.less");
let utils = require("./utils.js");
utils.getfooter("drill");
utils.getheader("running");
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

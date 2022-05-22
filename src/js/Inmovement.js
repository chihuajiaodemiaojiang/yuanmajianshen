require("../css/Inmovement.less");
let mileage = document.querySelector(".mileage");
let speed1 = document.querySelector(".speed1");
let time1 = document.querySelector(".time1");
let calorie1 = document.querySelector(".calorie1");
let suspended = document.querySelector(".suspended");
let timer = null;
let timer1 = null;
let ms = 0;
let m = 0;
let s = 0;
let n = 0;
suspended.onclick = function () {
  if (suspended.innerHTML === "<span>开始</span>") {
    suspended.classList.add("icon-Pause");
    suspended.innerHTML = "<span>暂停</span>";
    timer = setInterval(function () {
      ms++;
      console.log(m, s, ms);
      if (ms >= 100) {
        ms = 0;
        s++;
      }
      if (s >= 60) {
        s = 0;
        m++;
      }
      time1.innerHTML = m + ":" + s + ":" + ms;
      mileage.innerHTML =
        "0" +
        Math.floor(s / 300) +
        "." +
        Math.floor(s / 40) +
        Math.floor(s / 3) +
        "<span>公里</span>";
    }, 10);
    timer1 = setInterval(function () {
      n++;
      speed1.innerHTML = Math.floor(Math.random() * 5) + "km/h";
      calorie1.innerHTML = n + "千卡";
    }, 1000);
  } else {
    clearInterval(timer);
    clearInterval(timer1);
    suspended.classList.remove("icon-Pause");
    suspended.classList.add("icon-kaishi1");
    suspended.innerHTML = "<span>开始</span>";
  }
};

require("../css/inmovement.less");
let mileage = document.querySelector(".mileage");
let speed1 = document.querySelector(".speed1");
let time1 = document.querySelector(".time1");
let calorie1 = document.querySelector(".calorie1");
let suspended = document.querySelector(".suspended");
let theRunningTypes = document.querySelector(".theRunningTypes");
let end = document.querySelector(".end");
let timer = null;
let timer1 = null;
let ms = 0;
let m = 0;
let s = 0;
let n = 0;
// 获取地址栏type参数
let type = window.location.search.split("=")[1];
if (type === "runningOutside") {
  theRunningTypes.textContent = "户外跑";
}
if (type === "treadmill") {
  theRunningTypes.textContent = "跑步机";
}
if (type === "burningFatToRun") {
  theRunningTypes.textContent = "燃脂跑";
}
function fillZero(n) {
  return n < 10 ? "0" + n : n;
}
suspended.onclick = function () {
  if (suspended.innerHTML === "<span>开始</span>") {
    suspended.style.background = "#78eec0";
    suspended.style.color = "#fff";
    suspended.classList.remove("icon-kaishi1");
    suspended.classList.add("icon-Pause");
    suspended.innerHTML = "<span>暂停</span>";
    end.style.display = "flex";
    timer = setInterval(function () {
      console.log(222);
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
        fillZero(Math.floor(s / 300)) +
        "." +
        fillZero(Math.floor(s / 4)) +
        "<span>公里</span>";
    }, 10);
    timer1 = setInterval(function () {
      console.log(111);
      n++;
      speed1.innerHTML = Math.floor(Math.random() * 5) + "km/h";
      calorie1.innerHTML = n + "千卡";
    }, 1000);
  } else {
    clearInterval(timer);
    clearInterval(timer1);
    end.style.display = "none";
    suspended.style.background = "white";
    suspended.style.color = "#7bcbf5";
    suspended.classList.remove("icon-Pause");
    suspended.classList.add("icon-kaishi1");
    suspended.innerHTML = "<span>开始</span>";
  }
};
end.onclick = function () {
  clearInterval(timer);
  clearInterval(timer1);
  if (!type) {
    location.href = "./riding.html";
  } else {
    location.href = "./running.html";
  }
};

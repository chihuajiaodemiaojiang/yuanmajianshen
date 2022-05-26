require("../css/inmovement.less");
let mileage = document.querySelector(".mileage");
let speed1 = document.querySelector(".speed1");
let time1 = document.querySelector(".time1");
let calorie1 = document.querySelector(".calorie1");
let suspended = document.querySelector(".suspended");
let theRunningTypes = document.querySelector(".theRunningTypes");
let end = document.querySelector(".end");
let ditu = document.querySelector(".icon-ditu");
let main = document.querySelector("main");
let header = document.querySelector("header");
let SPEED1 = document.querySelector("#SPEED1");
let time2 = document.querySelector("#time1");
let distance1 = document.querySelector("#distance1");
let body = document.querySelector("body");
let footer = document.querySelector("footer");
let back1 = document.querySelector(".icon-xiangzuojiantou");
let timer = null;
let timer1 = null;
let timer3 = null;
let ms = 0;
let m = 0;
let s = 0;
let n = 0;

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
ditu.onclick = function () {
  body.style.padding = "0";
  main.style.display = "none";
  header.style.display = "none";
  footer.style.display = "block";
};
function fillZero(n) {
  return n < 10 ? "0" + n : n;
}
back1.onclick = function () {
  body.style.padding = "20px";
  main.style.display = "flex";
  header.style.display = "block";
  footer.style.display = "none";
};
suspended.onclick = function () {
  if (suspended.innerHTML === "<span>开始</span>") {
    getPosition();
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
      time2.innerHTML = time1.innerHTML = m + ":" + s + ":" + ms;
      distance1.innerHTML = mileage.innerHTML =
        fillZero(Math.floor(s / 300)) +
        "." +
        fillZero(Math.floor(s / 4)) +
        "<span>公里</span>";
    }, 10);
    timer1 = setInterval(function () {
      console.log(111);
      n++;
      SPEED1.innerHTML = speed1.innerHTML =
        Math.floor(Math.random() * 5) + "km/h";
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
//分割线---------------------------------------------------------------------------------------------------------------------
let ypos = 0.01;
let xpos = 0.01;
let posArr = [];
var map = new BMapGL.Map("allmap");
var geolocation = new BMapGL.Geolocation();
function render() {
  geolocation.getCurrentPosition(function (r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      let lng = 104.088288 + ypos;
      let lnt = 30.662973 + xpos;
      map.centerAndZoom(new BMapGL.Point(lng, lnt), 18);
      ypos += Math.random() / 200000;
      xpos += Math.random() / 200000;
      posArr.push({ lng: lng, lnt: lnt });
      if (posArr.length > 1) {
        drawline(posArr[posArr.length - 2], posArr[posArr.length - 1]);
      }
    } else {
      alert("failed" + this.getStatus());
    }
  });
}
function getPosition() {
  timer3 = setInterval(function () {
    render();
  }, 1000);
}

function drawline(a, b) {
  var polyline = new BMapGL.Polyline(
    [new BMapGL.Point(a.lng, a.lnt), new BMapGL.Point(b.lng, b.lnt)],
    { strokeColor: "blue", strokeWeight: 5, strokeOpacity: 1 }
  );
  map.addOverlay(polyline);
}

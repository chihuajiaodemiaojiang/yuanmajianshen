require("../css/playback.less");
//全局变量获取
let video = document.querySelector("video");
let videoBox = document.querySelector(".video-box");
let videospan = document.querySelectorAll(".video-box span");
let play = document.querySelector(".play");
let iconTubiaozhizuomoban1 = document.querySelector(".icon-tubiaozhizuomoban1");
let iconTubiaozhizuomoban = document.querySelector(".icon-tubiaozhizuomoban");
let progressBar = document.querySelector(".progressBar");
let progressBarHead = document.querySelector(".progressBarHead");
let now = document.querySelector(".now");
let timer = null;
let timer1 = null;
let theWidth = video.offsetWidth;
function bar() {
  progressBarHead.style.left =
    (video.currentTime / video.duration) * theWidth + "px";
  now.style.width = (video.currentTime / video.duration) * theWidth + "px";
}
//绑定播放事件
video.onplay = function () {
  iconTubiaozhizuomoban1.style.display = "block";
  iconTubiaozhizuomoban.style.display = "block";
  play.classList.add("icon-zanting");
  play.classList.remove("icon-bofang");
  conceal(3);
  timer1 = setInterval(function () {
    bar();
  }, 15);
};
//绑定暂停事件
video.onpause = function () {
  play.classList.add("icon-bofang");
  play.classList.remove("icon-zanting");
  conceal(3);
  clearInterval(timer1);
};
//绑定结束播放事件
video.onended = function () {
  clearInterval(timer1);
  play.classList.add("icon-bofang");
  play.classList.remove("icon-zanting");
  play.style.display = "block";
};
//绑定点击事件,点击视频时出现暂停或者播放按钮
videoBox.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target.classList.contains("icon-bofang")) {
    video.play();
  } else if (e.target.classList.contains("icon-zanting")) {
    video.pause();
  } else if (e.target.classList.contains("speed")) {
    video.currentTime += 2;
  } else if (e.target.classList.contains("retreat")) {
    video.currentTime -= 2;
  } else {
    videospan.forEach(function (v) {
      if (v.style.display === "none") {
        v.style.display = "block";
      } else {
        v.style.display = "none";
      }
    });
    conceal(5);
  }
});
// 三秒后隐藏所有span,并结束定时器
function conceal(num) {
  clearInterval(timer);
  timer = setInterval(function () {
    console.log(333);
    videospan.forEach(function (v) {
      v.style.display = "none";
    });
    clearInterval(timer);
  }, num * 1000);
}
//绑定进度条拖拽事件
progressBarHead.addEventListener("touchstart", function (e) {
  console.log(888);
  let x = e.targetTouches[0].clientX;
  let left = progressBarHead.offsetLeft;
  let width = progressBarHead.offsetWidth;
  let duration = video.duration;
  document.addEventListener("touchmove", function (e) {
    let moveX = e.targetTouches[0].clientX;
    let moveLeft = moveX - x + left;
    if (moveLeft < 0) {
      moveLeft = 0;
    }
    if (moveLeft > theWidth - width) {
      moveLeft = theWidth - width;
    }
    progressBarHead.style.left = moveLeft + "px";
    video.currentTime = (moveLeft / theWidth) * duration;
    bar();
  });
  document.addEventListener("touchend", function () {
    document.removeEventListener("touchmove", null);
    document.removeEventListener("touchend", null);
  });
});
//绑定进度条点击事件
progressBar.addEventListener("click", function (e) {
  let theWidth = progressBar.offsetWidth;
  let theX = e.offsetX;
  video.currentTime = (theX / theWidth) * video.duration;
  bar();
});

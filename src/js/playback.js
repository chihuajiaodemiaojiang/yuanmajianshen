require("../css/playback.less");
const axios = require("axios");
let userObj = JSON.parse(localStorage.getItem("userObj"));
axios.defaults.headers.common["Authorization"] = "Bearer " + userObj.token;
let url = "http://47.96.154.185:3701";
let params = location.search;
let str = params.slice(1);
let arr = str.split("&");
let newArr = [];
let up = document.querySelector(".up");
let top = document.querySelector(".top");
let videotitle = document.querySelector(".video-title");

arr.forEach(function (item) {
  newArr.push(decodeURI(item.split("=")[1]));
});
let newurl = "";
let newtitle = "";
let newurl1 = "";
let newtitle1 = "";
let videoUrl = newArr[0];
let title = newArr[1];
let id = newArr[2];
console.log(id);
let back = document.querySelector(".back");

// 把id值加1
console.log(videoUrl);
console.log(title);
let VIDEO = document.querySelector("#VIDEO");
let Title = document.querySelector("#Title");
Title.innerHTML = title;
VIDEO.src = url + videoUrl;

axios
  .get(url + "/api/train/courseDetail", {
    params: {
      id: id,
    },
  })
  .then(function (res) {
    console.log(res.data);
    let data = res.data.data;
    back.onclick = function () {
      location.href = "./VideoDetails.html?id=" + parseInt(videoUrl.slice(-5));
    };
    videotitle.children[0].textContent =
      parseInt(videoUrl.slice(-5)) + "/" + data.fragments.length;
    data.fragments.forEach(function (item, index) {
      // console.log(item);
      if (videoUrl === item.videoUrl) {
        newurl =
          videoUrl.slice(0, -5) + (parseInt(videoUrl.slice(-5)) + 1) + ".mp4";
        newurl1 =
          videoUrl.slice(0, -5) + (parseInt(videoUrl.slice(-5)) - 1) + ".mp4";
      }
      if (
        title === item.title &&
        title !== data.fragments[data.fragments.length - 1].title
      ) {
        newtitle = data.fragments[index + 1].title;
      }
      if (title === item.title && title !== data.fragments[0].title) {
        newtitle1 = data.fragments[index - 1].title;
      }
    });
    up.onclick = function () {
      if (title === data.fragments[data.fragments.length - 1].title) {
        return;
      }
      location.href =
        "./playback.html?videoUrl=" +
        newurl +
        "&title=" +
        newtitle +
        "&id=" +
        id;
    };
    top.onclick = function () {
      if (title === data.fragments[0].title) {
        return;
      }
      location.href =
        "./playback.html?videoUrl=" +
        newurl1 +
        "&title=" +
        newtitle1 +
        "&id=" +
        id;
    };
  });

// console.log(url1);
// let top = document.querySelector(".top");
// top.onclick = function () {};
// 11111
// 11111
// 11111
// 11111
// 11111
// 11111
// 11111
// 11111
// 11111
// 11111

window.onload = function () {
  //全局变量获取
  let video = document.querySelector("video");
  let videoBox = document.querySelector(".video-box");
  let videospan = document.querySelectorAll(".video-box span");
  let play = document.querySelector(".play");
  let iconTubiaozhizuomoban1 = document.querySelector(
    ".icon-tubiaozhizuomoban1"
  );
  let iconTubiaozhizuomoban = document.querySelector(".icon-tubiaozhizuomoban");
  let progressBar = document.querySelector(".progressBar");
  let progressBarHead = document.querySelector(".progressBarHead");
  let now = document.querySelector(".now");
  let timer = null;
  let timer1 = null;
  let theWidth = video.offsetWidth;
  // 获取地址栏videoUrl和title
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
};

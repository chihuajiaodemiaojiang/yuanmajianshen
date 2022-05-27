require("../css/VideoDetails.less");
let axios = require("axios");
let api = "http://47.96.154.185:3701";
let id = location.search.split("=")[1];
console.log(id);
let vimg = document.querySelector("#vimg");
let videoName = document.querySelector(".video-title-name");
let CALORIE = document.querySelector("#CALORIE");
let TIME = document.querySelector("#TIME");
let peoplenum = document.querySelector("#peoplenum");
let desc = document.querySelector("#desc");
let frequency = document.querySelector("#frequency");
let instrument = document.querySelector("#instrument");
let playvideo = document.querySelector("#playvideo");
let headimgs = document.querySelector("#headimgs");
let userName = document.querySelector(".userName");
let userObj = JSON.parse(localStorage.getItem("userObj"));
axios.defaults.headers.common["Authorization"] = "Bearer " + userObj.token;
axios.get(api + "/api/user/info").then(function (res) {
  console.log(res);
  let data = res.data.data;
  headimgs.src = api + data.imgUrl;
  userName.textContent = data.nickName;
});

axios
  .get(api + "/api/train/courseDetail", {
    params: {
      id: id,
    },
  })
  .then((res) => {
    let data = res.data.data;
    console.log(data);
    console.log(data.imgurl);
    vimg.src = api + data.imgurl;
    videoName.innerHTML = data.name;
    CALORIE.innerHTML = data.calorie;
    TIME.innerHTML = data.time;
    peoplenum.innerHTML = data.peoplenum;
    desc.innerHTML = data.desc + ' <span style="color: black">更多</span>';
    frequency.innerHTML = "每周" + data.frequency + "次";
    instrument.innerHTML = data.instrument;
    data.fragments.forEach((item, index) => {
      if (index === id - 1) {
        playvideo.onclick = function () {
          location.href =
            "./playback.html?videoUrl=" +
            item.videoUrl +
            "&title=" +
            item.title +
            "&id=" +
            id +
            "&time=" +
            0;
        };
      }
    });
  });

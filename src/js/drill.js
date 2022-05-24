require("../css/drill.less");
let utils = require("./utils.js");
utils.getfooter("drill");
utils.getheader("drill");
let axios = require("axios");
let userObj = JSON.parse(localStorage.getItem("userObj"));
let newcourse = document.querySelector(".newcourse ul");
let courses = document.querySelector(".courses ul");
console.log(courses);

axios.defaults.headers.authorization = `Bearer ${userObj.token}`;
let api = "http://139.9.177.51:3701";
axios.get(api + "/api/train/courseList").then(function (res) {
  console.log(res.data);
  let data = res.data.data;
  let html = "";
  data.forEach(function (item, index) {
    if (item.courseId === 1) {
      newcourse.innerHTML += `
          <li >
             <img alt="" src="${api}${item.imgurl}" data-title="${item.courseId}"/>
              <p class="title">${item.name}</p>
              <p class="info">
                ${item.desc}
              </p>
          </li>
       `;
    } else {
      courses.innerHTML += `
           <li data-title="${item.courseId}">
              <img alt="" src="${api}${item.imgurl}" data-title="${item.courseId}"/>
              <div class="text">
              <p class="title">${item.name}</p>
              <p class="info">
                ${item.desc}
              </p>
              </div>
          </li>
          `;
    }
  });
});

let ul = document.querySelectorAll("main ul");
ul.forEach(function (item, index) {
  item.addEventListener("click", function (e) {
    console.log(e.target);
    if (e.target.nodeName === "IMG") {
      location.href = "./VideoDetails.html?id=" + e.target.dataset.title;
    }
  });
});

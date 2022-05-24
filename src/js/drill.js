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
          <li>
            <a href="./VideoDetails.html?courseId='${item.courseId}'">
              <img alt="" src="${api}${item.imgurl}" />
              <p class="title">${item.name}</p>
              <p class="info">
                ${item.desc}
              </p>
            </a>
          </li>
       `;
    } else {
      courses.innerHTML += `
              <li>
              <a href="./VideoDetails.html?courseId='${item.courseId}'">
             <img alt="" src="${api}${item.imgurl}" />
               <div class="text">
              <p class="title">${item.name}</p>
              <p class="info">
                ${item.desc}
              </p>
            </div>
            </a>
          </li>
          `;
    }
  });
});

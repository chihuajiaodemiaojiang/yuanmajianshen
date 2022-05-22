function getAlertBox(type, tip, callback) {
  let toast = document.createElement("div");
  toast.classList.add("popUpWindows");
  toast.innerHTML = ` <i class="iconfont  icon-${type}"></i>
    <p class="tips">${tip}</p>`;
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.remove();
    callback && callback();
  }, 2000);
}
// 导出

function getfooter(type) {
  let footer = document.createElement("footer");
  footer.classList.add("tab");
  footer.innerHTML = `
     <ul>
        <li>
          <a class="${type === "index" ? "on" : ""}" href="./index.html">
            <p class="iconfont icon-shouye1"></p>
            <span>首页</span>
          </a>
        </li>
        <li>
          <a class="${type === "drill" ? "on" : ""}" href="./drill.html">
            <p class="iconfont icon-shouye"></p>
            <span>运动</span>
          </a>
        </li>
        <li>
          <a class="${type === "account" ? "on" : ""}" href="./account.html">
            <p class="iconfont icon-wode1"></p>
            <span>我的</span>
          </a>
        </li>
      </ul>
`;
  document.body.appendChild(footer);
}
function getheader(type) {
  let header = document.createElement("header");
  header.classList.add("sports-header");
  header.innerHTML = `
   <ul>
        <li>
          <a class="${
            type === "running" ? "on" : ""
          }" href="./running.html">跑步</a>
        </li>
        <li>
          <a class="${
            type === "riding" ? "on" : ""
          }" href="./riding.html">骑行</a>
        </li>
        <li>
          <a class="${
            type === "drill" ? "on" : ""
          }" href="./drill.html">课程训练</a>
        </li>
      </ul>
`;
  document.body.insertBefore(header, document.querySelector("main"));
}
//返回上一页
function back() {
  document.querySelector("#back").onclick = function () {
    window.history.back();
  };
}
module.exports = {
  getAlertBox: getAlertBox,
  getfooter: getfooter,
  getheader: getheader,
  back: back,
};

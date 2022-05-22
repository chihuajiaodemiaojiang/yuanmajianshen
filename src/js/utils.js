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
module.exports = {
  getAlertBox: getAlertBox,
};
function getfooter() {
  let path = window.location.pathname;
}

let footer = document.createElement("footer");

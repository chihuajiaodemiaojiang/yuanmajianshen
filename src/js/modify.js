require("../css/modify.less");
let axios = require("axios");
let api = "http://139.9.177.51:3701";
let userObj = JSON.parse(localStorage.getItem("userObj"));
// 设置axios请求头:
axios.defaults.headers.authorization = `Bearer ${userObj.token}`;

window.addEventListener("load", function () {
  // 获取相关元素
  let nickname = document.querySelector("#nickname");
  let gender = document.querySelector("#gender");
  let birthday = document.querySelector("#birthday");
  let province = document.querySelector("#province");
  let city = document.querySelector("#city");
  let sign = document.querySelector("#sign");
  let signNum = document.querySelector("#signNum");
  let showSexPicker = document.querySelector("#showSexPicker");
  let showDatePicker = document.querySelector("#showDatePicker");
  let showProvincePicker = document.querySelector("#showProvincePicker");

  // 渲染数据到页面
  render();
  function render() {
    nickname.value = userObj.nickName;
    gender.textContent = userObj.gender ? userObj.gender : "未选择";
    birthday.textContent = userObj.birthday ? userObj.birthday : "未选择";
    gender.textContent = userObj.gender ? userObj.gender : "未选择";
    if (userObj.provinceId) {
      // 发请求,获取所有的省份,根据id筛选对应的省份名字
    } else {
      province.textContent = "未选择";
    }
    if (userObj.cityId) {
      // 发请求,获取对应省份的所有城市,根据id筛选对应的城市名字
    } else {
      city.textContent = "未选择";
    }
    sign.textContent = userObj.sign ? userObj.sign : "";
  }

  // 统计用户输入的字数
  sign.addEventListener("input", function () {
    signNum.textContent = this.value.length;
  });

  // 点击选择性别
  showSexPicker.addEventListener("click", function () {
    weui.picker(
      [
        {
          label: "男",
          value: 0,
        },
        {
          label: "女",
          value: 1,
        },
        {
          label: "人妖",
          value: 2,
        },
      ],
      {
        onConfirm: function (res) {
          console.log(res);
          gender.textContent = res[0].label;
        },
        title: "请选择性别",
      }
    );
  });

  // 请选择生日
  showDatePicker.addEventListener("click", function () {
    weui.datePicker({
      start: 1942,
      end: new Date().getFullYear(),
      onConfirm: function (res) {
        let time = `${res[0].value}-${fillZero(res[1].value)}-${fillZero(
          res[2].value
        )}`;
        birthday.textContent = time;
      },
      title: "请选择生日",
    });
  });

  // 补0函数
  function fillZero(n) {
    return n < 10 ? "0" + n : n;
  }

  // 获取所有的省份
  let provinces = [];
  function getProvinces() {
    axios
      .get(api + "/api/shared/province")
      .then(function (res) {
        let data = res.data.data;
        data.forEach(function (item) {
          provinces.push({
            label: item.name,
            value: item.id,
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  getProvinces();

  // 点击选择省份
  showProvincePicker.addEventListener("click", function () {
    console.log(provinces);

    weui.picker(provinces, {
      onConfirm: function (res) {
        console.log(res);
        province.textContent = res[0].label;
      },
      title: "请选择省份",
    });
  });
});

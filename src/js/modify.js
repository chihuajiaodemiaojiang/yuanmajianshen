require("../css/modify.less");
let axios = require("axios");
let api = "http://47.96.154.185:3701";
let userObj = JSON.parse(localStorage.getItem("userObj"));
function fillZero(n) {
  return n < 10 ? "0" + n : n;
}
axios.defaults.headers.authorization = `Bearer ${userObj.token}`;
window.addEventListener("load", function () {
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
  let showCityPicker = document.querySelector("#showCityPicker");
  let btn = document.querySelector(".btn");

  // 渲染数据到页面
  render();
  function render() {
    nickname.value = userObj.nickName;
    gender.textContent = userObj.gender ? userObj.gender : "未选择";
    birthday.textContent = userObj.birthday ? userObj.birthday : "未选择";
    gender.textContent = userObj.gender ? userObj.gender : "未选择";
    if (userObj.provinces) {
      // 发请求,获取所有的省份,根据id筛选对应的省份名字
      axios.get(api + "/api/shared/province").then(function (res) {
        console.log(res);
        let provinceArr = res.data.data;
        let provinceName = provinceArr.find(function (item) {
          return item.id === userObj.provinces;
        });
        province.textContent = provinceName.name;
      });
    } else {
      province.textContent = "未选择";
    }
    if (userObj.city) {
      axios
        .get(api + "/api/shared/city?provinceId=" + userObj.provinces)
        .then(function (res) {
          console.log(res);
          let cityArr = res.data.data;
          let cityName = cityArr.find(function (item) {
            return item.id === userObj.city;
          });
          city.textContent = cityName.name;
        });
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
  let provinceId;
  let cityid;
  // 点击选择省份
  showProvincePicker.addEventListener("click", function () {
    console.log(provinces);
    city.textContent = "未选择";
    weui.picker(provinces, {
      onConfirm: function (res) {
        console.log(res);
        province.textContent = res[0].label;
        getCities(res[0].value);
        provinceId = res[0].value;
      },
      title: "请选择省份",
    });
  });

  // 获取对应省份的所有城市
  function getCities(e) {
    let cities = [];
    axios
      .get(api + "/api/shared/city", {
        params: {
          provinceId: e,
        },
      })
      .then(function (res) {
        console.log(res);
        let data = res.data.data;
        data.forEach(function (item) {
          cities.push({
            label: item.name,
            value: item.id,
          });
        });
        console.log(cities);
      })
      .catch(function (err) {
        console.log(err);
      });
    showCityPicker.addEventListener("click", function () {
      weui.picker(cities, {
        onConfirm: function (res) {
          city.textContent = res[0].label;
          cityid = res[0].value;
        },
        title: "请选择城市",
      });
    });
  }
  btn.addEventListener("click", function () {
    let obj = {
      nickName: nickname.value,
      gender: gender.textContent,
      birthday: birthday.textContent,
      provinces: provinceId,
      city: cityid,
      sign: sign.value,
    };
    axios.post(api + "/api/user/changeInfo", obj).then(function (res) {
      console.log(res);
      if (res.data.errno === 0) {
        let newObj = Object.assign({}, res.data.data, obj);
        console.log(newObj);
        localStorage.setItem("userObj", JSON.stringify(newObj));
        location.href = "./account.html";
      }
    });
  });
});

require("../css/sportsData.less");
let echarts = require("echarts");
const axios = require("axios");
let userObj = JSON.parse(localStorage.getItem("userObj"));
axios.defaults.headers.authorization = `Bearer ${userObj.token}`;
let api = "http://47.96.154.185:3701";
let headPortrait = document.querySelector(".headPortrait");
let ka = document.querySelector(".ka");
let day3 = document.querySelector(".day3");
let day4 = document.querySelector(".day4");
let back5 = document.querySelector(".back5");
let type = location.search.split("=")[1];
console.log(type);
if (type === "index") {
  back5.href = "./index.html";
}
axios.get(api + "/api/user/info").then((res) => {
  console.log(res);
  if (res.data.errno === 0) {
    let data3 = res.data.data;
    headPortrait.children[2].src = api + data3.imgUrl;
    ka.textContent = data3.calorie;
    day3.textContent = Math.floor(data3.duration / 60 / 24);
    day4.textContent = data3.clockCount;
  }
});
axios.get(api + "/api/exercise").then((res) => {
  let data1 = res.data.data;
  let min = document.querySelector(".min");
  let calorie2 = document.querySelector(".calorie");

  min.children[1].innerHTML =
    Math.floor(data1.sum7Duration / 6) + "<span>分钟</span>";
  calorie2.children[1].innerHTML = data1.sum7Calorie + "<span>千卡</span>";
  console.log(data1);
  let dataAxis = [];
  let data = [];
  let runing = 0;
  let running = 0;
  let train = 0;
  data1.days.forEach((item) => {
    // 截取item.date后5位
    dataAxis.push(item.date.slice(5));
    data.push(Math.floor(item.sumDuration / 60));
    item.exerciseData.forEach((item1) => {
      if (item1.type === 0) {
        runing += item1.duration;
      }
      if (item1.type === 1) {
        running += item1.duration;
      }
      if (item1.type === 2) {
        train += item1.duration;
      }
    });
  });
  SportsClassification();
  exerciseTime();
  function exerciseTime() {
    let chartDom = document.getElementById("exerciseTimeTree");
    let myChart = echarts.init(chartDom);
    let option;
    let yMax = 500;
    let dataShadow = [];
    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
    option = {
      title: {
        text: "近七天运动时长",
        textStyle: {
          fontWeight: "normal",
          fontSize: "14",
        },
        left: "5%",
        top: "5%",
      },
      grid: {
        bottom: "7%",
        top: "20%",
        right: "5%",
        left: "12%",
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          color: "#fff",
          fontSize: "10",
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#999",
        },
      },
      dataZoom: [
        {
          type: "inside",
        },
      ],
      series: [
        {
          type: "bar",
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ]),
            },
          },
          data: data,
        },
      ],
    };
    // Enable data zoom when user click bar.
    const zoomSize = 6;
    myChart.on("click", function (params) {
      console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
      myChart.dispatchAction({
        type: "dataZoom",
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue:
          dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
      });
    });

    option && myChart.setOption(option);
  }
  function SportsClassification() {
    var chartDom = document.getElementById("pieChartOfSportsClassification");
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      title: {
        text: "运动分类",
        textStyle: {
          fontWeight: "normal",
          fontSize: "14",
        },
        left: "5%",
        top: "5%",
      },
      legend: {
        orient: "vertical",
        left: "5%",
        top: "25%",
        textStyle: {
          color: [
            "#fc8251",
            "#5470c6",
            "#91cd77",
            "#ef6567",
            "#f9c956",
            "#75bedc",
          ],
        },
      },
      color: ["#fc8251", "#5470c6", "#91cd77", "#ef6567", "#f9c956", "#75bedc"],
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
        },
      },

      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: ["10%", "90%"],
          center: ["60%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          label: {
            show: true,
            position: "inside",
            formatter: "{d}%", //只要百分比
            color: "#fff",
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: runing, name: "跑步" },
            { value: running, name: "骑行" },
            { value: train, name: "训练" },
          ],
        },
      ],
    };
    option && myChart.setOption(option);
  }
});

require("../css/sportsData.less");
let echarts = require("echarts");
exerciseTime();
function exerciseTime() {
  let chartDom = document.getElementById("exerciseTimeTree");
  let myChart = echarts.init(chartDom);
  let option;
  // prettier-ignore
  let dataAxis = ['5-20', '5-21', '5-22', '5-23', '5-24', '5-25', '5-26'];
  // prettier-ignore
  let data = [220, 182, 191, 234, 290, 330, 310,];
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
SportsClassification();
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
          { value: 25, name: "跑步" },
          { value: 35, name: "骑行" },
          { value: 40, name: "训练" },
        ],
      },
    ],
  };
  option && myChart.setOption(option);
}

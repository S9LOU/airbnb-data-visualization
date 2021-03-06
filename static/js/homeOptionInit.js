function plotBoundary(bmap, region) {
  
  const bdary = new BMap.Boundary();
  bdary.get(region, function(res) {
    var count = res.boundaries.length; //行政区域的点有多少个
    for(var i = 0; i < count; i++){
      var ply = new BMap.Polygon(res.boundaries[i], 
                {strokeWeight: 2, //设置多边形边线线粗
                strokeOpacity: 1, //设置多边形边线透明度0-1
                StrokeStyle: "solid", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
                strokeColor: "#ff0000", //设置多边形边线颜色
                fillColor: "#00ffff", //设置多边形填充颜色
                fillOpacity:0.1 //设置多边形填充颜色透明度0-1  注：标红的地放你们可以去掉看一下效果，自己体验一下
            });
      // ply.setLabel('bmap')
      const allOverlay = bmap.getOverlays();
      for (var i = 0; i < allOverlay.length -1; i++){
        bmap.removeOverlay(allOverlay[i]);
      }
      bmap.addOverlay(ply);  //添加覆盖物
      bmap.setViewport(ply.getPath());    //调整视野
    }
  })

}

function plotPointAppend(myChart, region, bounds) {
  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json',
    }
  };
  let url = 'location_data'
  if (region && bounds) {
    url = url + '?region=' + region + '&bounds=' + bounds
  }
  else if (region) {
    url = url + '?region=' + region
  }
  else if (bounds) {
    url = url + '?bounds=' + bounds
  }

  fetch(url, settings)
  .then((response) => response.json())
  .then(function (res) {
    const pointData = res.data;
    // console.log(pointData)
    myChart.appendData({
      seriesIndex: 1,
      data: pointData
    })
  })

}

function plotPoint(myChart, region, bounds) {
  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json',
    }
  };
  let url = 'location_data'
  if (region && bounds) {
    url = url + '?region=' + region + '&bounds=' + bounds
  }
  else if (region) {
    url = url + '?region=' + region
  }
  else if (bounds) {
    url = url + '?bounds=' + bounds
  }

  fetch(url, settings)
  .then((response) => response.json())
  .then(function (res) {
    const pointData = res.data;
    const size = pointData.length;
    const bignum = Math.log(40000 / size)
    console.log(size, url)
    console.log(pointData[0])
    let option = myChart.getOption();
    option.series[1].data = pointData
    if (region || bounds) {
      option.series[1].symbolSize = function (val) {
        return val[13]  *bignum + 0.1
      }
    }
    if (size < 100) {
      option.series[1].blendMode = 'source-over';
    }
    // console.log(option)
    myChart.setOption(option);

  })
}

function initNeighborhoodMap (myChart,data, pointTitle, pointCname){
    console.log(data)
    const option = {
        title: {
            text: '北京地区Airbnb房源',
            left: 'right',
            textStyle: {
              color: '#fff',
              fontSize: 24
            },

        },
        visualMap: [{
            left: 'right',
            min: 0,
            max: 15000,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            text: ['High', 'Low'],
            calculable: true,
            seriesIndex: 0,
            show: false
        }, {
          type: 'piecewise',
          top:'78%',
          left: null,
          right: 0,
          categories: ["Entire home/apt", "Private room", "Shared room"],
          dimension: 8,
          color: ['#d94e5d','#eac736','#50a3ba'],
          text:['房间类型'],
          showLabel: true,
          seriesIndex: 1,
          textStyle: {
            color: '#fff'
          },
        }, {
          type: 'piecewise',
          top: '36%',
          left: null,
          right: 0,
          dimension: 9,
          seriesIndex: 1,
          textStyle: {
            color: '#fff'
          },
          text: ['价格'],
          showLabel: true,
          min: 0,
          max: 80000,
          pieces: [
            {gt: 5000}, 
            {gt: 1000, lt: 5000},
            {gt: 500, lt: 1000},
            {gt: 300, lt: 500},
            {gt: 200, lt: 300},
            {gt: 100, lt: 200},
            {lt: 100}
          ],
          // calculable: true,
          // itemWidth: 20,
          inRange: {
            colorLightness: [0.5]
          },
          controller: {
              inRange: {
                  color: ['#d94e5d','#50a3ba'],
              },
              outOfRange: {
                  color: ['#444']
              }
          }
        }, {
          top: '8%',
          left: null,
          right: 0,
          dimension: 11,
          seriesIndex: 1,
          textStyle: {
            color: '#fff'
          },
          text: ['评价'],
          showLabel: true,
          min: 0,
          max: 350,
          itemHeight: 100,
          calculable: true,
          inRange: {
            colorLightness: [0.5]
          },
          controller: {
              inRange: {
                color: ['#c23531']
              },
              outOfRange: {
                  color: ['#444']
              }
          }
        }],
        tooltip : {
          trigger: 'item',
          showDelay: 0,
          enterable: true,
          transitionDuration: 0.2,
          position: 'bottom',
          formatter: function (params) {
            if (params.seriesIndex == 0) {
              return params.name + ': ' + params.value;
            }
            else if (params.seriesIndex == 1){
              const onedata = params.data;
              let text = `<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">${onedata[3]}`
              text = `${text}<br> <button class="btn" id="detail" onclick="getdetailInfo('${onedata[2]}')">查看评价</button></div>`
              for (let i = 0 ; i < onedata.length; i ++) {
                if (i == 3) continue;
                text = `${text}${pointCname[pointTitle[i]]}: ${onedata[i]}<br>`
              }
              return text;
            }

          }
        },
        itemStyle: {
        },
        toolbox: {
          itemSize: 26,
          itemGap: 22,
          show: true,
          iconStyle: {
            opacity: 1,
            color: '#fff'
          },
          emphasis: {
           iconStyle: {
               textFill: '#fff',
              //  textAlign: 'right'
           }
          },
          orient: 'vertical',
          left: '3%',
          top: '5%',
          feature: {
              // dataView: {readOnly: false},
              myHome: {
                title: "回到主页",
                icon: "path://M971.6736 445.2352L594.8416 53.3504a122.2656 122.2656 0 0 0-176.5376 0L41.5744 445.2352c-38.912 40.96-33.8944 75.4688-27.5456 90.0096a65.536 65.536 0 0 0 64.6144 38.912h55.296v301.4656c0 68.4032 49.152 133.12 119.0912 133.12h160.3584V689.4592c0-34.2016-5.12-53.248 29.7984-53.248h126.7712c35.0208 0 29.7984 19.0464 29.7984 53.248v319.0784h160.4608c69.8368 0 119.0912-64.512 119.0912-133.12V574.1568h55.1936a65.536 65.536 0 0 0 64.6144-38.912c6.4512-14.5408 11.4688-49.5616-27.4432-90.0096z",
                onclick: goHome
              },
              myRestore: {
                title: "还原",
                icon: "path://M924.435692 717.587692l178.018462-260.647384h-125.873231C959.724308 202.043077 747.992615 0 488.841846 0A488.920615 488.920615 0 0 0 0 489.472a489.314462 489.314462 0 0 0 489.314462 489.235692 485.218462 485.218462 0 0 0 272.699076-83.495384 53.326769 53.326769 0 1 0-60.100923-88.064c-60.809846 40.802462-133.907692 64.827077-212.598153 64.827077a382.818462 382.818462 0 0 1 0-765.479385 382.188308 382.188308 0 0 1 380.612923 350.444308H746.417231l178.018461 260.647384z",
                onclick: initBefore
              },
              myTraffic: {
                title: "交通相关性分析",
                icon: "path://M937.984 583.68v198.4A127.104 127.104 0 0 1 832 907.52v30.08a54.272 54.272 0 0 1-54.208 54.4h-1.6a54.272 54.272 0 0 1-54.208-54.4v-27.52H302.016v27.52a54.272 54.272 0 0 1-54.208 54.4h-1.664A54.272 54.272 0 0 1 192 937.6v-30.08a127.104 127.104 0 0 1-105.984-125.44v-198.4A53.632 53.632 0 0 1 32 529.92V412.16a54.208 54.208 0 0 1 54.016-54.4V160a128 128 0 0 1 128-128h595.968a128 128 0 0 1 128 128v197.76a54.208 54.208 0 0 1 54.016 54.4v117.76a53.632 53.632 0 0 1-54.016 53.76zM158.016 748.16a72.256 72.256 0 1 0 72-65.92 69.056 69.056 0 0 0-72 65.92z m656-604.16H209.984V544h604.032V144z m-20.032 538.24a66.176 66.176 0 1 0 72 65.92 69.12 69.12 0 0 0-72-65.92z",
                onclick: goTraffic
              },
              myTenant: {
                title: "租客选择特征分析",
                icon: "path://M807.716571 689.883429a441.782857 441.782857 0 0 0 39.570286-85.430858h-81.92v-53.248h87.771429v-73.142857c-23.990857 3.510857-48.566857 6.436571-74.313143 8.777143l-11.117714-49.737143c73.728-6.436571 138.678857-18.724571 196.022857-36.864l19.309714 51.492572c-23.990857 6.436571-49.152 12.288-74.898286 17.554285v81.92h76.653715v53.248h-76.653715v25.161143c27.501714 24.576 55.003429 50.907429 82.505143 80.164572l-30.427428 46.811428c-19.894857-29.257143-37.449143-52.662857-52.077715-70.802285v251.026285h-38.619428a36.278857 36.278857 0 0 1-29.257143 14.409143H36.571429c-20.48 0-36.571429-16.091429-36.571429-36.571428C0 729.088 116.150857 592.457143 279.844571 538.331429a290.596571 290.596571 0 0 1-133.705142-244.809143A292.205714 292.205714 0 0 1 438.418286 1.243429 292.205714 292.205714 0 0 1 730.697143 293.522286c0 103.058286-53.321143 192.950857-133.705143 244.809143 87.186286 28.818286 160.914286 81.042286 210.651429 151.552z m25.088 40.96c7.753143 14.628571 14.555429 29.915429 20.333715 45.787428V686.957714a584.192 584.192 0 0 1-20.333715 43.885715z m415.305143-313.051429v446.464h45.056v53.248h-331.776v-53.248h50.907429V417.792h235.812571z m-181.979428 446.464h126.390857v-98.304h-126.390857v98.304z m0-150.381714h126.390857V616.155429h-126.390857V713.874286z m0-149.796572h126.390857V469.869714h-126.390857v94.208z",
                onclick: goTenant
              },
              myOwner: {
                title: "房东画像",
                icon: "path://M1009.5616 790.8352L773.4272 570.368a31.744 31.744 0 0 0-42.7008-0.512L482.816 790.528a31.744 31.744 0 0 0 21.0944 55.7056h77.0048v144.9984a31.744 31.744 0 0 0 31.744 31.8464h269.312a31.744 31.744 0 0 0 31.744-31.8464V846.1312h74.1376a31.744 31.744 0 0 0 21.7088-55.296zM881.9712 782.336a31.744 31.744 0 0 0-31.8464 31.9488v144.9984H644.5056V814.08a31.9488 31.9488 0 0 0-31.744-31.9488h-25.088l163.5328-145.408 155.8528 145.408h-25.088zM664.576 583.168A450.1504 450.1504 0 0 0 561.8688 542.72 281.3952 281.3952 0 0 0 455.68 1.024a281.3952 281.3952 0 0 0-280.576 281.6c0 117.4528 72.0896 218.112 174.1824 260.1984A456.704 456.704 0 0 0 0.7168 986.3168a31.8464 31.8464 0 1 0 63.488 0c0-216.576 175.616-392.8064 391.3728-392.8064 56.32 0 109.8752 12.288 158.3104 33.9968l50.688-44.3392zM238.592 282.5216c0-120.0128 97.28-217.7024 217.088-217.7024a217.7024 217.7024 0 1 1 0 435.5072 217.6 217.6 0 0 1-217.088-217.8048z",
                onclick: goOwner
              }
          }
        },
        bmap: {
            center: [116.46, 39.92],
            zoom: 12,
            roam: true,
            geoIndex: 0,
            mapStyle: {
              'styleJson': [
                {
                  'featureType': 'water',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#031628'
                  }
                },
                {
                  'featureType': 'land',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#000102'
                  }
                },
                {
                  'featureType': 'highway',
                  'elementType': 'all',
                  'stylers': {
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'arterial',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'arterial',
                  'elementType': 'geometry.stroke',
                  'stylers': {
                    'color': '#0b3d51'
                  }
                },
                {
                  'featureType': 'local',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'railway',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'railway',
                  'elementType': 'geometry.stroke',
                  'stylers': {
                    'color': '#08304b'
                  }
                },
                {
                  'featureType': 'subway',
                  'elementType': 'geometry',
                  'stylers': {
                    'lightness': -70
                  }
                },
                {
                  'featureType': 'building',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'poi',
                  'elementType': 'all',
                  'stylers': {
                      'visibility': 'off'
                  }
                }, 
                {
                  'featureType': 'all',
                  'elementType': 'labels.text.fill',
                  'stylers': {
                    'color': '#857f7f'
                  }
                },
                {
                  'featureType': 'all',
                  'elementType': 'labels.text.stroke',
                  'stylers': {
                    'color': '#000000',
                  }
                },
                {
                  'featureType': 'building',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#022338'
                  }
                },
                {
                  'featureType': 'green',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#062032'
                  }
                },
                {
                  'featureType': 'boundary',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#465b6c'
                  }
                },
                {
                  'featureType': 'manmade',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#022338'
                  }
                },
                {
                  'featureType': 'label',
                  'elementType': 'all',
                  'stylers': {
                    'visibility': 'on'
                  }
                }
              ]
            }
        },
        series: [
            {
                name: 'Beijing listings',
                type: 'map',
                zoom: 0.5,
                map: 'Beijing',
                top:'33%',
                left:'-5%',
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: data
            },
            {
                name: 'listings scatter',
                type: 'scatter',
                coordinateSystem: 'bmap',
                blendMode: 'lighter',
                // large: true,
                // 根据reviews_per_month显示大小
                symbolSize: function (val) {
                  return val[13] + 0.3
                },
                data: []
            }
        ]
    };

    return option
}



function makeParallelAxis(schema) {
  var parallelAxis = [];
  for (var i = 1; i < schema.length; i++) {
      parallelAxis.push({dim: i, name: schema[i]});
  }
  return parallelAxis;
}

function initParallelOption(pointTitle, data) {
  option = {
    parallelAxis: makeParallelAxis(pointTitle),
    parallel: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '30%',
        axisExpandable: true,
        axisExpandCenter: 15,
        axisExpandCount: 10,
        axisExpandWidth: 60,
        axisExpandTriggerOn: 'mousemove',

        z: 100,
        parallelAxisDefault: {
            type: 'value',
            nameLocation: 'start',
            nameRotate: 30,
            // nameLocation: 'end',
            nameTextStyle: {
              color: '#bbb',
                fontSize: 12
            },
            nameTruncate: {
                maxWidth: 170
            },
            nameGap: 20,
            splitNumber: 3,
            tooltip: {
                show: true
            },
            axisLine: {
                // show: false,
                lineStyle: {
                    width: 1,
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#bbb'
            },
            splitLine: {
                show: false
            },
            z: 100
        }
    },
    series: [
        {
            name: 'parallel',
            type: 'parallel',
            smooth: true,
            lineStyle: {
                color: '#577ceb',
                width: 0.5,
                opacity: 0.4
            },
            z: 100,
            blendMode: 'lighter',
            data: data
        }
    ]
  };
  return option;
}

function initRadarOption(data, smileData, sadData) {
    
  const showdata = [[data.review_scores_accuracy,
  data.review_scores_cleanliness,
  data.review_scores_checkin,
  data.review_scores_communication,
  data.review_scores_location,
  data.review_scores_value]]
  const sad = "path://M517.12 53.248c63.488 0 123.221 12.117 179.2 36.352 55.979 24.235 104.619 57.003 145.92 98.304 41.301 41.301 74.069 89.941 98.304 145.92 24.235 55.979 36.352 115.712 36.352 179.2 0 63.488-12.117 123.221-36.352 179.2-24.235 55.979-57.003 104.619-98.304 145.92-41.301 41.301-89.941 74.069-145.92 98.304-55.979 24.235-115.712 36.352-179.2 36.352-63.488 0-123.221-12.117-179.2-36.352-55.979-24.235-104.619-57.003-145.92-98.304-41.301-41.301-74.069-89.941-98.304-145.92-24.235-55.979-36.352-115.712-36.352-179.2 0-63.488 12.117-123.221 36.352-179.2 24.235-55.979 57.003-104.619 98.304-145.92 41.301-41.301 89.941-74.069 145.92-98.304 55.979-24.235 115.712-36.352 179.2-36.352zM663.552 261.12c-10.24 0-19.627 2.219-28.16 6.656-8.533 4.437-16.213 10.581-23.04 18.432-6.827 7.851-12.117 17.067-15.872 27.648-3.755 10.581-5.632 21.675-5.632 33.28 0 23.893 7.168 44.373 21.504 61.44 14.336 17.067 31.403 25.6 51.2 25.6 19.797 0 36.864-8.533 51.2-25.6 14.336-17.067 21.504-37.547 21.504-61.44 0-11.605-1.877-22.699-5.632-33.28s-9.045-19.797-15.872-27.648c-6.827-7.851-14.507-13.995-23.04-18.432-8.533-4.437-17.92-6.656-28.16-6.656z m-289.792 0c-19.797 0-36.693 8.363-50.688 25.088-13.995 16.725-20.992 37.035-20.992 60.928s6.997 44.373 20.992 61.44c13.995 17.067 30.891 25.6 50.688 25.6 19.797 0 36.523-8.533 50.176-25.6 13.653-17.067 20.48-37.547 20.48-61.44s-6.827-44.203-20.48-60.928c-13.653-16.725-30.379-25.088-50.176-25.088z m146.432 340.992c-34.133 0-66.56 3.243-97.28 9.728-30.72 6.485-58.368 15.701-82.944 27.648s-45.397 25.771-62.464 41.472-29.013 32.768-35.84 51.2c-0.683 0.683-1.024 1.365-1.024 2.048-0.683 2.048-1.024 4.949-1.024 8.704 0 3.755 0.853 7.68 2.56 11.776s4.096 7.851 7.168 11.264c3.072 3.413 7.339 5.461 12.8 6.144 17.067-18.432 37.888-35.157 62.464-50.176 21.163-12.971 47.616-24.747 79.36-35.328 31.744-10.581 69.803-15.872 114.176-15.872 45.056 0 83.968 5.291 116.736 15.872s60.075 22.357 81.92 35.328c25.259 15.019 46.421 31.744 63.488 50.176 11.605-3.413 18.261-9.728 19.968-18.944 1.707-9.216 1.877-15.531 0.512-18.944-1.365-3.413-2.389-5.803-3.072-7.168-0.683-1.365-1.024-2.389-1.024-3.072-17.749-36.864-51.2-66.389-100.352-88.576-49.152-22.187-107.861-33.28-176.128-33.28z"
  const smile = "path://M512 0C227.555556 0 0 227.555556 0 512s227.555556 512 512 512 512-227.555556 512-512-227.555556-512-512-512z m119.466667 307.2c11.377778-11.377778 28.444444-17.066667 39.822222-17.066667 17.066667 0 28.444444 5.688889 39.822222 17.066667 11.377778 11.377778 17.066667 28.444444 17.066667 39.822222 0 22.755556-11.377778 39.822222-28.444445 51.2-17.066667 11.377778-39.822222 11.377778-62.577777 0s-28.444444-28.444444-28.444445-51.2c5.688889-11.377778 11.377778-28.444444 22.755556-39.822222z m-324.266667 0c11.377778-11.377778 28.444444-17.066667 39.822222-17.066667 17.066667 0 28.444444 5.688889 39.822222 17.066667s17.066667 28.444444 17.066667 39.822222c0 34.133333-28.444444 62.577778-62.577778 62.577778s-51.2-28.444444-51.2-62.577778c0-11.377778 5.688889-28.444444 17.066667-39.822222zM512 870.4c-170.666667 0-312.888889-119.466667-341.333333-267.377778-5.688889-34.133333 22.755556-45.511111 51.2-39.822222 91.022222 28.444444 193.422222 39.822222 290.133333 39.822222 96.711111 0 193.422222-11.377778 290.133333-39.822222 28.444444-5.688889 56.888889 0 51.2 34.133333-28.444444 147.911111-170.666667 273.066667-341.333333 273.066667z"
  option = {
    backgroundColor: '#161627',
    title: {
        text: '综合评价： '+ data.review_scores_rating + '分',
        left: 'left',
        textStyle: {
            color: '#fff'
        },
        subtext: '点击查看房源原网页',
        sublink: data.listing_url,
        subtextStyle: {
          color: '#eee'
        }
    },
    tooltip: {},
    radar: {
        indicator: [ 
            {name: '准确度评分', max: 10},
            {name: '洁净度评分', max: 10},
            {name: '入住评分', max: 10},
            {name: '沟通评分', max: 10},
            {name: '地理位置评分', max: 10},
            {name: '性价比评分', max: 10}
        ],
        shape: 'circle',
        splitNumber: 5,
        radius: '30%',
        center: ['50%', '30%'],
        name: {
            textStyle: {
                color: 'rgb(238, 197, 102)'
            }
        },
        splitLine: {
            lineStyle: {
                color: [
                    'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                    'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                    'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                ].reverse()
            }
        },
        splitArea: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(238, 197, 102, 0.5)'
            }
        }
    },
    calendar: [{
      left: 'center',
      top: '60%',
      cellSize: 30,
      splitLine: {
          show: true,
          lineStyle: {
              color: 'rgb(238, 197, 102)',
              width: 3,
              type: 'solid'
          }
      },
      yearLabel: {
          formatter: '最近3个月评价',
          textStyle: {
              color: '#fff',
              fontSize: 14
          }
      },
      itemStyle: {
          color: '#323c48',
          borderWidth: 1,
          borderColor: 'rgb(238, 197, 102)'
      },
      dayLabel: {
        color: 'rgb(238, 197, 102)',
      },
      monthLabel: {
        color: 'rgb(238, 197, 102)',
      },
      range: ['2019-12-01', '2020-02-28'],
    }],
    series: [
        {
            name: '评分',
            type: 'radar',
            data: showdata,
            symbol: 'circle',
            itemStyle: {
                color: '#F9713C'
            },
            areaStyle: {
                opacity: 0.1
            }
        },
        {
            name: '喜欢',
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: smileData,
            symbolSize: 20,
            itemStyle: {
                color: '#FF3030'
            },
            symbol: smile,
            tooltip: {
              position: 'top',
              formatter: function(params) {
                const show = params.data;
                const text = `${show[0]}<br>
                <div style="display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">
                ${show[3]}</div>
                <br>--- by ${show[2]}`
                return text;
              }
            }
        },
        {
            name: '不喜欢',
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: sadData,
            symbolSize: 20,
            itemStyle: {
                color: '#63B8FF'
            },
            symbol: sad,
            tooltip: {
              position: 'top',
              formatter: function(params) {
                const show = params.data;
                const text = `${show[0]}<br>
                <div style="display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">
                ${show[3]}</div>
                <br>--- by ${show[2]}`
                return text;
              }
            }
        },
    ]
  };
  return option;
}
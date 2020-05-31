var colorlist = [
    "#dd6b66","#759aa0","#e69d87","#8dc1a9","#ea7e53","#eedd78","#73a373","#73b9bc",
    "#7289ab","#91ca8c","#f49f42","#893448","#d95850","#eb8146","#ffb248","#f2d643",
    "#ebdba4",'#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026',
    "#fc97af","#87f7cf","#f7f494","#72ccff","#f7c5a0","#d4a4eb","#d2f5a6","#76f2f2",
    "#c12e34","#e6b600","#0098d9","#2b821d","#005eaa","#339ca8","#cda819","#32a487"
];
function init_relation_option(maskImage, title, data, worddata){

  
    option = {
        title: {
            text: 'Airbnb房东画像',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 24
            },
        },
        tooltip: {
            position: 'top'
        },
        grid:[{
            seriesIndex: 0,
            width: '40%',
            height: '70%',
            left: '14%'
        }
        ],
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
              }
          }
        },
        xAxis: {
            type: 'category',
            data: title,
            splitArea: {
                show: true
            },
            axisLabel: {
                show: true,
                color: '#fff',
                rotate: 30
            }
        },
        yAxis: {
            type: 'category',
            data: title,
            splitArea: {
                show: true
            },
            axisLabel: {
                show: true,
                color: '#fff'
            }
        },
        visualMap: {
            min: -1,
            max: 1,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%',
            seriesIndex: 0,
            show:false
        },
        series: [{
            name: 'realtion',
            type: 'heatmap',
            data: data,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },{
            type: 'wordCloud',
            shape: 'pentagon',
            maskImage: maskImage,
    
            left: 'right',
            top: '5%',
            width: '45%',
            height: '80%',
    
            sizeRange: [10, 70],
    
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 1,
            drawOutOfBound: false,
            textStyle: {
                normal: {
                    color: function () {
                        // Random color
                        // const col = 'rgb(' + [
                        //     Math.round(Math.random() * 255),
                        //     Math.round(Math.random() * 255),
                        //     Math.round(Math.random() * 255)
                        // ].join(',') + ')';
                        const col = colorlist[Math.floor(Math.random() * colorlist.length)];
                        return col
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
    
            // Data is an array. Each array item must have name and value property.
            data: worddata
        }]
    };
    return option;
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

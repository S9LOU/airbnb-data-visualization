
function initTrafficMap (){
    const option = {
        title: {
            text: '北京地区Airbnb房源',
            left: 'right',
            textStyle: {
              color: '#fff',
              fontSize: 24
            },

        },
        tooltip : {
          trigger: 'item',
          showDelay: 0,
          enterable: true,
          transitionDuration: 0.2,
          position: 'bottom',
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
                    'color': '#031628',
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'land',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#000102',
                    'visibility': 'off'
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
                    'color': '#000000',
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'arterial',
                  'elementType': 'geometry.stroke',
                  'stylers': {
                    'color': '#0b3d51',
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'local',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#000000',
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'railway',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000',
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'subway',
                  'elementType': 'geometry',
                  'stylers': {
                    "visibility": "on"
                  }
                },
                {
                  'featureType': 'building',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000',
                    'visibility': 'off'
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
                  'elementType': 'labels.text',
                  'stylers': {
                    'color': '#ffffff',
                    "fontsize": 300
                  }
                },
                {
                  'featureType': 'building',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#022338',
                  }
                },
                {
                  'featureType': 'green',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#062032',
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'boundary',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#465b6c',
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'manmade',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#022338',
                    'visibility': 'off'
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



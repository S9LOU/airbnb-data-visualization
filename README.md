# airbnb-data-visualization

### 启动方式
```
python main.py
```

static/data/detail下面是详细信息的csv，没有传到github上，包括calendar.csv,listings.csv,reviews.csv

目录结构为：
│  .gitignore
│  main.py  #数据处理和页面地址
│  README.md
│  
└─static
    │  index.html   #主页
    │  owner.html   #房东可视化
    │  tenant.html  #租客可视化
    │  traffic.html #交通可视化
    │  
    ├─data
    │  │  csvname.json          #对应的中文意思
    │  │  listings.csv
    │  │  neighbourhoods.csv
    │  │  neighbourhoods.geojson
    │  │  owner_wordcount.json  #处理得到的房东词云
    │  │  reviews.csv           #简短的评论信息
    │  │  stopwords.txt         #停词处理
    │  │  subway.geojson        #高德地图处理过的地铁geojson
    │  │  subway.json           #高德地图下载的地铁信息
    │  │  subwayTime.json       #高德地图下载的地铁信息
    │  │  tenant_wordcount.json #处理得到的租客词云
    │  │  
    │  ├─detail
    │  │      calendar.csv  #详细日历信息 未上传
    │  │      listings.csv  #详细房源信息 未上传
    │  │      reviews.csv   #详细评价信息 未上传
    │  │      
    │  └─pic
    │          
    └─js
        │  d3.min.js
        │  dark.js
        │  echarts-wordcloud.min.js
        │  echarts.min.js
        │  homeOptionInit.js    #初始化主页echart option
        │  jquery.js
        │  owner.js             #初始化房东页echart option
        │  router.js            #跳转路由
        │  tenant.js            #初始化租客页echart option
        │  
        └─library
                d3-force-attract.js
                d3-tip.js
                d3.tip.v0.6.3.js
                jquery-3.4.1.min.js
                moment.min.js
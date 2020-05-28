# airbnb-data-visualization

### 启动方式
```
python main.py
```

static/data/detail下面是详细信息的csv，没有传到github上，包括calendar.csv,listings.csv,reviews.csv,geocodeResult.json

### 目录结构  
│&emsp;.gitignore  
│&emsp;main.py&emsp;#数据处理和页面地址  
│&emsp;README.md  
│  
└─static  
&emsp;│&emsp;index.html&emsp;#主页  
&emsp;│&emsp;owner.html&emsp;#房东可视化  
&emsp;│&emsp;tenant.html&emsp;#租客可视化  
&emsp;│&emsp;traffic.html&emsp;#交通可视化  
&emsp;│  
&emsp;├─data  
&emsp;│&emsp;│&emsp;csvname.json&emsp;&emsp;  #对应的中文意思  
&emsp;│&emsp;│&emsp;listings.csv  
&emsp;│&emsp;│&emsp;neighbourhoods.csv  
&emsp;│&emsp;│&emsp;neighbourhoods.geojson  
&emsp;│&emsp;│&emsp;owner_wordcount.json&emsp;#处理得到的房东词云  
&emsp;│&emsp;│&emsp;reviews.csv&emsp;&emsp;   #简短的评论信息  
&emsp;│&emsp;│&emsp;stopwords.txt&emsp;&emsp; #停词处理  
&emsp;│&emsp;│&emsp;subway.geojson&emsp;&emsp;#高德地图处理过的地铁geojson  
&emsp;│&emsp;│&emsp;subway.json&emsp;&emsp;   #高德地图下载的地铁信息  
&emsp;│&emsp;│&emsp;subwayTime.json&emsp;   #高德地图下载的地铁信息  
&emsp;│&emsp;│&emsp;tenant_wordcount.json&emsp;#处理得到的租客词云  
&emsp;│&emsp;│  
&emsp;│&emsp;├─detail  
&emsp;│&emsp;│&emsp;  calendar.csv&emsp;#详细日历信息 未上传  
&emsp;│&emsp;│&emsp;  listings.csv&emsp;#详细房源信息 未上传  
&emsp;│&emsp;│&emsp;  reviews.csv&emsp;#详细评价信息 未上传  
&emsp;│&emsp;│&emsp;  geocodeResult.json&emsp;main启动不需要 未上传
&emsp;│&emsp;│  
&emsp;│&emsp;└─pic  
&emsp;│  
&emsp;└─js  
&emsp;&emsp;│&emsp;d3.min.js  
&emsp;&emsp;│&emsp;dark.js  
&emsp;&emsp;│&emsp;echarts-wordcloud.min.js  
&emsp;&emsp;│&emsp;echarts.min.js  
&emsp;&emsp;│&emsp;homeOptionInit.js&emsp;#初始化主页echart option  
&emsp;&emsp;│&emsp;jquery.js  
&emsp;&emsp;│&emsp;owner.js&emsp;&emsp;&emsp; #初始化房东页echart option  
&emsp;&emsp;│&emsp;router.js&emsp;&emsp;&emsp;#跳转路由  
&emsp;&emsp;│&emsp;tenant.js&emsp;&emsp;&emsp;#初始化租客页echart option  
&emsp;&emsp;│  
&emsp;&emsp;└─library  
&emsp;&emsp;&emsp;&emsp;d3-force-attract.js  
&emsp;&emsp;&emsp;&emsp;d3-tip.js  
&emsp;&emsp;&emsp;&emsp;d3.tip.v0.6.3.js  
&emsp;&emsp;&emsp;&emsp;jquery-3.4.1.min.js  
&emsp;&emsp;&emsp;&emsp;moment.min.js  
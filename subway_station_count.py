from bs4 import BeautifulSoup 
from urllib import request
import re
import pandas as pd
import numpy as np
import urllib.parse as urp
from xml.etree import ElementTree
import time
import math
from math import radians, cos, sin, asin, sqrt

station = pd.read_csv('./static/data/stations.csv')
listing_simple = pd.read_csv('./static/data/listings.csv')

stations = station[station['城市名']=='北京']['地铁站名'].tolist()
home_lng_lat = listing_simple[['id','longitude','latitude']]
home_lng_lat['longitude'] = home_lng_lat['longitude'].astype("float64")
home_lng_lat['latitude'] = home_lng_lat['latitude'].astype("float64")

def haversine(lon1, lat1, lon2, lat2): # 经度1，纬度1，经度2，纬度2 （十进制度数）
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # 将十进制度数转化为弧度
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
 
    # haversine公式
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # 地球平均半径，单位为公里
    return c * r * 1000

city = '北京'
result =[]
for list in stations:
    name = list
    my_ak = 'bz0r4Ll43eF7Ruhb8Q4Xm7uHQmQ8GpBG'    # 需要自己填写自己的AK
    tag = urp.quote('地铁站')
    qurey = urp.quote(name)
    try:
        row = []
        url = 'http://api.map.baidu.com/place/v2/search?query='+qurey+'&tag='+'&region='+urp.quote(city)+'&output=json&ak='+my_ak
        req = request.urlopen(url)
        res = req.read().decode()
        lat = pd.to_numeric(re.findall('"lat":(.*)',res)[0].split(',')[0])
        lng = pd.to_numeric(re.findall('"lng":(.*)',res)[0])
        
        row.append(name)
        row.append(lng)
        row.append(lat)
        print(row) #经度和纬度
    except:
        row = [0,0,0]
    result.append(row)

station_lng_lat = pd.DataFrame(result, columns=['station', 'longitude', 'latitude']) 
# station_lng_lat.to_csv('./static/data/station_lng_lat.csv',index=False) 

listtmp = [0 for x in range(0, 329)]  
for indexi,rowi in station_lng_lat.iterrows():
    for index, row in home_lng_lat.iterrows():
        if(haversine(rowi['longitude'],rowi['latitude'],row['longitude'],row['latitude'])<=2000):
            listtmp[indexi]+=1
    # print(indexi,rowi['station'],listtmp[indexi])
station_lng_lat['count'] = 0
station_lng_lat['count'] = listtmp
station_lng_lat.to_csv('./static/data/subway_station_count.csv',index=False) 
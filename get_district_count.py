
import json
f = open("./static/data/detail/geocodeResult.json", encoding='utf-8')
geocodeResult = json.load(f)
geocodeResult
#%%
fisrt_addr = [
    '东城区',
    '西城区',
    '朝阳区',
    '丰台区',
    '石景山区',
    '海淀区',
    '顺义区',
    '通州区',
    '大兴区',
    '房山区',
    '门头沟区',
    '昌平区',
    '平谷区',
    '密云区',
    '怀柔区',
    '延庆区'
]
listgeo = geocodeResult['data']
num = len(listgeo)
busineses = []
addresses = []
t = []
for i in range(num):
    onelist = listgeo[i]
    if onelist == None:
        t.append(i)
        continue
    if onelist.get("business"):
        butmp = onelist['business'].split(',')
        butmp = [x for x in butmp if x != '']
        onelist['second'] = butmp
        busineses.extend(butmp)
    if onelist.get("addressComponent"):
        onelist['first'] = onelist['addressComponent']['district']
        if onelist['addressComponent']['street'] != '':
            addr = onelist['addressComponent']['district'] + onelist['addressComponent']['street']
            addresses.append(addr)
            onelist['third'] = addr
listgeo[0]
second_addr = list(set(busineses))
third_addr = list(set(addresses))
t
#%%
res = {}
res['first'] = {}
res['second'] = {}
res['third'] = {}
res['fisrt_addr'] = fisrt_addr
res['second_addr'] = second_addr
res['third_addr'] = third_addr

for i in fisrt_addr:
    res['first'][i] = 0

for i in second_addr:
    res['second'][i] = 0
for i in third_addr:
    res['third'][i] = 0

for i in range(num):
    onelist = listgeo[i]
    if onelist == None:
        t.append(i)
        continue
    if onelist.get("business"):
        butmp = onelist['business'].split(',')
        butmp = [x for x in butmp if x != '']
        for j in butmp:
            res['second'][j] = res['second'][j] + 1

    if onelist.get("addressComponent"):
        di = onelist['addressComponent']['district']
        if di in fisrt_addr:
            res['first'][di] = res['first'][di] + 1

        if onelist['addressComponent']['street'] != '':
            addr = di + onelist['addressComponent']['street']
            res['third'][addr] = res['third'][addr] + 1
#%%
res['second']

# %%
from urllib import request,parse
import hashlib
import re
import pandas as pd
city = '北京市'
result =[]
# my_ak = 'bz0r4Ll43eF7Ruhb8Q4Xm7uHQmQ8GpBG'
my_ak = 'CHMKtgBvVzGBKtM9ayW5f0zLOpZYrtVH'

for i in fisrt_addr:
    name = i
    query = city + i
    try:

        queryStr="/geocoding/v3/?address="+query+'&output=json&ak='+my_ak
        encodedStr=parse.quote(queryStr, safe="/:=&?#+!$,;'@()*[]")
        rawStr = encodedStr+my_ak
        sn=(hashlib.md5(parse.quote_plus(rawStr).encode("utf8")).hexdigest())

        #生成url      
        url=parse.quote("http://api.map.baidu.com"+queryStr+"&sn="+sn,safe="/:=&?#+!$,;'@()*[]")
        req = request.urlopen(url)
        res = req.read().decode()
        res=json.loads(res)
        # print(res)
        # print(res['result'])
        row = []
        lat=res["result"]["location"]["lat"]
        lng=res["result"]["location"]["lng"]
        row.append(i)
        row.append(lng)
        row.append(lat)
        result.append(row)
        print(row) #经度和纬度
    except:
        print('error', i)

result

first_location = pd.DataFrame(result, columns=['district', 'longitude', 'latitude']) 
# first_location.to_csv('./static/data/first_location.csv',index=False) 
first_location

# %%

city = '北京市'
result =[]
for i in second_addr:
    name = i
    query = city + i
    # print (query)
    try:

        queryStr="/geocoding/v3/?address="+query+'&output=json&ak='+my_ak
        encodedStr=parse.quote(queryStr, safe="/:=&?#+!$,;'@()*[]")
        rawStr = encodedStr+my_ak
        sn=(hashlib.md5(parse.quote_plus(rawStr).encode("utf8")).hexdigest())

        #生成url      
        url=parse.quote("http://api.map.baidu.com"+queryStr+"&sn="+sn,safe="/:=&?#+!$,;'@()*[]")
        req = request.urlopen(url)
        res = req.read().decode()
        res=json.loads(res)
        # print(res)
        # print(res['result'])
        row = []
        lat=res["result"]["location"]["lat"]
        lng=res["result"]["location"]["lng"]
        row.append(i)
        row.append(lng)
        row.append(lat)
        result.append(row)
        # print(row) #经度和纬度
        # break
    except:
        print('error', i)

result
second_location = pd.DataFrame(result, columns=['district', 'longitude', 'latitude']) 
# second_location.to_csv('./static/data/second_location.csv',index=False) 
second_location
#%%
len(third_addr)

# %%

city = '北京市'
result =[]
for i in third_addr:
    name = i
    query = city + i
    # print (query)
    try:

        queryStr="/geocoding/v3/?address="+query+'&output=json&ak='+my_ak
        encodedStr=parse.quote(queryStr, safe="/:=&?#+!$,;'@()*[]")
        rawStr = encodedStr+my_ak
        sn=(hashlib.md5(parse.quote_plus(rawStr).encode("utf8")).hexdigest())

        #生成url      
        url=parse.quote("http://api.map.baidu.com"+queryStr+"&sn="+sn,safe="/:=&?#+!$,;'@()*[]")
        req = request.urlopen(url)
        res = req.read().decode()
        res=json.loads(res)
        # print(res)
        # print(res['result'])
        row = []
        lat=res["result"]["location"]["lat"]
        lng=res["result"]["location"]["lng"]
        row.append(i)
        row.append(lng)
        row.append(lat)
        result.append(row)
        # print(row) #经度和纬度
        # break
    except:
        print('error', i)

result
third_location = pd.DataFrame(result, columns=['district', 'longitude', 'latitude']) 
# third_location.to_csv('./static/data/third_location.csv',index=False) 
third_location
#%%
df = pd.read_csv('./static/data/first_location.csv', encoding='gbk')
col_name=df.columns.tolist()
col_name.insert(4, 'num')
df = df.reindex(columns=col_name)
for index, row in df.iterrows():
    num = res['first'][row['district']]
    df.set_value(index, 'num', num)
df.to_csv('./static/data/first_location.csv',index=False , encoding='utf8') 

# %%
df = pd.read_csv('./static/data/second_location.csv', encoding='gbk')
col_name=df.columns.tolist()
col_name.insert(4, 'num')
df = df.reindex(columns=col_name)
for index, row in df.iterrows():
    num = res['second'][row['district']]
    df.set_value(index, 'num', num)
df.to_csv('./static/data/second_location.csv',index=False , encoding='utf8') 
df

# %%
df = pd.read_csv('./static/data/third_location.csv', encoding='gbk')
col_name=df.columns.tolist()
col_name.insert(4, 'num')
df = df.reindex(columns=col_name)
for index, row in df.iterrows():
    num = res['third'][row['district']]
    df.set_value(index, 'num', num)
df.to_csv('./static/data/third_location.csv',index=False , encoding='utf8') 

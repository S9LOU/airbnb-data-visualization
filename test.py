#%%
import pandas as pd
import json
from datetime import datetime
import numpy as np

#%%v
listing_simple = pd.read_csv('./static/data/listings.csv')
neighbourhood = pd.read_csv('./static/data/neighbourhoods.csv')
listing_all = pd.read_csv('./static/data/detail/listings.csv')
review_all = pd.read_csv('./static/data/detail/reviews.csv')
# calendar_all = pd.read_csv('./static/data/detail/calendar.csv')

#%%neighbourhood
all_neighbourhood = list(neighbourhood['neighbourhood'])
res = {}
# len(listing_simple[listing_simple['neighbourhood']=='石景山区'])
for n in all_neighbourhood:
    res[n] = len(listing_simple[listing_simple['neighbourhood']==n])
#%%
cols = list(listing_simple)
cols.insert(0,cols.pop(cols.index('longitude')))
cols.insert(1,cols.pop(cols.index('latitude')))
tmp =  listing_simple.loc[:,cols]
tmp = tmp.dropna(axis=0,how='all').fillna(0)
# tmp[tmp['neighbourhood'].str.contains('朝阳区')]
# tmp.head()
# %%
csvf = open("./static/data/csvname.json", encoding='utf-8')
cname = json.load(csvf)
cname['listing.csv']

#%%
bounds = "116.42047455756075,116.52819935431731,39.91219730262346,40.0".split(',')
# longs = bounds
bounds = [float(i) for i in bounds]

leftlong = bounds[0]
rightlong = bounds[1]
bottomlat = bounds[2]
toplat = bounds[3]
tmp = tmp[(tmp['longitude'] < rightlong) & (tmp['longitude'] > leftlong) & (tmp['latitude'] > bottomlat) & (tmp['latitude'] < toplat)]
len(tmp)
len(listing_simple)
#%%
listing_simple

# %%
list(listing_simple)
# %%
set(listing_simple['room_type'])
max(listing_simple['number_of_reviews'])

# len(listing_simple[listing_simple['price'] > 3000])

# %%
t0 = 0
for i in [100, 200, 300, 400, 500, 1000, 2000, 5000]:
    t = len(listing_simple[listing_simple['number_of_reviews'] < i])
    print(i, t -t0)
    t0 = len(listing_simple[listing_simple['number_of_reviews'] < i])

# %%
listing_id = '3649223'

listing_id = int(listing_id)
one = listing_all[listing_all['id'] == listing_id]
one = one.fillna(0)
res = one.to_dict(orient='records')[0]
max(listing_all['review_scores_accuracy'])

a = ["review_scores_rating",
"review_scores_accuracy",
"review_scores_cleanliness",
"review_scores_checkin",
"review_scores_communication",
"review_scores_location",
"review_scores_value"]
for i in a:
    print(max(listing_all[i]))

#%%

listing_id = '3649223'

listing_id = int(listing_id)
oneReviews = review_all[review_all['listing_id'] == listing_id]
oneReviews = oneReviews[oneReviews['date'] > '2019-12-01']
listReviews = oneReviews.values.tolist()
resdata = []
for i in range(len(listReviews)):
    resdata.append([listReviews[i][2], listReviews[i][4], listReviews[i][5]])
resdata
#%%
listing_all.head()

# %%
len(listing_all[listing_all['availability_365'] > 0])
listing_all['availability_60'].head()
# %%
len(calendar_all[calendar_all['available'] == 't'])

# %%
print(len(listing_all))
co = listing_all[listing_all['review_scores_rating']>99]
co['has_availability'] = co['has_availability'].map(dict(t=1, f=0)) 
co['cleaning_fee'] = co['cleaning_fee'].map(dict(t=1, f=0)) 
co['instant_bookable'] = co['instant_bookable'].map(dict(t=1, f=0)) 
co['weekly_price'] = pd.to_numeric(co['weekly_price'].str.replace(r'$', '').str.replace(r',', ''))
co['price'] = pd.to_numeric(co['price'].str.replace(r'$', '').str.replace(r',', ''))
co['monthly_price'] = pd.to_numeric(co['monthly_price'].str.replace(r'$', '').str.replace(r',', ''))

co = co.fillna(0)
cotype = [
 'host_listings_count',
 'host_total_listings_count',
 'accommodates',
 'bathrooms',
 'bedrooms',
 'beds',
 'square_feet',
 'price',
 'weekly_price',
 'monthly_price',
 'cleaning_fee',
 'guests_included',
 'minimum_nights',
 'maximum_nights',
 'minimum_minimum_nights',
 'maximum_minimum_nights',
 'minimum_maximum_nights',
 'maximum_maximum_nights',
 'minimum_nights_avg_ntm',
 'maximum_nights_avg_ntm',
 'has_availability',
 'availability_30',
 'availability_60',
 'availability_90',
 'availability_365',
 'number_of_reviews',
 'number_of_reviews_ltm',
 'review_scores_rating',
 'review_scores_accuracy',
 'review_scores_cleanliness',
 'review_scores_checkin',
 'review_scores_communication',
 'review_scores_location',
 'review_scores_value',
 'instant_bookable',
 'calculated_host_listings_count',
 'calculated_host_listings_count_entire_homes',
 'calculated_host_listings_count_private_rooms',
 'calculated_host_listings_count_shared_rooms',
 'reviews_per_month']
co = co[cotype]
realtion = co.corr().fillna(0)
realtion.values.tolist()
# %%
listing_all['calculated_host_listings_count']
# .str.replace(r'$', '').str.replace(r',', '')
co['review_scores_rating']
#%% 租客
import jieba
import re
from collections import Counter
co = listing_all[listing_all['review_scores_rating']>99]
tmp = ' '.join(co['summary'].dropna().values.tolist())
tmp = re.sub(r"[0-9\s\.\!\/_,$%^*()?;；:-【】+\"\']+|[｡+——！，;:。？、~@#￥%……&*（）]+", " ", tmp) 
data = jieba.cut(tmp,cut_all=True)
stop = open('./static/data/stopwords.txt', 'r+', encoding='utf-8')
stopword = stop.read().split("\n")
# for i in data:
#     if i == ' ':
#         continue;
#     if not(i.strip() in stopword) and (len(i.strip()) > 1) and not(i.strip() in wordlist) :
#         wordlist.append(i)
#     # break
wordcount = dict(Counter(data))

# %%
wordcountres = []
for i in wordcount:
    if not(i.strip() in stopword) and (len(i.strip()) > 1) :
        wordcountres.append({
            'name': i,
            'value': wordcount[i]
        })


# %%
wordcountres  
f = open("./static/data/csvname.json", encoding='utf-8')
csvname = json.load(f)
csvname

#%% 房东
import jieba
import re
from collections import Counter
co = listing_all[listing_all['reviews_per_month']>3]
tmp = ' '.join(co['summary'].dropna().values.tolist())
tmp = re.sub(r"[0-9\s\.\!\/_,$%^*()?;；:-【】+\"\']+|[｡+——！，;:。？、~@#￥%……&*（）]+", " ", tmp) 
data = jieba.cut(tmp,cut_all=True)
stop = open('./static/data/stopwords.txt', 'r+', encoding='utf-8')
stopword = stop.read().split("\n")
wordcount = dict(Counter(data))

wordcountres = []
for i in wordcount:
    if not(i.strip() in stopword) and (len(i.strip()) > 1) :
        wordcountres.append({
            'name': i,
            'value': wordcount[i]
        })

# %%
wordcountres
with open('./static/data/owner_wordcount.json','w') as fp:
    json.dump(wordcountres, fp)

# %%

tmp = listing_all.sample(500)
tmp = tmp.dropna(axis=0,how='all').dropna(axis=1,how='all')
tmp['has_availability'] = tmp['has_availability'].map(dict(t=1, f=0)) 
tmp['cleaning_fee'] = tmp['cleaning_fee'].map(dict(t=1, f=0)) 
tmp['instant_bookable'] = tmp['instant_bookable'].map(dict(t=1, f=0)) 
tmp['weekly_price'] = pd.to_numeric(tmp['weekly_price'].str.replace(r'$', '').str.replace(r',', ''))
tmp['price'] = pd.to_numeric(tmp['price'].str.replace(r'$', '').str.replace(r',', ''))
tmp['monthly_price'] = pd.to_numeric(tmp['monthly_price'].str.replace(r'$', '').str.replace(r',', ''))
tmp = tmp.fillna(0)

# co = tmp[cotype]
realtion = tmp.corr()
realtion = realtion.dropna(how='all').dropna(axis=1,how='all').fillna(0)
cotype = list(realtion)
cotype
#%%
f = open("./static/data/csvname.json", encoding='utf-8')
csvname = json.load(f)['listings.csv.gz']
title = [csvname[i] for i in cotype]
title
# listing_all[['minimum_nights_avg_ntm','minimum_minimum_nights','maximum_minimum_nights', 'minimum_maximum_nights','maximum_maximum_nights']].head()


#%%

f = open("./static/data/geocodeResult.json", encoding='utf-8')
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
    res['first'][i] = {
        "num": 0,
        "location": '',
    }

for i in second_addr:
    res['second'][i] = {
        "num": 0,
        "location": '',
    }
for i in third_addr:
    res['third'][i] = {
        "num": 0,
        "location": '',
    }

# %%

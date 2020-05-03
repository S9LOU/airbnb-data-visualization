#%%
import pandas as pd
import json
from datetime import datetime
import numpy as np

#%%v
listing_simple = pd.read_csv('./static/data/listings.csv')
neighbourhood = pd.read_csv('./static/data/neighbourhoods.csv')
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

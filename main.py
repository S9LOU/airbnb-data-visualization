#%%
import flask
from flask_cors import CORS
from flask import Flask,request
import pandas as pd
import json
from datetime import datetime
import numpy as np

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
CORS(app)

listing_simple = pd.read_csv('./static/data/listings.csv')
neighbourhood = pd.read_csv('./static/data/neighbourhoods.csv')
listing_all = pd.read_csv('./static/data/detail/listings.csv')
csvf = open("./static/data/csvname.json", encoding='utf-8')
cname = json.load(csvf)

@app.route("/geojson",methods=["GET"])
def read_data():
    f = open("./static/data/neighbourhoods.geojson", encoding='utf-8')
    res = json.load(f)
    return json.dumps(res, ensure_ascii=False)

@app.route("/neighbourhood_count",methods=["GET"])
def get_neighbourhood_count():
    all_neighbourhood = list(neighbourhood['neighbourhood'])
    res = {}
    for n in all_neighbourhood:
        res[n] = len(listing_simple[listing_simple['neighbourhood']==n])
    return json.dumps(res, ensure_ascii=False)

@app.route("/location_data",methods=["GET"])
def get_location_data():
    region = request.args.get('region')
    bounds = request.args.get('bounds')
    cols = list(listing_simple)
    cols.insert(0,cols.pop(cols.index('longitude')))
    cols.insert(1,cols.pop(cols.index('latitude')))
    res = {}
    tmp = listing_simple.loc[:,cols]
    tmp = tmp.dropna(axis=0,how='all').fillna(0)
    print(region)
    if region != None:
        tmp = tmp[tmp['neighbourhood'].str.contains(region)]
    if bounds != None:
        bounds = bounds.split(',')
        bounds = [float(i) for i in bounds]
        leftlong = bounds[0]
        rightlong = bounds[1]
        bottomlat = bounds[2]
        toplat = bounds[3]
        tmp = tmp[(tmp['longitude'] < rightlong) & (tmp['longitude'] > leftlong) & (tmp['latitude'] > bottomlat) & (tmp['latitude'] < toplat)]

    res['data'] = tmp.values.tolist()
    return json.dumps(res, ensure_ascii=False)


@app.route("/location_data_title",methods=["GET"])
def get_location_data_title():
    cols = list(listing_simple)
    cols.insert(0,cols.pop(cols.index('longitude')))
    cols.insert(1,cols.pop(cols.index('latitude')))
    res = {}
    res['title'] = cols
    res['titleCname'] = cname['listing.csv']
    return json.dumps(res, ensure_ascii=False)


@app.route("/data_correlation",methods=["GET"])
def get_data_correlation():
    # TODO: 添加相关性分析，返回的数据将相关性高的放在一块
    cols = list(listing_all)
    res = {}
    tmp = listing_all.sample(500)
    tmp = tmp.dropna(axis=0,how='all').fillna(0)

    res['data'] = tmp.values.tolist()
    res['title'] = cols
    return json.dumps(res, ensure_ascii=False)


@app.route('/')
def index():
    return flask.send_from_directory('static', 'index.html')


@app.route('/tenant')
def tenant():
    return flask.send_from_directory('static', 'tenant.html')

@app.route('/owner')
def owner():
    return flask.send_from_directory('static', 'owner.html')


@app.route('/traffic')
def traffic():
    return flask.send_from_directory('static', 'traffic.html')


app.run(host='127.0.0.1', port=8080, debug=True)





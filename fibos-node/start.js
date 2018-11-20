// 服务器 全节点

var fibos = require('fibos');
var fs = require("fs");
var conf = require("./_config");

fibos.config_dir = '/data';
fibos.data_dir = '/data'

var config = {
    "producer-name":conf["producer-name"],
    "public-key": conf["producer-pubKey"],
    "private-key": conf["producer-priKey"]
};

var chain = {
    'chain-state-db-size-mb': 8192,
};
if (!fs.exists(fibos.data_dir + "/blocks")) {
    chain["genesis-json"] = "/fibos/genesis.json";
}

fibos.load("http", {
    "http-server-address": "0.0.0.0:8888",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Content-Type",
    "http-validate-host": false,
    "verbose-http-errors": true,
});

fibos.load("net", {
    "max-clients": 0,
    "p2p-listen-endpoint": "0.0.0.0:9876",
    "p2p-peer-address": [

        "p2p-mainnet.fibos123.com:9977",
        "p2p.otclook.com:9870",
        "13.78.23.108:9870",
        "47.74.181.212:27672",
        "p2p.fometa.io:59877",
        "p2p-mainnet.fobp.pro:9873",
        "p2p.fibos.fi:59595",
        "ca-p2p.fibos.io:9870",
        "va-p2p.fibos.io:9870",
        "p2p-mainnet.fibosironman.io:9999",
        "fibosiseos.xyz:9870",
        "47.92.122.2:9870",
        "se-p2p.fibos.io:9870",
        "seed.fibos.rocks:10100",
        "p2p.fophoenix.com:9870",
        "seed-mainnet.fibscan.io:9103",
        "sl-p2p.fibos.io:9870",
        "p2p.xm.fo:10300",
        "p2p-mainnet.loveyy.xyz:9871",
        "p2p.mainnet.fibos.me:80",
        "p2p-mainnet.ilovefibos.com:9876",
        "seed.fiboso.com:9965",
        "40.115.179.182:9870",
        "to-p2p.fibos.io:9870",
        "p2p.fibos.team:9876",
        "superfibos.com:9870",
        "p2p.supercuteman.xyz:9898",
        "ln-p2p.fibos.io:9870",
        "fibos.qubitfund.com:9870"

    ],
});

fibos.load("producer");
/* 超级节点的话，使用下面这部分代码，注释掉上面一行代码*/
// fibos.load("producer", {
//     'producer-name': config["producer-name"],
//     'enable-stale-production': true,
//     'private-key': JSON.stringify([config["public-key"], config["private-key"]])
// });

fibos.load("chain", chain);
fibos.load("chain_api");

// fibos.load("mongo_db", {
//     "mongodb-uri": mongodb_uri
// });

fibos.start();

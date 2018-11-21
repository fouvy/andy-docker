// 自动领取BP奖励

const Fibos = require('fibos.js');
const config = require('./_config');

const httpEndPoint = config["http-end-point"];
const chainId = config["chain-id"];
const privateKey = config["producer-priKey"];
const producerName = config["producer-name"];
const permission = config["permission"];

var fibos = Fibos({
    httpEndpoint: httpEndPoint, chainId: chainId,
    keyProvider: privateKey
});


cacheRewards();
//try every 10 min
setInterval(cacheRewards, 10 * 60 * 1000 + 5000);
//////////////////////////
function cacheRewards() {
    Promise.all([getGlobal(), getProducer(producerName)]).then(([global, producer]) => {
        let bpay = (global.perblock_bucket * producer.unpaid_blocks) / global.total_unpaid_blocks / 10000;
        let vpay = (global.pervote_bucket * producer.total_votes) / (1 * global.total_producer_vote_weight) / 10000;
        if (vpay < 1000) {
            vpay = 0;
        }
        let next_claim_time = 1 * producer.last_claim_time / 1000 + 24 * 60 * 60 * 1000;
        if (next_claim_time > Date.now()) {
            return 0;
        }
        return bpay + vpay;
    }, errs => {
        console.error(errs);
        //retry
        // cacheRewards();
    }).then(rewards => {
        console.log(new Date(), "current rewards:", rewards);
        if (rewards > 0) {
            fibos.transaction({
                // ...headers,
                actions: [
                    {
                        account: 'eosio',
                        name: 'claimrewards',
                        authorization: [{
                            actor: producerName,
                            permission: permission
                        }],
                        data: {
                            owner: producerName
                        }
                    }
                ]
            }).then(res => {
                // console.log(res);
            }, err => {
                console.error(err);
                //retry
                // cacheRewards();
            });
        }
    });
}

function getGlobal() {
    return new Promise((resolve, reject) => {
        fibos.getTableRows({
            "scope": "eosio",
            "code": "eosio",
            "table": "global",
            "json": true
        }).then(res => {
            resolve(res.rows[0]);
        }, err => {
            console.error(err);
            reject(err);
        });
    });
}

function getProducer(name) {
    return new Promise((resolve, reject) => {
        fibos.getTableRows({
            "scope": "eosio",
            "code": "eosio",
            "table": "producers",
            "lower_bound": name,
            "limit": 1,
            "json": true
        }).then(res => {
            if (!res.rows[0] || name != res.rows[0].owner) {
                reject("producer not exist!");
            }
            resolve(res.rows[0]);
        }, err => {
            console.error(err);
            reject(err);
        });
    });
}


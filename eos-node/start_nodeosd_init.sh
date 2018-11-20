#!/bin/sh

sleep 10

exec /opt/eosio/bin/nodeos \
    --data-dir=/data \
    --genesis-json=/etc/nodeos/genesis.json \
    --config-dir=/etc/nodeos \
    --delete-all-blocks 
    # --mongodb-wipe \
    # --mongodb-uri mongodb://192.168.1.160:27017/EOS
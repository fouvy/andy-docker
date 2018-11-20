#!/bin/sh

sleep 10

exec /opt/eosio/bin/nodeos \
    --data-dir=/data \
    --config-dir=/etc/nodeos 
    # --mongodb-uri mongodb://192.168.1.160:27017/EOS

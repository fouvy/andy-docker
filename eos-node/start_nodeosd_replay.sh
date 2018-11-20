#!/bin/sh

sleep 10

exec /opt/eosio/bin/nodeos \
    --data-dir=/data \
    --config-dir=/etc/nodeos \
    --replay-blockchain \
    --hard-replay-blockchain 
    # --mongodb-wipe \
    # --mongodb-uri mongodb://192.168.1.160:27017/EOS


# EOS-Sync

快速搭建将EOS主网数据同步至mongodb数据库, 操作步骤:

开始同步数据:

```
docker-compose -f docker-compose-init.yaml up -d
```

## 停止/重启 同步

停止数据同步:

```
docker-compose down
```

重启数据同步:

```
docker-compose down
docker-compose up -d
```

Replay区块:

```
docker-compose -f docker-compose-replay.yaml down
docker-compose -f docker-compose-replay.yaml up -d
```

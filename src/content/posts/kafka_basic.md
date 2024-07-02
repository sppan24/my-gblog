---
title: "kafka基本使用"
description: 'kafka 基本使用命令记录'
pubDate: "2022-07-11 21:12:08"
category: "linux"
banner: "@images/banners/d1ac13019e4e89691d96b37c0bd1790f.png"
tags: ["linux"]
---

# kafka 基本使用

> 操作命令中 `--bootstrap-server server地址` 均可以换成 `--zookeeper zk地址`。

## 一、配置文件说明

服务配置文件位置为：./config/server.properties

- broker.id=0
- listeners=PLAINTEXT://10.160.73.190:9092
- num.network.threads=3
- num.io.threads=8
- socket.send.buffer.bytes=102400
- socket.receive.buffer.bytes=102400
- socket.request.max.bytes=104857600

- log.dirs=/data/dev/kafka_2.12-2.4.0/kafka-logs
- num.partitions=1
- num.recovery.threads.per.data.dir=1
- log.retention.hours=168
- log.segment.bytes=1073741824
- log.retention.check.interval.ms=300000
- log.cleaner.enable=true
- log.roll.hours=168
- log.cleanup.policy=delete

- auto.create.topics.enable=false
- delete.topic.enable=true
- inter.broker.protocol.version=2.4
- log.message.format.version=2.4

- zookeeper.connect=10.143.42.167:2181,10.143.54.169:2181,10.143.55.88:2181/kafka_biz_1/dev
- zookeeper.connection.timeout.ms=6000

## 二、基础操作

### 启动

```
nohup ./kafka-server-start.sh ../config/server.properties >> /dev/null 2>&1 &
# 或者
./kafka-server-start.sh -daemon ../config/server.properties
```

### 停止

```
./kafka-server-stop.sh
```

### 创建topic

```
 ./kafka-topics.sh --create --bootstrap-server 10.160.73.190:9092  --replication-factor 1 --partitions 1 --topic dev_test
```

### 列出topic

```
./kafka-topics.sh --list --bootstrap-server 10.160.73.190:9092
```

### 查看指定topic信息

```
./kafka-topics.sh --describe --bootstrap-server 10.160.73.190:9092 --topic dev_test
```

### 删除topic

```
./kafka-topics.sh --delete --bootstrap-server 10.160.73.190:9092 --topic dev_test
```

## 三、生产消费消息

### 生产消息

```
./kafka-console-producer.sh --broker-list 10.160.73.190:9092 --topic dev_test
```

### 消费消息

```
./kafka-console-consumer.sh --bootstrap-server 10.160.73.190:9092 --from-beginning --topic dev_test
```
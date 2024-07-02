---
title: "OpenSSL版本升级"
description: '记录源码编译升级OpenSSL版本的关键步骤'
pubDate: "2021-02-02 14:31:21"
category: "linux"
banner: "@images/banners/7185705215c9b1e62a21dbdb057b48a1.jpg"
tags: ["linux"]
---

openssl是开放源码的，需要自己去下载源码来进行编译安装。以`1.0.2k`版本为例。

## 一、下载源码

可以从官网下载到本地，然后上传到服务器，也可以去官网找到下载地址，然后使用命令直接下载到服务器。

最新版：<https://www.openssl.org/source/>

历史版本：<https://www.openssl.org/source/old/>

例如：

```sh
cd ~ && wget https://www.openssl.org/source/old/1.0.2/openssl-1.0.2k.tar.gz
```

## 二、编译源码并安装

1. 下载得到`tar.gz`的压缩包后，需要先进行解压。

```
tar -xzvf openssl-1.0.2k.tar.gz
```

2. 编译配置

切换工作目录到`openssl`源码的目录：

```sh
cd ~/openssl-1.0.2k
```

执行编译初始化配置，这个地方一定要注意，一定需要加上`enable-shared`， 不然编译完成以后，不会有`.so`文件。

```sh
./config enable-shared
```

参数说明：

- `--prefix`：表示指定安装目录，如果不指定，默认在`/usr/local/ssl`
- `-fPIC`：编译openssl的静态库
- `enable-shared`：编译动态库

3. 编译并安装

```sh
make && make install
```

## 三、替换原来低版本的openssl

1. 为了方便出错了进行恢复，需要先将历史版本的程序进行备份。

```sh
mv /usr/bin/openssl /usr/bin/openssl.bak
mv /usr/include/openssl /usr/include/openssl.bak
mv /usr/lib64/libssl.so /usr/lib64/libssl.so.bak
mv /usr/lib64/libcrypto.so /usr/lib64/libcrypto.so.bak
```

2. 建立软链到新安装的文件

```sh
ln -s /usr/local/ssl/bin/openssl /usr/bin/openssl
ln -s /usr/local/ssl/include/openssl /usr/include/openssl
ln -s /usr/local/ssl/lib/libssl.so.1.0.0 /usr/lib64/libssl.so
ln -s /usr/local/ssl/lib/libcrypto.so.1.0.0 /usr/lib64/libcrypto.so
```

3. 查看安装后的版本信息

```sh
openssl version -a
```
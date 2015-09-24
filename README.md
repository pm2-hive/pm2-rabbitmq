# pm2-rabbitmq
RabbitMQ module for Keymetrics

## Description

PM2 module to monitor key RabbitMQ server metrics:

* # of Connections / Queues / Channels / Consumers / Exchanges
* # of Total messages / Ready messages / Unacknowledged messages
* Publish Rate / Deliver Rate

## Requirements

This module requires a RabbitMQ install (tested against v3.5.4).  
You also need to enable the [RabbitMQ management plugin](https://www.rabbitmq.com/management.html)

## Install

```bash
$ npm install pm2 -g

$ pm2 install pm2-rabbitmq
```

## Config 

The default connection details are :  
"username": "guest"  
"pass": "guest"  
"hostname": "localhost:15672"  
"protocol": "http"  
  
guest/guest is a user created by default when installing RabbitMQ but you can change this to any other admin user  

To modify the config values you can use the commands: 
```bash
$ pm2 set pm2-rabbitmq:username  myuser
$ pm2 set pm2-rabbitmq:pass      mypass
$ pm2 set pm2-rabbitmq:hostname  a.b.c.d:port
$ pm2 set pm2-rabbitmq:protocol  https
```

## Uninstall

```bash
$ pm2 uninstall pm2-rabbitmq
```

# License

MIT

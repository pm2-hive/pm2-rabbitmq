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

## Uninstall

```bash
$ pm2 uninstall pm2-rabbitmq
```

# License

MIT

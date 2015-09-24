var pmx = require('pmx');
var dotty = require("dotty");
var AMQPStats = require('amqp-stats');
var metrics = {};
var REFRESH_RATE = 5000; // ms
var probe = pmx.probe();

// Init metrics with default values
function initMetrics() {
  metrics.rabbitmqVersion = probe.metric({
    name: 'RabbitMQ Version',
    value: 'N/A'
  });
  metrics.queues = probe.metric({
    name: 'Queues',
    value: 'N/A'
  });
  metrics.connections = probe.metric({
    name: 'Connections',
    value: 'N/A'
  });
  metrics.consumers = probe.metric({
    name: 'Consumers',
    value: 'N/A'
  });
  metrics.channels = probe.metric({
    name: 'Channels',
    value: 'N/A'
  });  
  metrics.totalMessages = probe.metric({
    name: 'Total Messages',
    value: 'N/A'
  });
  metrics.publishRate = probe.metric({
    name: 'Publish Rate/sec',
    value: 'N/A'
  });
  metrics.deliverRate = probe.metric({
    name: 'Deliver Rate/sec',
    value: 'N/A'
  });
  metrics.messagesReady = probe.metric({
    name: 'Ready Messages',
    value: 'N/A'
  });
  metrics.messagesUnacknowledged = probe.metric({
    name: 'Unacknowledged Messages',
    value: 'N/A'
  });
}

// Init amqp stats agent
function initAgent(conf) {
  return new AMQPStats({
    username: conf.username,
    password: conf.pass,
    hostname: conf.hostname,
    protocol: conf.protocol
  });
}

// Refresh metrics
function refreshMetrics(statsAgent) {
  statsAgent.overview(function (err, res, data) {
    if (err) {
      return pmx.notify(err);
    }

    // RabbitMQ version
    metrics.rabbitmqVersion.set(data.rabbitmq_version);

    // # of Queues
    var queues = dotty.get(data, 'object_totals.queues');
    if (queues === undefined) {
      queues = 'N/A';
    }
    metrics.queues.set(queues);

    // # of Connections
    var connections = dotty.get(data, 'object_totals.connections');
    if (connections === undefined) {
      connections = 'N/A';
    }
    metrics.connections.set(connections);

    // # of Consumers
    var consumers = dotty.get(data, 'object_totals.consumers');
    if (consumers === undefined) {
      consumers = 'N/A';
    }
    metrics.consumers.set(consumers);

    // # of Channels
    var channels = dotty.get(data, 'object_totals.channels');
    if (channels === undefined) {
      channels = 'N/A';
    }
    metrics.channels.set(channels);
    
    // # of Total Messages
    var totalMessages = dotty.get(data, 'queue_totals.messages');
    if (totalMessages === undefined) {
      totalMessages = 'N/A';
    }
    metrics.totalMessages.set(totalMessages);

    // Publish Rate
    var publishRate = dotty.get(data, 'message_stats.publish_details.rate');
    if (publishRate === undefined) {
      publishRate = 'N/A';
    }
    metrics.publishRate.set(publishRate);

    // Deliver Rate
    var deliverRate = dotty.get(data, 'message_stats.deliver_get_details.rate');
    if (deliverRate === undefined) {
      deliverRate = 'N/A';
    }
    metrics.deliverRate.set(deliverRate);
    
    // # of Ready Messages
    var messagesReady = dotty.get(data, 'queue_totals.messages_ready');
    if (messagesReady === undefined) {
      messagesReady = 'N/A';
    }
    metrics.messagesReady.set(messagesReady);

    // # of Unacknowledged Messages
    var messagesUnacknowledged = dotty.get(data, 'queue_totals.messages_unacknowledged');
    if (messagesUnacknowledged === undefined) {
      messagesUnacknowledged = 'N/A';
    }
    metrics.messagesUnacknowledged.set(messagesUnacknowledged);

  });
}

function init(conf) {
  var statsAgent;

  initMetrics();
  statsAgent = initAgent(conf);
  setInterval(refreshMetrics.bind(this, statsAgent), REFRESH_RATE);
}

module.exports.init = init;
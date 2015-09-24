var pmx = require('pmx');
var probe = pmx.probe();
var AMQPStats = require('amqp-stats');
var metrics = {};
var REFRESH_RATE = 5000 ; // ms

// Init metrics with default values
function initMetrics () {
  metrics.rabbitmqVersion = probe.metric({
    name: 'RabbitMQ Version',
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

    metrics.rabbitmqVersion.set(data.rabbitmq_version);
  });
}

function init(conf) {
  var statsAgent;

  initMetrics();
  statsAgent = initAgent(conf);
  setInterval(refreshMetrics.bind(this,statsAgent), REFRESH_RATE);
}

module.exports.init = init;
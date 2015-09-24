var pmx = require('pmx');
var rabbitmqStats = require('./lib/rabbitmq_stats.js');

pmx.initModule({

  pid: pmx.resolvePidPaths(['/var/run/rabbitmq/pid']),

  // Options related to the display style on Keymetrics
  widget: {

    // Logo displayed
    logo: 'https://upload.wikimedia.org/wikipedia/en/9/99/RabbitMQLogo.png',

    // Module colors
    // 0 = main element
    // 1 = secondary
    // 2 = main border
    // 3 = secondary border
    theme: ['#141A1F', '#222222', '#3ff', '#3ff'],

    // Section to show / hide
    el: {
      probes: true,
      actions: true
    },

    // Main block to show / hide
    block: {
      actions: false,
      issues: true,
      meta: true,

      // Custom metrics to put in BIG
      main_probes: ['RabbitMQ Version']
    }

  }

}, function (err, conf) {

  // Build RabbitMQ connection and init metrics refresh loop
  rabbitmqStats.init(conf);
});

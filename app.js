var pmx = require('pmx');
var rabbitmqStats = require('./lib/rabbitmq_stats.js');

pmx.initModule({

  pid: pmx.resolvePidPaths(['/var/run/rabbitmq/pid']),

  // Options related to the display style on Keymetrics
  widget: {

    // Logo displayed
    logo: 'https://cloud.google.com/solutions/rabbitmq/images/rabbitmq_logo.png',

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
      main_probes: ['Queues', 'Connections', 'Consumers', 'Total Messages', 'Publish Rate/sec', 'Deliver Rate/sec']
    }

  }

}, function (err, conf) {

  // Build RabbitMQ connection and init metrics refresh loop
  rabbitmqStats.init(conf);
});

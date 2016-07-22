var VALID_DEPLOY_TARGETS = [ //update these to match what you call your deployment targets
  'dev',
  'qa',
  'prod'
];

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    redis: {
      allowOverwrite: true,
      keyPrefix: 'reqourse-client:index'
    },
    s3: {
      prefix: 'reqourse-client'
    }
  };
  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'dev') {
    ENV.build.environment = 'development';
    ENV.redis.url = process.env.REDIS_URL || 'redis://0.0.0.0:6379/';
    ENV.plugins = ['build', 'redis']; // only care about deploying index.html into redis in dev
  }

  if (deployTarget === 'qa' || deployTarget === 'prod') {
    ENV.build.environment = 'production';
    ENV.s3.accessKeyId = "AKIAJ2NOQ4ICZQRCBHPA"; // process.env.AWS_KEY;
    ENV.s3.secretAccessKey = "kDGF+UxHUzdVTa5rDPEVz3xoyQ7mZKXemelCYMIp"; // process.env.AWS_SECRET;
    ENV.s3.bucket = "reqourse-assets"; /* YOUR S3 BUCKET NAME */
    ENV.s3.region = "us-west-1"; /* YOUR S3 REGION */
  }

  if (deployTarget === 'qa') {
    ENV.redis.url = "redis://h:p640e02u5m2311el6upvl9ll78s@ec2-50-16-205-207.compute-1.amazonaws.com:6399"; // process.env.QA_REDIS_URL;
  }

  if (deployTarget === 'prod') {
    ENV.redis.url = "redis://h:pf8bv4r55ks14l6tn999fbire6n@ec2-174-129-243-209.compute-1.amazonaws.com:30179"; // process.env.PROD_REDIS_URL;
  }

  return ENV;

  /* Note: a synchronous return is shown above, but ember-cli-deploy
   * does support returning a promise, in case you need to get any of
   * your configuration asynchronously. e.g.
   *
   *    var Promise = require('ember-cli/lib/ext/promise');
   *    return new Promise(function(resolve, reject){
   *      var exec = require('child_process').exec;
   *      var command = 'heroku config:get REDISTOGO_URL --app my-app-' + deployTarget;
   *      exec(command, function (error, stdout, stderr) {
   *        ENV.redis.url = stdout.replace(/\n/, '').replace(/\/\/redistogo:/, '//:');
   *        if (error) {
   *          reject(error);
   *        } else {
   *          resolve(ENV);
   *        }
   *      });
   *    });
   *
   */
}

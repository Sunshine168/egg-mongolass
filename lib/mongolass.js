'use strict';

const assert = require('assert');
const Mongolass = require('mongolass');

let count = 0;

module.exports = app => {
  app.addSingleton('mongolass', createMongolass);
  // console.log(app.config);
  // app.mongolass = createMongolass(app.config., app);

};

function createMongolass(config, app) {
  assert(
    config.url || (config.host && config.port && config.database),
    `[egg-mongolass] 'host: ${config.host}', 'port: ${
      config.port
    }', 'database: ${config.database}' are required on config`
  );
  const client = new Mongolass();
  let url = config.url;
  if (!url) {
    url = `mongodb://${config.host}:${config.port}/${config.database}`;
  }
  app.beforeStart(async () => {
    try {
      await client.connect(url);
      const index = count++;
      app.coreLogger.info(`[egg-mongolass] instance[${index}] status OK`);
    } catch (e) {
      app.coreLogger.error(`[egg-mongolass] error[${e}]`);
    }
  });
  return client;
}

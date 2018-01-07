'use strict';

const assert = require('assert');
const Mongolass = require('mongolass');
const path = require('path');

let count = 0;

module.exports = app => {
  app.addSingleton('mongolass', createMongolass);

  // load modal
  loadModel(app);
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

function loadModel(app) {
  const dir = path.join(app.config.baseDir, 'app/model');
  app.loader.loadToApp(dir, 'model', {
    inject: app,
    caseStyle: 'upper',
    filter(model) {
      return model.modelName;
    },
  });
}

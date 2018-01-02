'use strict';

const mongolass = require('./lib/mongolass');

module.exports = app => {
  if (app.config.mongolass.app) mongolass(app);
};

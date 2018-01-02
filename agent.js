'use strict';

const mongolass = require('./lib/mongolass');

module.exports = agent => {
  if (agent.config.mongolass.agent) mongolass(agent);
};

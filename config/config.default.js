'use strict';

/**
 * egg-mongolass default config
 * @member Config#mongolass
 * @property {String} SOME_KEY - some description
 */
exports.mongolass = {
  app: true,
  client: {
    host: '127.0.0.1',
    port: '27017',
    database: 'test',
    customPlugins: false,
  },
};

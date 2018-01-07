'use strict';

module.exports = app => {
  const { mongolass } = app;
  return mongolass
    .model('User', {
      account: { type: 'string' },
      name: { type: 'string' },
    })
    .index({ account: 1 }, { unique: true })
    .exec();
};

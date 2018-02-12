'use strict';

module.exports = app => {
  const { mongolass } = app;
  const TUser = mongolass.model('TUser', {
    name: { type: 'string' },
    age: { type: 'number' },
  });

  TUser.index({ _id: 1 }).exec();
  return TUser;
};

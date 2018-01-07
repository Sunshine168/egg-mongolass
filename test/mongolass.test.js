'use strict';

const mock = require('egg-mock');
const Mongolass = require('mongolass');

describe('test/mongolass.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mongolass-test',
    });
    return app.ready();
  });

  let UserModal,
    user1,
    user2;

  beforeEach(async () => {
    const { Schema } = Mongolass;
    const UserSchema = new Schema('UserSchema', {
      name: { type: 'string' },
      age: { type: 'number' },
    });
    UserModal = app.mongolass.model('User', UserSchema);
    try {
      user1 = await UserModal.insertOne({ name: 'nswbmw', age: 0 }).exec();
      // user2 = await UserModal.insertOne({ name: 'nswbmw1', age: 1 }).exec();
    } catch (e) {
      console.log(e);
    }
  });

  afterEach(async () => {
    // 清空测试数据
    await UserModal.remove();
  });

  after(() => {
    app.mongolass.disconnect(function() {
      app.close();
    });
  });
  afterEach(mock.restore);

  it('create user by user-modal', () => {
    // console.log(app.model);
    // return app.model.User.expect().to.not.be.undefined;
  });

  it('should GET /', () => {
    return app
      .httpRequest()
      .get('/')
      .expect('hi, mongolass')
      .expect(200);
  });
});

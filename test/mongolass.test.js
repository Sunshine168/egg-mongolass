'use strict';

const mock = require('egg-mock');
const Mongolass = require('mongolass');
const assert = require('assert');

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
    UserModal.index({ name: 1, _id: 1 }).exec();
    try {
      user1 = await UserModal.insertOne({ name: 'mai', age: 0 }).exec();
      user2 = await UserModal.insertOne({ name: 'mai1', age: 1 }).exec();
    } catch (e) {
      // console.log(e);
    }
  });

  it('enable the customPlugin should be work', async () => {
    const testUser = await UserModal.findOne({
      name: 'mai',
    }).addCreatedAt().exec();
    assert.ok(testUser.created_at);
    assert.ok(testUser.name);
  });

  afterEach(async () => {
    // 清空测试数据
    await UserModal.remove({ _id: user1.ops[0]._id }).exec();
    await UserModal.remove({ _id: user2.ops[0]._id }).exec();
  });

  after(() => {
    app.mongolass.disconnect(function() {
      app.close();
    });
  });
  afterEach(mock.restore);

  it('should GET /', () => {
    return app
      .httpRequest()
      .get('/')
      .expect('hi, mongolass')
      .expect(200);
  });
});

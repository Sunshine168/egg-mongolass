# egg-mongolass

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-mongolass.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-mongolass
[travis-image]: https://img.shields.io/travis/Sunshine168/egg-mongolass.svg?style=flat-square
[travis-url]: https://travis-ci.org/Sunshine168/egg-mongolass
[codecov-image]: https://img.shields.io/codecov/c/github/Sunshine168/egg-mongolass.svg?style=flat-square
[codecov-url]: https://codecov.io/github/Sunshine168/egg-mongolass?branch=master
[david-image]: https://img.shields.io/david/Sunshine168/egg-mongolass.svg?style=flat-square
[david-url]: https://david-dm.org/Sunshine168/egg-mongolass
[snyk-image]: https://snyk.io/test/npm/egg-mongolass/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-mongolass
[download-image]: https://img.shields.io/npm/dm/egg-mongolass.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-mongolass

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-mongolass 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件
<!--

如果有依赖其它插件，请在这里特别说明。如

- security
- multipart

-->

## API(!!!) 
参照[mongolass](https://github.com/mongolass/mongolass)
更多 [node-mongodb-native](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html)

请注意,不同连接mongodb的lib封装的api是不一样的,请参照文档。



## 开启插件

```js
// config/plugin.js
exports.mongolass = {
  enable: true,
  package: 'egg-mongolass',
};
```


## 详细配置

```js
// {app_root}/config/config.default.js
// use the config url (see https://docs.mongodb.com/manual/reference/connection-string/)
exports.mongolass = {
    client{
      url: 'mongodb://127.0.0.1/test',
    }
};
// or
exports.mongolass = {
    client: {
      host: 'localhost',
      port: '27017',
      database: 'blog',
    },
}

```

## Global plugin
project_root/lib/mongolass.js

```js
'use strict';
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

module.exports = {
  addCreatedAt: {
    afterFind(results) {
      results.forEach(function(item) {
        item.created_at = moment(objectIdToTimestamp(item._id)).format(
          'YYYY-MM-DD HH:mm'
        );
      });
      return results;
    },
    afterFindOne(result) {
      if (result) {
        result.created_at = moment(objectIdToTimestamp(result._id)).format(
          'YYYY-MM-DD HH:mm'
        );
      }
      return result;
    },
  },
};
// example in test suit
const testUser = await UserModal.findOne({
      name: 'mai',
    }).addCreatedAt().exec();
assert.ok(testUser.created_at);
```

## Example

```js
// app/model/user.js
module.exports = app =>{
    const { mongolass } = app;
     const User =  mongolass
    .model('User', {
      account: { type: 'string' },
      name: { type: 'string' },
    })
    User.index({ account: 1 }, { unique: true })
    .exec();
  return User

}
```

## 提问交流

请到 [egg issues](https://github.com/Sunshine168/egg-mongolass/issues) 异步交流。

## License

[MIT](LICENSE)

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

## Install

```bash
$ npm i egg-mongolass --save
```

## API(!!!) 
same as [mongolass](https://github.com/mongolass/mongolass)
more in [node-mongodb-native](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html)


## Usage

```js
// {app_root}/config/plugin.js
exports.mongolass = {
  enable: true,
  package: "egg-mongolass"
};
```

## Configuration

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
see [config/config.default.js](config/config.default.js) for more detail.

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
## Questions & Suggestions

Please open an issue [here](https://github.com/Sunshine168/egg-mongolass/issues).

## License

[MIT](LICENSE)

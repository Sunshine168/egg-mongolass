# egg-mongolass

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-mongolass.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-mongolass
[travis-image]: https://img.shields.io/travis/eggjs/egg-mongolass.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-mongolass
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-mongolass.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-mongolass?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-mongolass.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-mongolass
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

## Usage

```js
// {app_root}/config/plugin.js
exports.mongolass = {
  enable: true,
  package: 'egg-mongolass',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.mongolass = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592213709118_461';

  // add your middleware config here
  config.middleware = [];

  config.ajv = {
    keyword: 'schema',  // to indicate the namespace and path of schemas, default as 'schema'
    allErrors: true,    // required for custom error message
    jsonPointers: true,  // required for custom error message
  };
  config.sequelize = {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'demo',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

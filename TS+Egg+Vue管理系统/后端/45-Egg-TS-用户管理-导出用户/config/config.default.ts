import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1595824007157_9704';
  config.serverTimeout = 10000;
  // 跨域相关配置
  config.cors = {
    origin: 'http://127.0.0.1:8080', // 允许哪个地址跨域请求
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 允许哪些方法跨域请求
    credentials: true // 允许前端携带cookie
  };

  // add your egg config in here
  config.middleware = ['auth'];
  config.auth = {
    authUrls: [
        '/users'
    ]
  };

  // 文件上传相关配置
  config.multipart = {
    mode: 'file',
    fileSize: '10mb',
    fileExtensions:['.xls']
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // 添加sequelize配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    port: 3306,
    database: 'it666',
    // 注意点: 如果需要使用时间戳, 那么就必须指定当前的时区, 否则会相差8个小时
    timezone: '+08:00'
  };
  // Redis相关配置
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    }
  };
  // 邮箱相关配置
  config.smtp = {
    host: "smtp.qq.com",
    port: 465,
    user: '97606813@qq.com', // 发送邮件的邮箱
    pass: `osiqtqjcuexzbidj`, // 邮箱对应的授权码
  };
  // 短信相关配置
  // 短信相关配置
  config.sms = {
    accessKeyId : 'LTAI4GHcxJrqW3gi2rUxhurB',
    secretAccessKey : 'Eq2EEg8NT9OWBVXraJdHrwvpP5sCjQ'
  };
  // 禁用CSRF安全校验
  config.security = {
    csrf: {
      enable: false
    },
  };
  // Github登录相关配置
  config.passportGithub = {
    key: '018447869437696516f2',
    secret: 'a99f1bb59b7f6e260bb387fc1c0db6e57dc2353b',
  };
  return config;
};

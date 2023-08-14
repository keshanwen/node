import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/imagecode', controller.util.imageCode);
  router.get('/emailcode', controller.util.emailCode);
  router.get('/smscode', controller.util.smsCode);

  router.post('/register', controller.user.create);
  router.post('/login', controller.user.index);
  router.get('/islogin', controller.user.isLogin);

  router.get('/users', controller.users.index);
};

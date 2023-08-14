import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/imagecode', controller.util.imageCode);
  router.get('/emailcode', controller.util.emailCode);
  router.get('/smscode', controller.util.smsCode);

  router.post('/register', controller.user.create);
  router.post('/login', controller.user.index);

  const github = (app as any).passport.authenticate('github', {
    successRedirect: 'http://127.0.0.1:8080/admin'
  });
  router.get('/passport/github', github);
  router.get('/passport/github/callback', github);

  router.get('/users', controller.users.index);
};

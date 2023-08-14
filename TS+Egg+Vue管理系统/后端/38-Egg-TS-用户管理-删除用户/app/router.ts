import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  require('./router/code')(app);
  require('./router/account')(app);

  router.get('/api/v1/users', controller.users.index);
  router.post('/api/v1/users', controller.users.create);
  router.delete('/api/v1/users/:id', controller.users.destroy);
};

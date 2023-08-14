import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  require('./router/code')(app);
  require('./router/account')(app);
  require('./router/users')(app);

  // router.get('/api/v1/roles', controller.roles.index);
  // router.post('/api/v1/roles', controller.roles.create);
  // router.delete('/api/v1/roles/:id', controller.roles.destroy);
  // router.put('/api/v1/roles/:id', controller.roles.update);
  router.resources('roles', '/api/v1/roles/', controller.roles)
};

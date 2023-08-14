import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  require('./router/code')(app);
  require('./router/account')(app);
  require('./router/users')(app);

  router.resources('roles', '/api/v1/roles/', controller.roles);

  app.router.post('/api/v1/userrole', app.controller.userRole.create);
};

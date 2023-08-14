import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  require('./router/code')(app);
  require('./router/account')(app);
  require('./router/users')(app);
  require('./router/userRole')(app);
  require('./router/roleRights')(app);

  router.resources('roles', '/api/v1/roles/', controller.roles);
  router.resources('rights', '/api/v1/rights/', controller.rights);
};

module.exports = app => {
  const { router, controller } = app

  router.get('/', controller.home.index)
  router.get('/user', controller.home.getQuery);
  router.get('/register/:name/:age', controller.home.getParams);
  router.post('/login', controller.home.getBody);
  router.get('/home', controller.home.getHome)
  router.get('/news', controller.home.getNews);
}
module.exports = (app)=>{
    app.router.post('/register', app.controller.user.create);
    app.router.post('/login', app.controller.user.index);

    const github = (app as any).passport.authenticate('github', {
        successRedirect: 'http://127.0.0.1:8080/admin'
    });
    app.router.get('/passport/github', github);
    app.router.get('/passport/github/callback', github);
}

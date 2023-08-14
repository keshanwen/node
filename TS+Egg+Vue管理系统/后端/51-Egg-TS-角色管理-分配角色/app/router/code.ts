module.exports = (app)=>{
    app.router.get('/imagecode', app.controller.util.imageCode);
    app.router.get('/emailcode', app.controller.util.emailCode);
    app.router.get('/smscode', app.controller.util.smsCode);
}

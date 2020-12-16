const proxy = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        proxy('/users', {
            target: 'http://localhost:3002'
        })
    )
    app.use(
        proxy('/movies', {
            target: 'http://localhost:3002'
        })
    )
}
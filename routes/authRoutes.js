const passport = require('passport');


module.exports = app => { //call with express app object
    //route handler with express, GoogleStrategy has internal identifier of 'google
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] //give acess of profile and email of user
    }));

    //express app using passport to handle user information with callback from google
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => { //after authentication go to /surveys
            res.redirect('/surverys');
        });

    app.get('/api/logout', (req, res) => {
        req.logout(); //takes cookie and kills id/cookie and no longer knows user
        res.redirect('/');
    });

    //function called whenever get request for  '/api/current_user' route 
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
        //res.send(req.session) //mongo user id
        //cookiesession is processing req populating req.session prop
        //passport is accessing data in req.session
    })
};
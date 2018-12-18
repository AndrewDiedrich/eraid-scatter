const express = require('express'); //will use common js modules
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User'); //must require model before passport calls user model
//order of packages matter********
require('/models/Survey');
require('./services/passport'); //just want to run it dont have to assign it 
//const authRoutes = require('./routes/authRoutes');



//connect to mongodb
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });


//create express app, calling as function creates single express app
//most projects will probably only have one express app in them.
//all route handlers will be registered with app 
const app = express();

//parse req.body incoming object so we have access to it 
app.use(bodyParser.json());
/**
 * CookieSession
 * passport looks at req.session data, mongo user id.
 */
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey] //encrypt the cookie, so people cant change user id and fake being someone else
    })
);

app.use(passport.initialize());
app.use(passport.session());

//route handler
// app.get('/', (req, res) => {
//     res.send({ hi: 'buddy' });
// });
//
//immediately invokes authroutes function with express app;
require('./routes/authRoutes')(app);

require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    //like main.js file, or main.css file
    app.use(express.static('client/build'));
    //express will serve index.html file
    //if doesn't recognize route
    //catch all case and just send to index.html file
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//production use process.env.port linked to heroku env variable, 
//development use 5000, 
const PORT = process.env.PORT || 5000;
app.listen(PORT);
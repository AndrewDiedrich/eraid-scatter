const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        //console.log(req.body);
        //requireLogin is ran before async func, takes request throws int
        //requirelogin middleware to see if we should prceed with request

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        //user model when logged in
        //persist(save to data base)
        req.user.credits += 5;
        //save is async request, save to db the most uptodate model of user with credits
        const user = await req.user.save();
        //send data back to browser;
        res.send(user);
        //console.log(charge);
    })
};
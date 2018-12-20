const _ = require('lodash');
const Path = require('path-parser').default;
//url from nodejs, url libaries has helpers for parsing
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

//route handlers
module.exports = app => {
    //fetch out surveys of id's that match _user is mongo
    //gets all recipients list, may be 10's of thousands
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });
        
        res.send(surveys);
    });


    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thank you for Voting!');
    });

    //for local webhook from sendgrid
    app.post('/api/surveys/webhooks', (req, res) => {
        //console.log(req.body);

         //:surveyId and choice variables in object from pathname to be ran through p Path
        const p = new Path('/api/surveys/:surveyId/:choice');

        //lodash chain the itterations
        _.chain(req.body)
            .map(({email, url}) => {
                //pathname takes off api/ and after
                //const pathname = new URL(url).pathname;

                //if both vars cant be taken out of path then undefined
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice}
                }
            })
            //console.log(events);
            //remove undefined elements in array
            .compact() //only return event objects, none with undefined
            //remove any non unique records, remove duplicates
            .uniqBy( 'email', 'surveyId')

    /***Mongo query to iterate of each elemnent in events array */
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    //logic to update answer, inc is mongo operator
                    $inc: { [choice]: 1 },
                    //set/update, look in sub docuemt collection of recipeients in one we care about
                    //$ is found recipeients from  qeuery and update responded
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            //ends and gets values
            .value();
        
        res.send({});
    });
        // const events = _.map(req.body, ({email, url}) => {
        //     //pathname takes off api/ and after
        //     //const pathname = new URL(url).pathname;

        //     //if both vars cant be taken out of path then undefined
        //     const match = p.test(new URL(url).pathname);
        //     if (match) {
        //         return { email, surveyId: match.surveyId, choice: match.choice}
        //     }
        // })

        // //console.log(events);
        // //remove undefined elements in array
        // const compactEvents = _.compact(events); //only return event objects, none with undefined
        // //remove any non unique records, remove duplicates
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        // console.log(uniqueEvents);

        //send response so sendgrid doesnt think there's any failures and reping clicks
    //     res.send({});
    // });


    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        
        //create new instance of survery
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), //trim out whitespace
            _user: req.user.id,
            dateSent: Date.now()
        });   

        //send email! 
        const mailer = new Mailer(survey, surveyTemplate(survey));
        
        //try this 
        try {
            await mailer.send();
            await survey.save();
            //request the user credits and subtract 1
            req.user.credits -= 1;

            const user = await req.user.save();
            console.log(user);
            //response with updated user model in auth reducer and get update credits
            res.send(user);
        } catch (error) {
            res.status(422).send(error); //unprocessable entity
        }
    });
};
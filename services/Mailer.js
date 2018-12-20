const sendgrid = require('sendgrid');
const helper = sendgrid.mail; //could just destructure to mail
const keys = require('../config/keys');

//helper.Mail prop is an object, takes configuration and spits out mailer
//Mailer sub class of helper.Mail class
class Mailer extends helper.Mail { //content is from html string
    constructor({ subject, recipients}, content) {
        super(); //extend mail class, so any constructor executed on mail class gets executed
//instance from Mailer, so this. 
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@eraid.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);
        //addContent is helper.Mail method(helper function)
        this.addContent(this.body);
        //tracking new links in survey from sendgrid, clicks
        this.addClickTracking();
//
        this.addRecipients();
    }

//take recipients in from our sub docuement collection
//for every one we pull off email and format with helper into array.
    formatAddresses (recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient); //add to personalize object
        });
        this.addPersonalization(personalize);//addpersonalization is from mail base class
    }

    //send mailer off to sendgrid to go out to recipients
    //asynchronous code
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

//want in route handler for survey creation
module.exports = Mailer;
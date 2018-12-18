const mongoose = require('mongoose');
//mongoose object has prop called schema, assign to new var Schema
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surverySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], //array of strings
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
});

//name of model class/collection
mongoose.model('surveys', surverySchema);

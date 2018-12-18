const mongoose = require('mongoose');
//mongoose object has prop called schema, assign to new var Schema
const { Schema } = mongoose;


const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false}
});

//name of model class/collection
module.exports = recipientSchema;

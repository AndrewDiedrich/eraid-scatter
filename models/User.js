const mongoose = require('mongoose');
//mongoose object has prop called schema, assign to new var Schema
const { Schema } = mongoose;

//create collection schema
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

//create new users collection with schema
mongoose.model('users', userSchema);
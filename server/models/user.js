const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

const userSchema = new Schema ({
    email: {type: String},
    password: {type: String}
});

userSchema.pre('save', function(next) {
    console.log("masuk hash ===")
    if(this.password) { 
        this.password = hashPassword(this.password)
    }
    console.log("masuk after hash ===", this.password)
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
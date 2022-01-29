const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema ({
    email:{
        type:String,
        require: [true , "Email cannot be Empty"],
        unique: true
    }
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',UserSchema);
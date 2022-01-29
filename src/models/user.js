const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema ({
    email:{
        type:String,
        require: [true , "Email cannot be Empty"],
        unique: true
    },
    name:{
        type: String,
        required: [true, 'Name cannot be Empty']
    },
    username: {
        type: String,
        required: [true, 'Username cannot be Empty'],
        unique: true
    }
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',UserSchema);
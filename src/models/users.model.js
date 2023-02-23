const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        mobile : {
            type : Number,
            required : true
        },
        role : {
            type : String,
            enum : ['user', 'admin'],
            default : 'user'
        },
        email : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true,
        },
        // tokens : [{
        //     token : {
        //         type : String,
        //         required : true,
        //     }
        // }],
    },
    {
        timestamps : true,
    }
);

const Users = new mongoose.model('User', userSchema);
module.exports = Users;
const mongoose = require('mongoose');

const mailSchema = mongoose.Schema(
    {
        from : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        to : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        subject: {
            type : String,
        },
        message: {
            type : String
        },
        attachments: {
            type : Array,
        },
        status : {
            type : String,
            // default : "unread"
            enum : ["unread", "read"],
        },
        counter : {
            type : Number,
            default : 0
        },
        isDeleted : {
            type : Boolean,
            default : false
        }
    },
    {
        timestamps: true,
    }
);

const Mails = new mongoose.model('Mail', mailSchema);
module.exports = Mails;
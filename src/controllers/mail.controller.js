const { Users } = require('../models');
const { Mails } = require('../models');
const httpStatus = require('http-status');

const checkToUserEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const validEmail = await Users.findOne({ email: email });
        if (validEmail) {
            return res.status(httpStatus.OK).json({ message: "Email Found" });
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "The Email Entered In To Field Is Not Registered" });
        }
    } catch (err) {
        return res.status(httpStatus.NOT_FOUND).json({ "Error": err });
    }
};

const sendMail = async (req, res) => {
    try {
        let { from, to, subject, message, attachments } = req.body;
        const validEmail = await Users.findOne({ email: to });
        if (validEmail) {
            to = validEmail._id;
            attachments = [];

            if (req.files && req.files.length > 0) {
                // console.log(req.files);
                req.files.forEach((file) => {
                    // console.log(file);
                    // attachments.push({
                    //     url: file.filename,
                    //     type: file.mimetype,
                    // });
                    attachments.push(file.filename)
                });
            }

            attachments = attachments;
            const data = { from, to, subject, message, attachments }
            const mail = new Mails(data);
            const sendMails = await mail.save();
            return res.status(httpStatus.OK).json({ message: "Mail has been sent successfully" });
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "The Email Entered In To Field Is Not Registered" });
        }
    } catch (err) {
        return res.status(httpStatus.NOT_FOUND).json({ "Error": err });
    }
};

const getMail = async (req, res) => {
    try {
        const mailData = await Mails.find().populate({
            path: 'from',
            select: ["name", "email"],
        }).populate({
            path: 'to',
            select: ["name", "email"],
        });
        return res.status(httpStatus.OK).json({ "MailData ": mailData });
    }
    catch (err) {
        return res.status(httpStatus.NOT_FOUND).json({ "Error": err });
    }
};

module.exports = {
    sendMail,
    getMail,
    checkToUserEmail
}
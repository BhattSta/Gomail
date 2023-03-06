const { Mails } = require('../models')

const sendMail = async (req, res) => {
    try {
        const mail = new Mails(req.body);
        // console.log(req.files);
        const attachments = [];

        if (req.files && req.files.length > 0) {
            req.files.forEach((file) => {
                // console.log(file);
                // attachments.push({
                //     url: file.filename,
                //     type: file.mimetype,
                // });
                attachments.push(file.filename)
            });
        }

        mail.attachments = attachments;

        const sendMails = await mail.save();
        res.status(200).send(sendMails);
    } catch (err) {
        res.status(402).send(err);
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
        res.status(201).send(mailData);
    }
    catch (err) {
        res.status(402).send(err);
    }
}

module.exports = {
    sendMail,
    getMail
}
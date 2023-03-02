const { Mails } = require('../models')

// const sendMail = async(req, res) => {
//     try{
//         const mail = new Mails(req.body);
//         const attachments = [];
//     console.log(req.body);
//     }catch(err){

//     }
// }

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


module.exports = {
    sendMail,
}
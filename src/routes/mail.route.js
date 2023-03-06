const express = require('express');
const router = express.Router();
const { mailValidation } = require('../validations');
const { mailController } = require('../controllers');

const multer = require('multer');
const path = require('path');

var imagePath = path.join(__dirname, '../public/');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagePath)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/sendMail', upload.array('attachments', 10), mailValidation.sendingMailValidation, function (err, req, res, next) {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).send('File size should be less than 5 MB');
    } else {
        next();
    }
}, mailController.sendMail);
router.get('/getMail', mailController.getMail);
module.exports = router;
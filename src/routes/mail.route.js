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
    limits: { fileSize: 25 * 1024 * 1024 } 
});


router.post('/sendMail', upload.array('attachments',10), mailValidation.sendingMailValidation, mailController.sendMail);
// router.post('/sendMail',mailValidation.sendingMailValidation, mailController.sendMail);

module.exports = router;
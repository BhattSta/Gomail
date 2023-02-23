const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUsers = async (req, res) => {
    try {
        const email = req.body.email;
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(409).send({ message: "Email Already Exists" });
        } else {
            const password = req.body.password;
            // const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
            const data = delete req.body.confirmpassword;
            const user = new Users(req.body);
            const createUser = await user.save();
            res.status(201).send(createUser);
        }
    } catch (e) {
        res.status(404).send(e);
    }
}

const getUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ message: "Invalid Email" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(404).send({ message: "Invalid Password" });
        }

        const token = jwt.sign({
            userId: user._id,
            userEmail: user.email,
        }, process.env.SECRET_KEY);
        res.status(201).json({
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            Token: token
        });
    } catch (e) {
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports = {
    createUsers,
    getUser,
}
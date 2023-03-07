const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const register = async (req, res) => {
    try {
        let { name, mobile, role, email, password } = req.body;
        const existingUser = await Users.findOne({ email: email });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            password = hashedPassword;
            const data = { name, mobile, role, email, password }
            const user = new Users(data);
            const createUser = await user.save();
            return res
                .status(httpStatus.CREATED)
                .json({
                    message: "User Registration Process Done Successfully "
                });
        } else {
            return res
                .status(httpStatus.CONFLICT)
                .json({
                    message: "Email Already Exists"
                });
        }
    } catch (e) {
        return res.status(httpStatus.NOT_FOUND);
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({
                    message: "The email you're trying is not Registered"
                });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({
                    message: "Invalid Password"
                });
        }

        const token = jwt.sign({
            userId: user._id,
            userEmail: user.email,
        }, process.env.SECRET_KEY);

        return res
            .status(httpStatus.OK)
            .json({
                userId: user._id,
                userName: user.name,
                userEmail: user.email,
                token: token
            });
    } catch (e) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({
                message: "Internal server error"
            });
    }
};

module.exports = {
    register,
    login,
}
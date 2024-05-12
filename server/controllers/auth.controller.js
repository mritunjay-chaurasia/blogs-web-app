
const UserModel = require('../models/auth.model')
const bcrypt = require('bcrypt');
const { createToken } = require('./jwt.controller');

const hashAndSaltPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const generateUserToken = (userId) => {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);
    // expiry.setSeconds(expiry.getSeconds()+10);
    return createToken(userId, expiry.getTime() / 1000)
};

module.exports.findExistUser = async (req, res) => {
    // Extract data from request
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).send("Bad Request")
        }
        const userExists = await UserModel.exists({ email });
        if (userExists) {
            return res.status(409).json({ message: "Email is already in use." });
        } else {
            return res.status(200).json({ message: "User not found." });
        }
    }
    catch (error) {
        console.error("Error finding existing user", error);
        return res.status(500).send("Internal Server Error")
    }
}

module.exports.register = async (req, res) => {
    // Extract data from request
    const { fName, lName, email, password, phoneNo, gender } = req.body
    if (!fName || !lName || !email || !password || !phoneNo || !gender) {
        return res.status(400).json({ message: "All fields are required!" })
    }

    const user = await UserModel.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "User already exists." });
    }

    if (password.length <= 6) {
        return res.status(400).json({ message: "Password must not be shorter than 6" })
    }

    const hashPassword = hashAndSaltPassword(password)
    const userToken = generateUserToken(user.id)
    const userDocument = new UserModel({
        firstName: fName,
        lastName: lName,
        email,
        password: hashPassword,
        phoneNumber: phoneNo,
        gender
    });

    try {
        const userSaved = await userDocument.save()
        console.log("userSaved>>>>>>>>>>>>>", userSaved)
        return res.status(201).send({ success: true, userSaved: userSaved, message: "Registered Successfully!", token: userToken })
    }
    catch (err) {
        console.error("Error saving user", err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports.login = async (req, res) => {
    // Extract data from request
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).send({ success: false, message: "Bad request" })
        }
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(404).send({ success: false, message: "User not found." })
        }
        const isMatchPassword = bcrypt.compareSync(password, user.password);
        const userToken = generateUserToken(user.id)
        console.log('User Token:>>>', userToken);
        if (isMatchPassword) {
            return res.status(200).send({ success: true, message: "Logged in Successfully", token: userToken })
        } else {
            return res.status(404).send({ success: false, message: "Wrong Password" })
        }

    }
    catch (error) {
        console.error("Error during login", error);
        return res.status(500).send({ success: false, message: "Internal server error." })
    }

}

module.exports.requestResetPassword = async (req, res) => {

}

module.exports.updatePassword = async (req, res) => {

}

module.exports.deleteUser = async (req, res) => {

}
const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
require("dotenv").config();

const registerUser = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        // console.log("->",req.body);
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);
        // Store hash in your password DB.
        console.log(hashPassword);
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(406).json(
                {
                    success: false,
                    message: "Entry already exist, please login"
                }
            )
        }
        const response = await User.create({
            firstName, lastName, email, password: hashPassword
        })
        res.status(200).json(
            {
                success: true,
                data: response,
                message: "User Registerd Successfully"
            }
        )
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "unable to register transaction",
            message: err.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body.amount);
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(406).json(
                {
                    success: false,
                    message: "Please register first"
                }
            )
        }
        // console.log(userExist.password);
        if(!bcrypt.compareSync(password, userExist.password)){
            return res.status(401).json(
                {
                    success: false,
                    message: "wrong password"
                }
            )
        }
        var token = jwt.sign({ 
            username: email,
            _id: userExist._id
         }, process.env.SECRET_JWT);

        res.status(200).json(
            {
                success: true,
                token,
                message: "Logged in Successfully, user verified !!"
            }
        )
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "unable to post transaction",
            message: err.message
        })
    }
}

module.exports = { registerUser, loginUser }
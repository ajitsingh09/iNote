const express = require("express")
const route = express.Router()
const User = require("../modules/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secretkey = "thisisajit'skey"
const fetchuser = require("../middleware/fetchuser")

//ROUTE 1: creating a user using:Post /api/auth/createuser :NO login required 
route.post("/createuser",

    //Schema data conditions..user should input acc. to this
    body('Name', "Entered Name should have atleast 3 character").isLength({ min: 3 }),
    body('email', "Entered email address is invalid. Please check!!").isEmail(),
    body('password', "Password Should have atleast 8 character").isLength({ min: 8 }),

    async (req, res) => {
        //validates and see if there is an error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //if the error is not empty it return status 400 and a json carring the error
            return res.status(400).json({ errors: errors.array() });
        }

        //check whether a user with the same email address exist or not
        //User.findOne return a promise and therefor we have to use await to resolve it
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "User with this email address Already Exists....." })
            }

            //Securing the password -BYCRYPT JS
            let salt = await bcrypt.genSaltSync(10);
            let secPass = await bcrypt.hashSync(req.body.password, salt);

            user = await User.create({
                Name: req.body.Name,
                email: req.body.email,
                password: secPass,
            })
            data = {
                // user:{
                user: user.id
                // }
            }

            //USING JWT TOKEN AUTHENTICATION
            let authtoken = jwt.sign(data, jwt_secretkey)//don't know how it works


            //res.json(user)
            res.json({ authtoken })
        } catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }

    })


// ROUTE 2: login a user using:Post /api/auth/loginuser :NO login required 
route.post("/loginuser",

    //Schema data conditions..user should input acc. to this
    body('email', "Entered email address is invalid. Please check!!").isEmail(),
    body('password', "Password cannot be blank").exists(),

    async (req, res) => {
        //validates and see if there is an error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //if the error is not empty it return status 400 and a json carring the error
            return res.status(400).json({ errors: errors.array() });
        }
        //here first we are gonna check 2 things
        //1. Entered email exist or not
        //2. The correct password assciated to the email has been entered or not
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ errors: "please enter correct credentials" })
            }
            const passwordcompare = await bcrypt.compare(password, user.password)
            if (!passwordcompare) {
                return res.status(400).json({ error: "please enter correct credentials" })
            }

            //After the above two conditions have been fullfield the instruction follows....
            data = {
                user: {
                    user: user.id
                }
            }
            let authtoken = jwt.sign(data, jwt_secretkey)
            res.json({ authtoken })
        } catch (error) {
            console.log(err)
            res.status(500).send("Internal Server Error")

        }

    })


// ROUTE 2: login a user using:Post /api/auth/loginuser :NO login required 

//here we are gonna user a middleware fetchuser
route.post("/getuser", fetchuser, async (req, res) => {

    try {
        const userid = req.user
        const user = await User.findById(userid).select("-password")
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")

    }



})




module.exports = route
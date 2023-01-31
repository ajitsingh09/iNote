const express = require("express")
const route = express.Router()
const User = require("../modules/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//creating a user using:Post /api/auth/createuser :NO login required 
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
       try {let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({error:"User with this email address Already Exists....."})
        }

        //Securing the password
        let salt = await bcrypt.genSaltSync(10);
        let secPass = await bcrypt.hashSync(req.body.password, salt);

        user= await User.create({
            Name: req.body.Name,
            email: req.body.email,
            password: secPass,
        })
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).send("some Error Occured")
    }
         
    })

module.exports = route
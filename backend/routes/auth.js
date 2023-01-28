const express = require("express")
const route = express.Router()
const User = require("../modules/User")
const { body, validationResult } = require('express-validator')

//creating a user using:Post /api/auth/ :NO login required 
route.post("/",
    //Schema data conditions..user should input acc. to this
    body('Name', "Entered Name should have atleast 3 character").isLength({ min: 3 }),
    body('email', "Entered email address is invalid. Please check!!").isEmail(),
    body('password', "Password Should have atleast 8 character").isLength({ min: 8 }),
    (req, res) => {
        //validates and see if there is an error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //if the error is not empty it return status 400 and a json carring the error
            return res.status(400).json({ errors: errors.array() });
        }

        //User is created which then going to be stored in mongoDB using UserSchema
          //Data in this user is going to be fetched through the request body
        User.create({
            Name: req.body.Name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user)) //Rsolved promise is then send as response in json
            .catch(err => {
                console.log(err)

                //Now here the only error apart from the above condition we are getting is that whenever the two email addresses are same. And it is by default because mongodb data base have chosen email as it index which act as keyvalue like an id which we dont want so it gonna be fix in the later commit
                res.json({ error: "This email address is already have been registered." })
            })
    })

module.exports = route
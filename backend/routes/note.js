const express = require("express")
const route = express.Router()
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
const Note = require("../modules/Note")

// ROUTE 1: fetching all notes data using:Post /api/auth/fetchallnote :login required 
route.get("/fetchallnote", fetchuser, async (req, res) => {

    try {
        const userid = req.user
        const notes = await Note.find({ user: userid })
        res.send(notes)
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")

    }
})


// ROUTE 2: Adding notes to the database using:Post /api/auth/addnote :login required 
route.post("/addnote", fetchuser, [
    body('title', "Title Cannot be empty").exists(),
    body('discription', "Discription Should have minimum 3 letter").exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, discription, tag } = req.body//fetching data from req.body through destructuring
        const notes = new Note({//putting the data into Note Schema and creating an object 
            user: req.user, title, discription, tag
        })
        const savednote = await notes.save()//saving the object in the data base
        res.send(savednote)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: update notes on the database using:Post /api/auth/updatenote :login required 
route.put("/updatenote/:id", fetchuser, async (req, res) => {//this id part in the url can be accessed by param
    try {
        const { title, discription, tag } = req.body
        let newnote = {}//new note is created which is going to update the previous update
        if (title) { newnote.title = title }
        if (discription) { newnote.discription = discription }
        if (tag) { newnote.tag = tag }

        let note = await Note.findById(req.params.id)//it checks weather the entered id note is there or not
        if (!note) {
            return res.status(404).send("not found")
        }
        if (note.user.toString() !== req.user) {//allows updation only if the user owns the note
            return res.status(401).send("Invalid Request")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })//note is being updated 
        res.json({ note })

    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})
// ROUTE 4: delete notes on the database using:Post /api/auth/deletenote :login required 
route.put("/deletenote/:id", fetchuser, async (req, res) => {//this id part in the url can be accessed by param
    try {
        //it checks weather the entered id note is there or not
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("not found")
        }
        //allows updation only if the user owns the note
        if (note.user.toString() !== req.user) {
            return res.status(401).send("Invalid Request")
        }

        //note is being updated 
        note = await Note.findByIdAndDelete(req.params.id)
        res.send({ "successful": "note has been Successfuly deleted", note: note })

    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }

})
// ROUTE 5: delete all notes on the database using:Post /api/auth/deleteallnote :login required 
route.put("/deleteallnote", fetchuser, async (req, res) => {//this id part in the url can be accessed by param
    try {
        //it checks weather the entered id note is there or not
        const userid = req.user
        let notes = await Note.find({ user: userid })
        if (!notes) {
            return res.status(404).send("No Notes Have been found")
        } 
        let len = notes.length
        let count=0
        while (len) {
        await Note.findByIdAndDelete(notes[count].id)
        count++
            len--
        }
        res.json({"Success": "All notes have been deleted successfully"})


        

        // //note is being updated 
        // note = await Note.findByIdAndDelete(req.params.id)
        // res.send({"successful":"note has been Successfuly deleted",note:note })

    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }

})

module.exports = route
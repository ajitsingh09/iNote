import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesinitial = []
    const [notes, setNotes] = useState(notesinitial)

    //get notes
    const getnote = async () => {
        //API CALL
        const response = await fetch(`${host}/api/note/fetchallnote`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNkZmIxNjM0YTBlM2Y1YWM5NGVjMTFiIiwiaWF0IjoxNjc1NjA0MzIzfQ.JxGlO8tRylustv67CD9-HKEJzE8C_2alwHC5PVESV9I"
            },
        });
        const json = await response.json()
        setNotes(json)
    }

    //Add note
    const addnote = async (title, discription, tag) => {
        console.log("Addnote is being initiated")

        //API CALL
        const response = await fetch(`${host}/api/note/addnote`, {
            method: 'POST',
            mode: 'cors',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNkZmIxNjM0YTBlM2Y1YWM5NGVjMTFiIiwiaWF0IjoxNjc1NjA0MzIzfQ.JxGlO8tRylustv67CD9-HKEJzE8C_2alwHC5PVESV9I"

            },

            body: JSON.stringify({ title, discription, tag })
        });



        //T0-d0 := now this note will be fetch by API after we send our data
        const note = {
            "_id": "63dfc6dg39ee0sdfsdfs8160030aab231",
            "user": "63dfb1634a0e3f5ac94ec11b",
            "title": title,
            "discription": discription,
            "tag": tag,
            "Date": "2023-02-05T15:07:37.907Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    //edit note
    //now there is a very high chance it will not work reference video 65 time 1:00
    const updatenote = async (id, title, discription, tag) => {
        //API call
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNkZmIxNjM0YTBlM2Y1YWM5NGVjMTFiIiwiaWF0IjoxNjc1NjA0MzIzfQ.JxGlO8tRylustv67CD9-HKEJzE8C_2alwHC5PVESV9I"

            },

            body: JSON.stringify({ title, discription, tag })
        });

        //mydoing
        const json = await response.json()
        console.log(json)



        //logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            // console.log(notes[index])          
            if (notes[index]._id === id) {
                notes[index].title = title
                notes[index].discription = discription
                notes[index].tag = tag
            }

        }

    }

    //Delete note
    const deletenote = async(id) => {
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNkZmIxNjM0YTBlM2Y1YWM5NGVjMTFiIiwiaWF0IjoxNjc1NjA0MzIzfQ.JxGlO8tRylustv67CD9-HKEJzE8C_2alwHC5PVESV9I"
            },
        });
        const json=await response.json()
        console.log(json)

        const newnote=notes.filter((note)=>{return note._id!==id})
        setNotes(newnote)

    }
    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, updatenote, getnote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState
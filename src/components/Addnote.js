import NoteContext from '../context/NoteContext'
import React, { useContext, useState } from 'react'

const Addnote = (props) => {
    const context = useContext(NoteContext)
    const { addnote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const Onchange1 = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleclick = (e) => {
        if (note.title.trim().length === 0) {
            e.preventDefault()
            props.showalert("Title is Blank", "danger")
        } else {
            e.preventDefault()
            addnote(note.title, note.description, note.tag)
            props.onDataChange(note);
            props.showalert("Note Added Successfully", "success")
            setNote({ title: "", description: "", tag: "" })
        }
    }
    return (

        <div>
            <h2>Add Note</h2>
            <form onSubmit={handleclick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={Onchange1} />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">discription</label>
                    <input type="text" value={note.description} className="form-control" id="description" name='description' onChange={Onchange1} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={Onchange1} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Addnote

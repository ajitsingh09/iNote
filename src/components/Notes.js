import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import Addnote from './Addnote'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem'
const Notes = () => {
    const context = useContext(NoteContext)
    const { notes, getnote,editnote } = context
    useEffect(() => {
        getnote()

    },[getnote])
    const [note, setNote] = useState({id:"", etitle: "", ediscription: "", etag: "" })

    const ref = useRef(null)

    const updatenote = (currentnote) => {
        ref.current.click()
        setNote({id:currentnote._id,etitle:currentnote.title,ediscription:currentnote.discription,etag:currentnote.tag})
    }

    const Onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleclick=(e)=>{
        
       
        e.preventDefault()
        editnote(note.id,note.etitle,note.ediscription,note.etag)
        setShow(false)
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Addnote />
            <Button ref={ref} variant="primary d-none" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={Onchange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">discription</label>
                                    <input type="text" className="form-control" id="edescription" name='ediscription' value={note.ediscription} onChange={Onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={Onchange} />
                                </div>

                                
                            </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleclick}>
                        Edit Note
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {
                    notes.map((note) => {

                        return <NoteItem note={{ note, updatenote }} key={note._id} />
                    })
                }

            </div>
        </>
    )
}

export default Notes

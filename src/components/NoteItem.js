import NoteContext from '../context/NoteContext'
import React,{useContext} from 'react'

const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const {deletenote}=context
    const {note,updatenote}=props.note
    
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                    <div className="card-body">
                        <div className='d-flex align-items-center'>

                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-regular fa-pen-to-square mx-2"  onClick={()=>{updatenote(note)}}></i>
                        <i className="fa-regular fa-skull-crossbones mx-2 " onClick={()=>{deletenote(note._id)}}></i>
                        </div>
                        <p className="card-text" >{note.discription}</p>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem

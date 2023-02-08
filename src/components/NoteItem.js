import NoteContext from '../context/NoteContext'
import React,{useContext} from 'react'

const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const {deletenote}=context
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                    <div className="card-body">
                        <div className='d-flex align-items-center'>

                        <h5 className="card-title">{props.note.title}</h5>
                        <i className="fa-regular fa-pen-to-square mx-2" ></i>
                        <i className="fa-regular fa-skull-crossbones mx-2 " onClick={()=>{deletenote(props.note._id)}}></i>
                        </div>
                        <p className="card-text" >{props.note.discription}</p>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem

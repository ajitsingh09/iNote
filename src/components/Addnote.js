import NoteContext from '../context/NoteContext'
import React,{useContext,useState} from 'react'

const Addnote = () => {
    const context = useContext(NoteContext)
    const  {addnote}  = context
    const [note, setNote] = useState({title:"",description:"",tag:""})

    const Onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleclick=(e)=>{
        e.preventDefault()
        addnote(note.title,note.description,note.tag)
    }
    return (
        
        <div>
            <h2>Add Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title"  name="title" aria-describedby="emailHelp" onChange={Onchange} />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">discription</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={Onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={Onchange}/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
            </form>
        </div>
    )
}

export default Addnote

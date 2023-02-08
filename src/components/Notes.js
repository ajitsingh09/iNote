import React, { useContext,useEffect } from 'react'
import Addnote from './Addnote'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem'
const Notes = () => {
    const context = useContext(NoteContext)
    const { notes,getnote } = context
    useEffect(() => {
      getnote()
 
    }, [])
    
    return (
        <>
            <Addnote />
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {
                    notes.map((note) => {

                        return <NoteItem note={note} key={note._id} />
                    })
                }

            </div>
        </>
    )
}

export default Notes

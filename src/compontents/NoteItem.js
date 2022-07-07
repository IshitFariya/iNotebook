import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const NoteItem = (props) => {
    const { note ,updateNote,showAlert} = props;
    const context=useContext(noteContext)  
    const {deleteNote}=context;
    
    const handelDelete=(e)=>{
        e.preventDefault();
        deleteNote(note._id);
        showAlert('Deleted Note Successfully','success')
    }

    const handelUpdate=(e)=>{
        e.preventDefault();
        updateNote(note)
        showAlert('Updates Note Successfully','success')
    }

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fas fa-edit mx-3" onClick={handelUpdate}></i>
                        <i className="fas fa-trash" onClick={handelDelete}></i>
                    </div>
                    
                    <p className="card-text">{note.description}</p>
                   
                </div>
            </div>
        </div>
    )
}

export default NoteItem

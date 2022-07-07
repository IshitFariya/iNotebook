import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

import React from "react";
import NoteItem from "./NoteItem";
import { useEffect, useRef,useState } from "react";
import {useNavigate} from 'react-router-dom';
const Notes = (props) => {
  const { notes, getAllNotes ,editNote} = useContext(noteContext);
  const [note,setNote]=useState({id:'',etitle:'',edescription:'',etag:''});
  let navigate = useNavigate();
  const {showAlert} = props;
  // Read
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();
    }
    else{
      navigate('/login');
    }
    
  }, []);

  // Update
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  const ref = useRef(null);
  const refClose = useRef(null);
 
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    showAlert('Updated Successfully','success');     
  }
  return (
    <div>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3 mx-3" >
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    minLength='5'
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name='edescription'
                    value={note.edescription}
                    onChange={onChange}
                    minLength='5'
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name='etag'
                    value={note.etag}
                    onChange={onChange}
                    minLength='5'
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h3>Your Notes:-</h3>
        <div className="container mx-3">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert}/>;
        })}
      </div>

    </div>
  );
};

export default Notes;

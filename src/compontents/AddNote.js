import React, { useContext } from 'react'
import { useState } from 'react';
import noteContext from '../context/notes/noteContext';



const AddNote = (props) => {
    const context=useContext(noteContext)  
    const {addNote}=context;
    const {showAlert}=props;
    const [note,setNote]=useState({title:'',description:'',tag:''});   
    const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title:'',description:'',tag:''});
      showAlert('Added Note sucessfully','success')
    }
    return (
    <div>
      
      <div className="container my-3">
        <h3>Add a note : </h3>
        <form className="my-3 mx-3"  onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
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
              id="description"
              name='description'
              value={note.description}
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
              id="tag"
              name='tag'
              value={note.tag}
              onChange={onChange}
              minLength='5'
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={note.title.length<5 || note.description.length<5}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote

import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/note/getNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "authorization":`Bearer ${localStorage.getItem('token')}`,
      },
    });
    const json = await response.json();
    // console.log(json.data.notes);
    setNotes(json.data.notes);
  };


  // Create Note
  const addNote = async (title, description, tag) => {
    // console.log(title);
    const response = await fetch(`${host}/api/note/createNotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "authorization":`Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json()
    // console.log(json.data.note);
    setNotes(notes.concat(json.data.note));
  };
  // Update Note

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/note/updateNotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({ title, description, tag }),

    });

    const json = await response.json()
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes))


    for (let index = 0; index < newNotes.length; index++) {

      if (newNotes[index]._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes);
  };



  // Delete Note
  const deleteNote = async (id) => {
    // console.log(id);

    // console.log(newNotes)
    const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "authorization":`Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      },
    });

    const json =response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };




  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, getAllNotes, editNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

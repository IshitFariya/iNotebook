import React from 'react'
import Notes from "./Notes";
import AddNote from "./AddNote";
const Home = (props) => {
  return (
    <div>
      <div className='container'>
        <AddNote showAlert={props.showAlert}/> 
        
        <Notes showAlert={props.showAlert}/>
      </div>
    </div>
  )
}

export default Home

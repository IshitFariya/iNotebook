import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './compontents/Navbar';
import Home from './compontents/Home';
import About from './compontents/About';
import NoteState from './context/notes/noteState';
import Alert from './compontents/Alert';
import Login from './compontents/Login';
import Signup from './compontents/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  return (
    <>
      <NoteState>
      <Router>
      <Navbar/>
      <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={ <Home showAlert={showAlert}/> }/>
            <Route exact path="/about" element={ <About/> }/>
            <Route exact path="/login" element={ <Login showAlert={showAlert}/> }/>
            <Route exact path="/signup" element={ <Signup showAlert={showAlert}/> }/>
          </Routes>
      </Router>
      </NoteState>
    </>
  );

}

export default App;

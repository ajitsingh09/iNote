import React from 'react'
import Alert from './components/Alert';
import './App.css';
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NoteState from './context/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import {useState} from 'react'
function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 900);
  }
  return (
    <>
      <NoteState showalert={showalert}>

        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showalert={showalert} />} />
            <Route exact path="/login" element={<Login showalert={showalert} />} />
            <Route exact path="/signup" element={<Signup showalert={showalert} />} />
            <Route exact path="/About" element={<About />} />
            


          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

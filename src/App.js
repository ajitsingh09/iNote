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
function App() {
  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          <Alert message={"How'r you doing"}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/About" element={<About />} />
            


          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

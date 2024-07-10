import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import "./App.css";
import StudentRecord from './MyComponents/StudentRecord.js';
import Home from './MyComponents/Home.js';
import UserRegistration from './MyComponents/UserRegistration.js';
import UserEdit from './MyComponents/UserEdit.js';
import Footer from "./MyComponents/Footer.js";
import Login from "./MyComponents/login.js";


function App() {
  let myvariable = 345;
  return (
    <>
      {/* <Header  title="My Todo List" searchBar={false}/>
     
      //<Footer /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/StudentRecord" element={<StudentRecord/>}/>
          <Route path="/UserRegistration" element={<UserRegistration/>}/>
          <Route path="/UserEdit/:Enroll_no" element={<UserEdit/>}/>
          <Route path="/editing" element={<editing/>}/>
          <Route path="/footer" element={<Footer/>}/>
          {/* <Route path="/login" element={<Login/>}/> */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

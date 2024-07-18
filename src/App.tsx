import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './app/pages/Login';
import Register from './app/pages/Register';
import Welcome from './app/pages/Welcome';
import Doc from './app/pages/Doc';
import Test from './app/pages/Test';
import Layout from './app/Layout/Layout';
import Sidebar from './app/sidebar/SideBar';
import SideBar from './app/sidebar/SideBar';
import MemoForm from './app/pages/MemoForm';

function App() {
  return (
    <Router>
    <div className="App">
    <SideBar/>
      <Routes>
        

      {/* <h1>Hi, There</h1> */}

    
    <Route>
  
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>

      {/* <Route path='/' element={<Layout/>}> */}
      <Route path="/welcome" element={<Welcome />}/>
      <Route path="/doc" element={<Doc/>}/>
      <Route path="/test" element={<Test/>}/>
      <Route path="/form" element={<MemoForm/>}/>
      {/* </Route> */}
    </Route>
    </Routes>
    </div>
    </Router>
  );
}

export default App;

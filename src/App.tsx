import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './app/pages/Login';
import Register from './app/pages/Register';
import Welcome from './app/pages/Welcome';
import Doc from './app/pages/Doc';
import Test from './app/pages/Test';
import Layout from './app/Layout/LayoutComp';
import MemoForm from './app/pages/MemoForm';
import Workflow from './app/pages/Workflow';
import Inbox from './app/pages/Inbox';
import Dashboard from './app/pages/Dashboard';

function App() {
  return (
    <Router>
    <div className="App">
   
      <Routes>
  
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>

    <Route path='/' element={<Layout/>}>
      <Route path="/welcome" element={<Welcome />}/>
      <Route path="/doc" element={<Doc/>}/>
      <Route path="/test" element={<Test/>}/>
      <Route path="/form" element={<MemoForm/>}/>
      <Route path="/table" element={<Workflow/>}/>
      <Route path="/inbox" element={<Inbox/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
   
    </Routes>
    </div>
    </Router>
  );
}

export default App;

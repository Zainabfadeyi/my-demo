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
import MyTask from './app/pages/MyTask';
import MyRequest from './app/pages/MyRequest';
import ReviewerDropdown from './app/component/formComp/ReviewerDropdown';
import ReviewerForm from './app/pages/ReviewerForm';
import FillAndSignPDF from './app/component/signatures/FillAndSignPdf';
import Template from './app/pages/Template';
import CategoryTable from './app/pages/CategoryTable';

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
      <Route path="/active-task" element={<MyTask />} />
      <Route path="/my-request" element={<MyRequest/>} />
      <Route path="/reviewerform" element={<ReviewerForm/>} />
      <Route path="/pdf" element={<FillAndSignPDF/>} />
      <Route path="/templates" element={<Template/>} />
      <Route path="/category-type" element={<CategoryTable/>}/>
    </Route>
   
    </Routes>
    </div>
    </Router>
  );
}

export default App;

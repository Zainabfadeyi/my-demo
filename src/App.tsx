import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './app/pages/Login';
import Register from './app/pages/Register';
import Welcome from './app/pages/Welcome';
// import Doc from './app/pages/Doc';
import Test from './app/pages/Test';
import Layout from './app/Layout/LayoutComp';
import MemoForm from './app/pages/MemoForm';
import Workflow from './app/pages/Workflow';
import Inbox from './app/pages/Inbox';
import Dashboard from './app/pages/Dashboard';
import MyTask from './app/pages/MyTask';
import MyRequest from './app/pages/AllRequest';
import FillAndSignPDF from './app/component/signatures/FillAndSignPdf';
import Template from './app/pages/Template';
import CategoryTable from './app/pages/CategoryTable';
import Participants from './app/pages/Participants';
import ReviewerFormPages from './app/component/formComp/ReviewerFormPages';
import Locations from './app/pages/Locations';
import Overview from './app/pages/Overview';
import EditMemo from './app/component/functions/EditMemo';

function App() {
  const [selectedDocument, setSelectedDocument] = useState('');

  return (
    <Router>
    <div className="App">
   
      <Routes>
  
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>

    <Route path='/' element={<Layout/>}>
      <Route path="/welcome" element={<Welcome />}/>
      {/* <Route path="/doc" element={<Doc/>}/> */}
      <Route path="/test" element={<Test/>}/>
      <Route path="/form" element={<MemoForm/>}/>
      <Route path="/reviewer/api/v1/memorandums/approve/:memoId/:documentNo" element={<MemoForm />} />
      <Route path="/table" element={<Workflow/>}/>
      <Route path="/inbox" element={<Inbox/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-request" element={<MyTask />} />
      <Route path="/all-request" element={<MyRequest/>} />
      <Route path="/category-type" element={<CategoryTable/>}/>
      <Route  path='/participants' element={<Participants/>}/>
      <Route path='/locations' element={<Locations/>}/>
      <Route path='/overview/:documentNo' element={<Overview/>}/>
      {/* <Route path="/reviewer" element={<ReviewerFormPages />} /> */}
      <Route path="/edit-memo/:documentNo" element={<EditMemo />} />
    </Route>
   
    </Routes>
    </div>
    </Router>
  );
}

export default App;

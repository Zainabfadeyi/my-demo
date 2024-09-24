import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './app/pages/Login';
import Register from './app/pages/Register';
import Welcome from './app/pages/Welcome';
import Layout from './app/Layout/LayoutComp';
import MemoForm from './app/pages/MemoForm';
import Workflow from './app/pages/Workflow';
import Inbox from './app/pages/Inbox';
import Dashboard from './app/pages/Dashboard';
import MyTask from './app/pages/MyTask';
import MyRequest from './app/pages/AllRequest';
import CategoryTable from './app/pages/CategoryTable';
import Participants from './app/pages/Participants';
import Locations from './app/pages/Locations';
import Overview from './app/pages/Overview';
import EditMemo from './app/component/functions/EditMemo';
import ForgotPassword from './app/pages/forgotPassword';
import ResetPassword from './app/pages/ResetPassword';
import VerifyEmailForm from './app/pages/VerifyEmailForm';
import PreviewMemo from './app/component/formComp/PreviewMemo';
import UserProfileForm from './app/pages/UserProfileForm';
import ActiveTask from './app/pages/ActiveTask';
import Home from './app/landingpage/pages/homePage/Home';
import LayoutHome from './app/Layout/LayoutHome';

function App() {
  const [selectedDocument, setSelectedDocument] = useState('');

  return (
    <Router>
    <div className="App">
   
      <Routes>
      <Route path="/" element={<LayoutHome />} >
            <Route path="/" element={<Home/>} />
          </Route>
  
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<VerifyEmailForm/>} />
            <Route path="/" element={<Home/>} />

    <Route path='/' element={<Layout/>}>
      <Route path="/welcome" element={<Welcome />}/>
      <Route path="/form" element={<MemoForm/>}/>
      <Route path="/reviewer/api/v1/memorandums/approve/:memoId/:documentNo" element={<MemoForm />} />
      <Route path="/table" element={<Workflow/>}/>
      <Route path="/inbox" element={<Inbox/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-request" element={<MyTask />} />
      <Route path="/my-active-task" element={<ActiveTask />} />
      <Route path="/all-request" element={<MyRequest/>} />
      <Route path="/category-type" element={<CategoryTable/>}/>
      <Route  path='/participants' element={<Participants/>}/>
      <Route path='/locations' element={<Locations/>}/>
      <Route path='/overview/:documentNo' element={<Overview/>}/>
      <Route path="/edit-memo/:documentNo" element={<EditMemo />} />
      <Route path='/previewMemo/:memoId' element={<PreviewMemo/>}/>
      <Route path ="/userprofile" element={<UserProfileForm/>}/>
      
    </Route>
   
    </Routes>
    </div>
    </Router>
  );
}

export default App;

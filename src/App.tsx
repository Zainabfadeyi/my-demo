// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './app/pages/Login';
// import Register from './app/pages/Register';
// import Welcome from './app/pages/Welcome';
// import Layout from './app/Layout/LayoutComp';
// import MemoForm from './app/pages/MemoForm';
// import Workflow from './app/pages/Workflow';
// import Inbox from './app/pages/Inbox';
// import Dashboard from './app/pages/Dashboard';
// import MyTask from './app/pages/MyTask';
// import MyRequest from './app/pages/AllRequest';
// import CategoryTable from './app/pages/CategoryTable';
// import Participants from './app/pages/Participants';
// import Locations from './app/pages/Locations';
// import Overview from './app/pages/Overview';
// import EditMemo from './app/component/functions/EditMemo';
// import ForgotPassword from './app/pages/forgotPassword';
// import ResetPassword from './app/pages/ResetPassword';
// import VerifyEmailForm from './app/pages/VerifyEmailForm';
// import PreviewMemo from './app/component/formComp/PreviewMemo';
// import UserProfileForm from './app/pages/UserProfileForm';
// import ActiveTask from './app/pages/ActiveTask';
// import Home from './app/landingpage/pages/homePage/Home';
// import LayoutHome from './app/Layout/LayoutHome';

// function App() {
//   const [selectedDocument, setSelectedDocument] = useState('');

//   return (
//     <Router>
//     <div className="App">
   
//       <Routes>
//       <Route path="/" element={<LayoutHome />} >
//             <Route path="/" element={<Home/>} />
//           </Route>
  
//       <Route path='/login' element={<Login />}/>
//       <Route path='/register' element={<Register />}/>
//       <Route path="/forgotPassword" element={<ForgotPassword />} />
//             <Route path="/resetPassword" element={<ResetPassword />} />
//             <Route path="/verify-otp" element={<VerifyEmailForm/>} />
//             <Route path="/" element={<Home/>} />

//     <Route path='/' element={<Layout/>}>
//       <Route path="/welcome" element={<Welcome />}/>
//       <Route path="/form" element={<MemoForm/>}/>
//       <Route path="/reviewer/api/v1/memorandums/approve/:memoId/:documentNo" element={<MemoForm />} />
//       <Route path="/table" element={<Workflow/>}/>
//       <Route path="/inbox" element={<Inbox/>}/>
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/my-request" element={<MyTask />} />
//       <Route path="/my-active-task" element={<ActiveTask />} />
//       <Route path="/all-request" element={<MyRequest/>} />
//       <Route path="/category-type" element={<CategoryTable/>}/>
//       <Route  path='/participants' element={<Participants/>}/>
//       <Route path='/locations' element={<Locations/>}/>
//       <Route path='/overview/:documentNo' element={<Overview/>}/>
//       <Route path="/edit-memo/:documentNo" element={<EditMemo />} />
//       <Route path='/previewMemo/:memoId' element={<PreviewMemo/>}/>
//       <Route path ="/userprofile" element={<UserProfileForm/>}/>
      
//     </Route>
   
//     </Routes>
//     </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { RootState } from './api/store';
import { useSelector } from 'react-redux';



const PrivateRoute = ({ roles, children }: { roles: string[], children: JSX.Element }) => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role || '');

  console.log("User Role: ", userRole);

  if (!userRole) {
    console.log("No user role found, redirecting to login.");
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userRole)) {
    console.log(`Role ${userRole} not authorized for this route.`);
    return <Navigate to="/not-authorized" />;
  }

  return children;
};


function App() {
  const [selectedDocument, setSelectedDocument] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LayoutHome />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyEmailForm />} />
     <Route path='/' element={<Layout/>}>

          {/* Protected Routes */}
          <Route
            path="/welcome"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <Welcome />
              </PrivateRoute>
            }
          />

          <Route
            path="/form"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <MemoForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/reviewer/api/v1/memorandums/approve/:memoId/:documentNo"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <MemoForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/table"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <Workflow />
              </PrivateRoute>
            }
          />

          <Route
            path="/inbox"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <Inbox />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-request"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <MyTask />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-active-task"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <ActiveTask />
              </PrivateRoute>
            }
          />

          {/* Admin Only Routes */}
          <Route
            path="/all-request"
            element={
              <PrivateRoute roles={['ADMIN']}>
                <MyRequest />
              </PrivateRoute>
            }
          />

          <Route
            path="/category-type"
            element={
              <PrivateRoute roles={['ADMIN']}>
                <CategoryTable />
              </PrivateRoute>
            }
          />

          {/* Other Shared Routes */}
          <Route
            path="/participants"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <Participants />
              </PrivateRoute>
            }
          />

          <Route
            path="/locations"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <Locations />
              </PrivateRoute>
            }
          />

          <Route
            path="/overview/:documentNo"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <Overview />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-memo/:documentNo"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <EditMemo />
              </PrivateRoute>
            }
          />

          <Route
            path="/previewMemo/:memoId"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <PreviewMemo />
              </PrivateRoute>
            }
          />

          <Route
            path="/userprofile"
            element={
              <PrivateRoute roles={['ADMIN', 'USER']}>
                <UserProfileForm />
              </PrivateRoute>
            }
          />


          {/* Add a not authorized route */}
          <Route path="/not-authorized" element={<div>Not authorized</div>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


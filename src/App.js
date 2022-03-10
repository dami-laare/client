import React, { useEffect, useState } from 'react'
import { useStore, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/UI/Dashboard';
import Home from './components/UI/Home';
import Settings from './components/UI/Settings';
import CompleteRegistration from './components/userRegistration/CompleteRegistration';
//import CreatePin from './components/userRegistration/CreatePin';
import Register from './components/userRegistration/Register';
import Login from './components/userRegistration/Login';
import ProtectedRoute from './components/misc/ProtectedRoute';
import AdminHome from './components/admin/AdminHome';
import AdminVerify from './components/admin/AdminVerify';
import ScanQr from './components/admin/ScanQr';

function App() {

  const state = useSelector(state => state)
  const [inviteAllowed, setInviteAllowed] = useState(localStorage.getItem('inviteAllowed')? localStorage.getItem('inviteAllowed'): false)
const [registerToken, setRegisterToken] = useState(localStorage.getItem('registerToken')? localStorage.getItem('registerToken'):false)
const [completeToken, setCompleteToken] = useState(localStorage.getItem('completeToken')? localStorage.getItem('completeToken'):false)

  useEffect(() => {
    setInviteAllowed(localStorage.getItem('inviteAllowed'))
    setRegisterToken(localStorage.getItem('registerToken'))
    setCompleteToken(localStorage.getItem('completeToken'))
  }, [state])
  return (
    <BrowserRouter>
      <div className="App">
        <div className='container-fluid main-body d-flex justify-content-center'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' 
              element={
                <ProtectedRoute token={inviteAllowed}>
                  <Register />
                </ProtectedRoute>
                
              } 
            />
            <Route path='/completeRegistration' element={<ProtectedRoute token={registerToken}><CompleteRegistration/></ProtectedRoute>} />
            <Route path='/dashboard' element={<ProtectedRoute token={completeToken}><Dashboard /></ProtectedRoute>} />
            <Route path='/user/settings' element={<ProtectedRoute token={completeToken}><Settings /></ProtectedRoute>} />
            <Route path='/user/login' element={<Login />} />
            <Route path='/b9fh3fb374gfhb3un2n08385fn9nfh' element={<AdminHome/>} />
            <Route path='/b9fh3fb374gfhb3un2n08385fn9nfh/verify' element={<AdminVerify/>} />
            <Route path='/b9fh3fb374gfhb3un2n08385fn9nfh/scan' element={<ScanQr/>} />
          </Routes>  
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

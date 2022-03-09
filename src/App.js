import React, { useEffect, useState } from 'react'
import { useStore } from 'react-redux';
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

function App() {

  const [inviteAllowed, setInviteAllowed] = useState(false)
const [registerToken, setRegisterToken] = useState(false)
const [completeToken, setCompleteToken] = useState(false)

  useEffect(() => {
    setInviteAllowed(localStorage.getItem('inviteAllowed'))
    setRegisterToken(localStorage.getItem('registerToken'))
    setCompleteToken(localStorage.getItem('completeToken'))
  }, [useStore().getState()])
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
          </Routes>  
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

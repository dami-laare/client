import React, { Fragment, useState } from 'react'
import Header from '../UI/Header'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { login } from '../../actions/userActions';

const Login = () => {

  const [pin, setPin ] = useState('')
  const [phone, setPhone ] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const store = useStore()

  const pinChangeHandler = (e) => {
    setPin(e.target.value)
  }

  const phoneChangeHandler = (e) => {
    setPhone(e.target.value)
  }

  const submitHandler = async (e) => {
      e.preventDefault();
      
      await dispatch(login(phone, pin))

      const currState = store.getState();

      if(currState.error) {
        return alert.error(currState.error)
      }
      
      await localStorage.setItem('completeToken', currState.token)
      await localStorage.setItem('details', JSON.stringify(currState.details));
      
      setTimeout(() => {
          navigate(`/dashboard`)
      }, 1000)
      
      
      

  }
  return (
    
    <Fragment>

      <Header classes={'nav-custom'} image={true} imgSrc={`${process.env.PUBLIC_URL}/logo-white.png`} heading='Login'/>
        <form
            onSubmit={submitHandler} 
            className={`d-flex flex-column mx-auto align-items-center`}
            style={{marginTop: '15rem'}}
        >
            
            <div className={`col-12 mb-4 mb-md-5 row align-items-center justify-content-between`}>
                <label htmlFor='phone' className='form-label justify-self-left col-2'>Phone:</label>
                <div className='col-9'>
                    <input autoComplete='off' id='phone' className='form-control' type='tel' name='phone' placeholder='080********' onChange={phoneChangeHandler}/>
                </div>
            </div>
            <div className={`col-12 mb-3 row row align-items-center justify-content-between`}>
                <label htmlFor='pin' className='form-label justify-self-left col-2'>PIN:</label>
                <div className='col-9'>
                    <input autoComplete='off' id='pin' className='form-control' type='password' name='pin' placeholder='******' onChange={pinChangeHandler}/>
                </div>
            </div>
            <div className={`col-6 text-center`}>
                <button className='btn  w-75 rounded-pill' type='submit'>Login</button>
            </div>
        </form>
    </Fragment>
  )
}

export default Login

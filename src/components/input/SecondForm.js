import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { registerUser } from '../../actions/userActions';

const options = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true
}
const SecondForm = ({ btnSize, btnText, classes, inputSize, path} ) => {
  
  const [phone, setPhone ] = useState('')
  const [loading, setLoading ] = useState(false)
  const [name, setName ] = useState('')
  const [email, setEmail ] = useState('')
  const [address, setAddress] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const store = useStore()

  useEffect(()=> {

  }, [])

  const codeChangeHandler = (e) => {
    setPhone(e.target.value)
  }

  const nameChangeHandler = (e) => {
    setName(e.target.value)
  }

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const addressChangeHandler = (e) => {
    setAddress(e.target.value)
  }

  const submitHandler = async (e) => {
      e.preventDefault();
      setLoading(true)
      await dispatch(registerUser(phone, name, email,address));

      const currState = store.getState();

      if(currState.error) {
        setLoading(false)
        return alert.error(currState.error)
      }
      

      navigate(`${path}`);
      
      

  }

  return (
    <form onSubmit={submitHandler} className={`row mx-auto ${classes ? classes : ''}`}>
        <div className={`col-${inputSize ? inputSize : '8'} mb-3 row align-items-center justify-content-between`}>
            <label htmlFor='name' className='form-label justify-self-left col-2'>Name:</label>
            <div className='col-9'>
                <input id='name' className='form-control' name='name' placeholder='John Doe' onChange={nameChangeHandler}/>
            </div>
        </div>
        <div className={`col-${inputSize ? inputSize : '8'} mb-3 row row align-items-center justify-content-between`}>
            <label htmlFor='email' className='form-label justify-self-left col-2'>Email:</label>
            <div className='col-9'>
                <input id='email' className='form-control' type='email' name='email' placeholder='someone@example.com' onChange={emailChangeHandler}/>
            </div>
        </div>
        <div className={`col-${inputSize ? inputSize : '8'} mb-4 mb-md-5 row align-items-center justify-content-between`}>
            <label htmlFor='phone' className='form-label justify-self-left col-2'>Phone:</label>
            <div className='col-9'>
                <input id='phone' className='form-control' type='tel' name='phone' placeholder='080********' onChange={codeChangeHandler}/>
            </div>
        </div>
        <div className={`col-${inputSize ? inputSize : '8'} mb-4 mb-md-5 row align-items-center justify-content-between`}>
            <label htmlFor='address' className='form-label justify-self-left col-2'>Address:</label>
            <div className='col-9'>
                <input id='address' className='form-control' type='text' name='address' placeholder='Your address' onChange={addressChangeHandler}/>
            </div>
        </div>
        <div className={`col-${btnSize}`}>
            <button className='btn  w-75 rounded-pill' type='submit'>{loading ? <i className="loading text-white fas fa-circle-notch" ></i> : btnText}</button>
        </div>
    </form>
  )
}

export default SecondForm
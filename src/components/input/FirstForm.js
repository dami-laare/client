import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { submitInviteCode } from '../../actions/userActions';


const FirstForm = ({ placeholder, btnSize, type, btnText, id, name, classes, inputSize, path} ) => {
  
  const [code, setCode ] = useState('')
  const [loading, setLoading ] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const store = useStore()

  const codeChangeHandler = (e) => {
    setCode(e.target.value)
  }

  const submitHandler = async (e) => {
      e.preventDefault();
      setLoading(true)
      await dispatch(submitInviteCode(code))

      const currState = store.getState();

      


      if(currState.error) {
        setLoading(false)
        return alert.error(currState.error)
    }

      navigate(`${path}`);
      
      

  }

  return (
    <form onSubmit={submitHandler} className={`row mx-auto ${classes ? classes : ''}`}>
        <div className={`col-${inputSize ? inputSize : '8'} mb-3`}>
            <input id={id} className='form-control' type={type} name={name} placeholder={placeholder} onChange={codeChangeHandler} required/>
        </div>
        <div className={`col-${btnSize}`}>
            <button className='btn w-75 rounded-pill' type='submit'>{loading ? <i class="loading text-white fas fa-circle-notch" ></i> : btnText}</button>
        </div>
    </form>
  )
}

export default FirstForm

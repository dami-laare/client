import React, { Fragment, useState, useEffect } from 'react'
import ReactCodeInput from 'react-code-input'
import Button from '../UI/Button'
import Header from '../UI/Header'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { useAlert } from 'react-alert'
import { verifyOTP, resendOTP } from '../../actions/userActions';
import CreatePin from './CreatePin';

const style = {
    fontFamily: 'monospace',
    margin:  '4px',
    MozAppearance: 'textfield',
    width: '2.5rem',
    height: '3rem',
    borderRadius: '10px',
    fontSize: '1.2rem',
    fontWeight: 600,
    paddingLeft: 'calc(1.5rem - 10px)',
    backgroundColor: 'white',
    color: '#FF611D',
    border: '1px solid #c7663ccb',

  }

const CompleteRegistration = () => {

    const [otp, setOtp] = useState('')
     const [loading, setLoading ] = useState(false)

    const [initState, setInitState] = useState({
        loading: true,
        success: null
        
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useStore();
    const alert = useAlert();

    const otpChangeHandler = (otp) => {
        setOtp(otp)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        let currState = store.getState();

        let token = localStorage.getItem('registerToken')

        await dispatch(verifyOTP(otp, token));
        
        currState = store.getState();

        setInitState(currState)

        if(currState.error) {
            setLoading(false)
            return alert.error(currState.error)
          }
    }

    const resendOtp = async () => {
        await dispatch(resendOTP);
    }
  return (
    <Fragment>
        <Header image={true} imgSrc='logo-white.png' classes={'nav-custom'}/>
        {!initState.success ? (
            <section className='mt-custom my-auto text-center d-flex flex-column justify-content-center align-items-center'>
            <p className='px-3 mb-4'>We just sent an OTP to your registered phone number and email.<br/>(Remember to check your spam folder)</p>
            <form onSubmit={submitHandler} className='row'>
                <div className='mb-4 col-12'>
                    <ReactCodeInput 
                        type='text'
                        fields={6}
                        onChange={otpChangeHandler}
                        inputStyle={style}
                        className='pin col-12'
                    />
                </div>
                <div>
                    <button onClick={resendOtp} className='btn btn-resend rounded-pill mb-3'>Resend OTP</button>
                </div>
                <div className='col-6 mx-auto'>

                    <Button loading={loading} btnText='Verify' />
                </div>
            </form>

        </section>    
        ) : (
            <CreatePin style={style} test={initState.success}/>
        )}
        
    </Fragment>
  )
}

export default CompleteRegistration

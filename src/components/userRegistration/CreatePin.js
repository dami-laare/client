import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { useAlert } from 'react-alert'
import Header from '../UI/Header'
import DModal from '../UI/DModal'
import ReactCodeInput from 'react-code-input'
import Button from '../UI/Button'
import { addPin } from '../../actions/userActions';



const CreatePin = ({style, show1}) => {

     const [loading, setLoading ] = useState(false)
     const [pin, setPin] = useState('');
    const [show, setShow] = useState(show1)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useStore();
    const alert = useAlert();

    const pinChangeHandler = (pin) => {
        setPin(pin)
    }

    const modalBtnClickHandler = () => {
        setShow(false)
        
        navigate('/dashboard')

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let state = store.getState();
        setLoading(true)
        await dispatch(addPin(pin, state.token))

        state = store.getState();

        if(state.error) {
            setLoading(false)

            return alert.error(state.error)
          }

        setShow(true)

        setLoading(false)
        await localStorage.setItem('details', JSON.stringify(state.details));


        await localStorage.setItem('completeToken', state.token)
    }
  return (
    <Fragment >
        {/* <Header imgSrc='logo-white.png' classes={'nav-custom'}/> */}
        <section className='mt-custom my-auto text-center d-flex flex-column justify-content-center align-items-center'>
            <p className='px-3 mb-4'>Create your PIN.</p>
            <form className='row' onSubmit={submitHandler}>
                <div className='mb-4 col-12'>
                    <ReactCodeInput 
                        type='password'
                        fields={6}
                        onChange={pinChangeHandler}
                        inputStyle={style}
                        className='pin'
                    />
                </div>
                <div className='col-6 mx-auto'>

                    <Button loading={loading} btnText='Verify' />
                </div>
            </form>
        </section>
        <DModal 
            show={show} 
            modalBody='An email has been sent to you with instructions on how to redeem your voucher.'
            headerText={'Congrats!'}
            onClick={modalBtnClickHandler}
            footer={true}
        />
        
    </Fragment>
  )
}

export default CreatePin

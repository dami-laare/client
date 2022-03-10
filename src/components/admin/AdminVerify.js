import React, { Fragment, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useStore } from 'react-redux'
import Header from '../UI/Header'
import {verifyUser} from '../../actions/adminActions'

const AdminVerify = () => {

    const [id, setId] = useState('')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()
    const store = useStore()
    const alert = useAlert()

    const idChangeHandler = (e) => {
        setId(e.target.value)
    }

    const verify = async (e) => {
        e.preventDefault()

        await dispatch(verifyUser(id));

        const state = store.getState();

        if(state.error){
            return alert.error(state.error)
        }

        setMessage(state.message)

        setShow(true)

    }
  return (
      <Fragment>
          <Header image={true} imgSrc={`${process.env.PUBLIC_URL}/logo.png`}/>

          <form onSubmit={verify} className='my-auto w-100 d-flex flex-column align-items-center px-3 text-center'>
            <h1 className='mb-5'>Verify User</h1>
            <div className='mb-4'>
                <label htmlFor='customer-id'>Enter user ID here</label>
                <input value={id} onChange={idChangeHandler} className='mt-3' id='customer-id' />
            </div>
            <button  className='mx-auto w-50 btn mb-3'>Verify user</button>

            {show && (
                <p>{message}</p>
            )}
        </form>
      </Fragment>
    
  )
}

export default AdminVerify
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux'
import {generateToken} from '../../actions/adminActions'
import Header from '../UI/Header'
import { useAlert } from 'react-alert';

const AdminHome = () => {
    const [invite, setInvite] = useState('')
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()
    const store = useStore()
    const alert = useAlert()


    const generateNewToken = async () => {
        await dispatch(generateToken())

        const state = store.getState()

        if(state.error){
            return alert.error(state.error)
        }

        console.log(state)

        setInvite(state.token)

        setShow(true)
    }


  return (
      <Fragment>
        <Header image={true} imgSrc={`${process.env.PUBLIC_URL}/logo.png`}/>

        <div className='w-100 d-flex flex-column my-auto text-center'>
            <h1 className='mb-5'>Admin</h1>

            <button onClick={generateNewToken} className='mx-auto w-50 btn mb-3'>Generate Token</button>
            <Link to='/admin' className=''>Verify user</Link>
            {show && (
                <p className='mt-3'>Token:<br />{invite}<button onClick={()=> navigator.clipboard.writeText(`${invite}`)} className='ms-3 btn' ><i class="fas fa-copy"></i></button></p>
            )}
        </div>

      </Fragment>
    
  )
}

export default AdminHome
import React, { Fragment, useState } from 'react'
import Button from '../UI/Button'
import Header from './Header'
import BottomMenu from './BottomMenu'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { logout } from '../../actions/userActions';

const Settings = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const store = useStore()
    const [details, setDetails] = useState(JSON.parse(localStorage.getItem('details')))
    const logoutHandler = async () => {
        let currState = store.getState();
        await dispatch(logout(localStorage.getItem('completeToken')));

        currState = store.getState();

   

        if(currState.error){
            alert.error(currState.error)
        }

        await localStorage.removeItem('completeToken')
        await localStorage.removeItem('details')
        navigate('/user/login');

    }   
  return (
    <Fragment>
        <Header image={false} imgSrc={`${process.env.PUBLIC_URL}/logo-white.png`} classes={'nav-custom'}/>
        <div className='d-flex flex-column'>
            <div className=' profile-main-head mb-5'>
                <div className='col'>
                    <h1 className='mt-3 profile-head text-center'>Profile</h1>
                    <button className='text-light btn btn-logout rounded-pill mx-auto' type='submit' onClick={logoutHandler}>Logout</button>
                </div>
            </div>
            <div className=' text-center mb-3'>
                <img className='profile-pic rounded-circle' src={`${process.env.PUBLIC_URL}/profile.jpg`} alt='profile'></img>
            </div>
            <form className={`row mx-auto justify-content-center px-5`}>
                <div className={`col-12 mb-3 row align-items-center justify-content-between`}>
                    <div className='col-12'>
                        <input id='name' className='form-control' name='name' placeholder={details.name} disabled/>
                    </div>
                </div>
                <div className={`col-12 mb-3 row row align-items-center justify-content-between`}>
                    <div className='col-12'>
                        <input id='email' disabled className='form-control' type='email' name='email' placeholder={details.email}/>
                    </div>
                </div>
                <div className={`col-12 mb-4 mb-md-5 row align-items-center justify-content-between`}>
                    <div className='col-12'>
                        <input id='phone' disabled className='form-control' type='tel' name='phone' placeholder={details.phone} />
                    </div>
                </div>
                <div className={`col-12 mb-4 mb-md-5 row align-items-center justify-content-between`}>
                    <div className='col-12'>
                        <input id='address' disabled className='form-control' type='tel' name='address' placeholder={details.address} />
                    </div>
                </div>
                <div className={`col-10 text-center`}>
                    <button className='btn  w-75 rounded-pill' type='submit'>Update profile</button>
                </div>
            </form>
        </div>
        <BottomMenu />
    </Fragment>
  )
}

export default Settings

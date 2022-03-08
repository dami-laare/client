import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { useAlert } from 'react-alert'
import { verifyBVN } from '../../actions/userActions';


const PlainForm = ({ type, name, placeholder, btnSize, btnText, classes, onClick, close }) => {
    const [bvn, setBvn] = useState('')
    const [dob, setDob] = useState(null)
    const store = useStore();
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();


    const dateChangeHandler = (e) => {
        setDob(new Date(e.target.value))
        console.log(dob.toLocaleDateString().replace(/\//g, '-'));
    }

    const bvnChangeHandler = (e) => {
        setBvn(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        // setShow(false)
        console.log(store.getState());

        let currState = store.getState();

        await dispatch(verifyBVN(bvn, dob, currState.token))

        currState = store.getState();
        console.log(currState)
        if(currState.error) {
            return alert.error(currState.error)
        }

        close(true)
    }
  return (
    <form className={`row mx-auto ${classes ? classes : ''}`} onSubmit={submitHandler}>
        <div className={` mb-4`}>
            <div>
                <label htmlFor='BVN' className='form-label'>BVN:</label>   

                <input 
                    id='BVN'
                    className='form-control mb-3' 
                    type={type} 
                    name={name} 
                    placeholder={placeholder} 
                    onChange={bvnChangeHandler}
                    required
                />
            </div>
            <div>
            <label htmlFor='date-of-birth' className='form-label'>Date of Birth:</label>   
            <input 
                id='date-of-birth'
                className='form-control' 
                type='date' 
                name='DOB' 
                placeholder={'Date Of Birth'} 
                onChange={dateChangeHandler}
                required
            />
            </div>
        </div>
        <div className={`col-${btnSize} text-center mb-2`}>
            <button className='btn w-100 rounded-pill mx-auto' type='submit'>{btnText}</button>
        </div>
        <div className='col-12 row text-center justify-content-center mt-2'>
            <div className='col-6'>
                <button onClick={onClick} className=' btn btn-back w-100 rounded-pill mx-auto' type='submit'>Close</button>
            </div>

        </div>
    </form>
  )
}

export default PlainForm
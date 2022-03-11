import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { useAlert } from 'react-alert'
import { verifyBVN } from '../../actions/userActions';


const PlainForm = ({ type, name, placeholder, btnSize, btnText, classes, onClick, close }) => {
    const [bvn, setBvn] = useState('')
  const [loading, setLoading ] = useState(false)
  const [dob, setDob] = useState(null)
    const store = useStore();
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();


    const dateChangeHandler = (e) => {
        setDob(new Date(e.target.value).toLocaleDateString().replace(/\//g, '-'))
        console.log(dob.split('-')[1])
    }

    const bvnChangeHandler = (e) => {
        setBvn(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        let currState = store.getState();

        await dispatch(verifyBVN(bvn, dob, localStorage.getItem('completeToken')))

        currState = store.getState();
        if(currState.error) {
            setLoading(false)
            
            close(true)
            onClick()
            return alert.error(currState.error)
        }

        alert.info('BNV Successfully added')
        let dashData = JSON.parse(localStorage.getItem('dashData'));
        dashData.bvnAdded = true
        localStorage.setItem('dashData', JSON.stringify(dashData))
        setLoading(false)
        close(true)

        setTimeout(() => {
            window.location.reload()
        }, 3000)
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
            <button className='btn w-100 rounded-pill mx-auto' type='submit'>{loading ? <i class="loading text-white fas fa-circle-notch" ></i>  :btnText}</button>
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
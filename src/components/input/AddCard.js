import React from 'react'

const AddCard = ({classes, onClick, btnSize, btnText}) => {
  return (
    <form className={`row mx-auto ${classes ? classes : ''}`}>
        <div className={` mb-4`}>
            <div>
                <label htmlFor='BVN' className='form-label'>BVN:</label>   

                <input 
                    id='BVN'
                    className='form-control mb-3' 
                    type='text' 
                    name='cardNumber' 
                    placeholder='Card Number' 
                    // onChange={bvnChangeHandler}
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
                // onChange={dateChangeHandler}
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

export default AddCard
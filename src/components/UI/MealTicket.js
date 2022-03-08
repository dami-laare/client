import React from 'react'

const MealTicket = ({getMealTicket, payback}) => {
  return (
    <div className='meal-ticket col-12 row justify-content-center text-center mt-4'>
        <div className='col-4 mx-3 '>
            <button onClick={getMealTicket} className='meal-btn btn'><i className="text-danger fas meal-arrow fa-arrow-down"></i></button>
            <p className='mt-2' style={{fontSize: '0.85rem'}}>Get Food Voucher</p>
        </div>
        <div className='col-4 mx-3'>
            <button onClick={payback} className='meal-btn btn'><i className="text-success fas meal-arrow fa-arrow-up"></i></button>
            <p className='mt-2' style={{fontSize: '0.85rem'}}>Pay back</p>
        </div>
    </div>
  )
}

export default MealTicket



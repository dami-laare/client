import React from 'react'
import Credit from './Credit'

const CreditBalance = ({availBal}) => {
  return (
    <div className='credit col-12 text-light p-2'>
        <Credit availBal = {availBal}/>
    </div>
  )
}

export default CreditBalance
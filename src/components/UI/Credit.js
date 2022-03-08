import React from 'react'

const Credit = () => {
  return (
    <div className='row'>
        <div className='col-12 credit-text mb-2'>Available Balance: &#8358;10000</div>
        <div className='col-12 row'>
            <div className='col-7 col-sm-9 credit-bar rounded-pill'>
                <div className='credit-fill rounded-pill'></div>
            </div>
            <div className='col-4 col-sm-2 credit-text ms-3'>Limit &#8358;10,000</div>
        </div>
    </div>
  )
}

export default Credit
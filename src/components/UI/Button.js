import React from 'react'

const Button = ({loading, btnText, onClick}) => {
  return (
    <button className='btn w-75 rounded-pill' type='submit' onClick={onClick ? onClick : null}>{loading ? <i className="loading text-white fas fa-circle-notch" ></i>  :btnText}</button>
  )
}

export default Button
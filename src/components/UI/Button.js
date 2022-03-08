import React from 'react'

const Button = ({btnText, onClick}) => {
  return (
    <button className='btn w-75 rounded-pill' type='submit' onClick={onClick ? onClick : null}>{btnText}</button>
  )
}

export default Button
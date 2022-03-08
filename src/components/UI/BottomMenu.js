import React from 'react'
import { Link } from 'react-router-dom'

const BottomMenu = () => {
  return (
    
        <div id='bottom-menu' className='row text-center py-3'>
            <div className='col-4'>
                <Link to='/dashboard' className=''><i className="fas fa-home bottom-icon"></i></Link>
            </div>
            <div className='col-4'>
                <Link to='/dashboard' className=''><i className="fas fa-exchange-alt bottom-icon"></i></Link>
            </div>
            <div className='col-4'>
                <Link to='/user/settings' className=''><i className="fas fa-cog bottom-icon"></i></Link>
            </div>
            
        </div>
    
  )
}

export default BottomMenu
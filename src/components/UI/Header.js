import React from 'react';
import { Link } from 'react-router-dom'

const Header = ({classes, imgSrc, style, heading, image}) => {
  return (
    <nav id='main-nav' className={`row ps-4 pt-4 ${classes ? classes : ''} `}>  
        {image && (
          <Link to='/' className='col-4'>
            <img src={`${imgSrc}`} alt='Fungry logo' style={style}/>
        </Link>
        )}
        
        {heading && (
          <h1 className='col-12 text-center heading mt-3'>{heading}</h1>
        )}
    </nav>
  )
}

export default Header
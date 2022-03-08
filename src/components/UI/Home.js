import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import FirstForm from '../input/FirstForm'
import Header from './Header'


const Home = () => {

  return (
      <Fragment>
          <Header image={true} imgSrc='logo.png'/>
          <section className='hero mx-4 h-100 d-flex flex-column'>
            <div className='row h-25 justify-content-between my-5'>
                <div className='col-6 mt-3'>
                    <h1 className='hero-header'>Eat Now, Pay Later!</h1>
                    <p id='hero-text'>There are smarter ways to spend your money.</p>
                </div>
                <div className='col-6'>
                    <img className='hero-image' src='burger.png' alt='Home burger' />
                </div>
            </div>
            <div className='d-flex flex-column text-center mt-4'>
                <p className='mb-5'>Get credits to cover your food expenses and pay us at the end of the month.</p>
                <FirstForm 
                    id='invite-code' 
                    type='text' 
                    btnSize='4' 
                    btnText='Go' 
                    placeholder='Enter your invite code' 
                    name='inviteCode'
                    path='/register'
                />
                <p style={{fontSize: '0.8rem'}}>Already have an account? <Link to={'/user/login'} className='text-dark'>Sign in</Link></p>
            </div>
            <footer className='hero-foot text-center mt-auto mb-3 '>Payments secured by Monnify</footer>
          </section>
      </Fragment>
    
  )
}

export default Home
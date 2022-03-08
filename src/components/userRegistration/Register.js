import React, { Fragment } from 'react'
import SecondForm from '../input/SecondForm'
import Header from '../UI/Header'

const Register = () => {
  return (
    <Fragment>
      <Header image={true} imgSrc={'logo.png'}/>
        <section className='my-auto text-center d-flex flex-column justify-content-center align-items-center'>
          <h1 className='hero-header mb-4'>Welcome</h1>
          <p className='px-3 mb-5'>We’ve got a FREE meal voucher for you but first, let’s get to know you. </p>
          <SecondForm 
              inputSize='11' 
              btnSize='12' 
              btnText='Claim Meal Voucher' 
              classes={'d-flex flex-column align-items-center'}
              path='/completeRegistration'
          />
      </section>  
    </Fragment>
    
  )
}

export default Register

// TODO: Make route to the component accessible to only those who are logged in.......
import { useDispatch, useStore } from 'react-redux';
import React, { Fragment, useEffect, useState } from 'react'
import { verifyBVN } from '../../actions/userActions';
import BottomMenu from './BottomMenu'
import CreditBalance from './CreditBalance'
import Header from './Header'
import MealTicket from './MealTicket'
import DModal from '../UI/DModal'
import Transactions from './Transactions'
import AddCard from '../userRegistration/AddCard'

import PlainForm from './PlainForm'
import './Dashboard.css'

const Dashboard = () => {
    
    const store = useStore();
    const [verified, setVerfied] = useState(store.getState().verified)
    const [addedCard, setAddedCard] = useState(false)
    const [addCard, setAddCard] = useState(false)
    const [firstTicket, setFirstTicket] = useState(false)
    const state = store.getState()
    useEffect(() => {
        setVerfied(state.verified)
    }, [store, state])
    

    const [show, setShow] = useState(false)

    const modalBtnClickHandler = () => {
        setShow(false)
        setAddCard(false)
    }

    const closeHandler = (a) => {
        setShow(!a)
    }

    const getMealTicket = () => {
        if(!verified){
            setShow(true)
        }
        if(!addedCard && !firstTicket){
            setAddCard(true);
        }
    }

    const payback = () => {
        if(!verified){
            setShow(true)
        }
        if(!addedCard && !firstTicket){
            setAddCard(true);
        }
    }

  return (
    <Fragment>
        <Header image={true} imgSrc={'logo.png'} style={{width: '5rem', marginLeft: '1.5rem'}} heading='Dashboard' classes={'dashboard-header'}/>
  
        <div className='d-flex flex-column'style={{marginTop: '7rem', width: '100%'}}>
            <div style={{padding: '1rem'}}>
                <CreditBalance />
                <MealTicket getMealTicket={getMealTicket} payback={payback}/>
                <Transactions />
            </div>
            
            <BottomMenu />
            <DModal 
                show={show} 
                modalBody={<PlainForm type='text' close={closeHandler} name='bvn' placeholder='Enter your BVN' btnText={'Continue'} btnSize='5' classes={'justify-content-center'}onClick={modalBtnClickHandler}/>}
                headerText={'Activate your account'}
                onClick={modalBtnClickHandler}
                footer={false}
            />
            <AddCard show={addCard} onClick={modalBtnClickHandler}/>
        </div>
    </Fragment>
  )
}

export default Dashboard

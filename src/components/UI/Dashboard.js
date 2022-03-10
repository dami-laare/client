import { useDispatch, useSelector, useStore } from 'react-redux';
import React, { Fragment, useEffect, useState } from 'react'
import { verifyBVN, getLatestState } from '../../actions/userActions';
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
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [verified, setVerfied] = useState(JSON.parse(localStorage.getItem('dashData')).bvnAdded)
    const [bvnAdded, setBvnAdded] = useState(JSON.parse(localStorage.getItem('dashData')).bvnAdded)
    const [showReview, setShowReview] = useState(false)
    const [show, setShow] = useState(false)
    const [addedCard, setAddedCard] = useState(store.getState().addedCard)
    const [addCard, setAddCard] = useState(false)
    const [firstTicket, setFirstTicket] = useState(store.getState().tickets > 1)


    // useEffect(() => {
        
    //     setVerfied(state.verified)
    //     setBvnAdded(state.bvnAdded)
    // }, [store, state])
    


    const modalBtnClickHandler = () => {
        setShow(false)
        setAddCard(false)
    }

    const closeHandler = (a) => {
        setShow(!a)
        setShowReview(a)
    }

    const getMealTicket = () => {
        console.log(bvnAdded)
        console.log(verified)
        if(!bvnAdded){
            setShow(true)
        }else{

            if(!addedCard && !firstTicket && verified){
                setAddCard(true);
            }
        }
    }

    const payback = () => {
        if(!bvnAdded){
            setShow(true)
        }else{
            if(!addedCard && !firstTicket && verified){
                setAddCard(true);
            }
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
            <DModal 
                show={showReview} 
                modalBody={'Your account is under review <br/>You will be contacted within in next 24hrs'}
                headerText={'Under Review'}
                onClick={modalBtnClickHandler}
                footer={true}
            />
            <AddCard show={addCard} onClick={modalBtnClickHandler}/>
        </div>
    </Fragment>
  )
}

export default Dashboard

import { useDispatch, useSelector, useStore } from 'react-redux';
import React, { Fragment, useEffect, useState } from 'react'
import { verifyBVN, getLatestState, getTransactionStatus } from '../../actions/userActions';
import { getMealTicket, getUserTickets } from '../../actions/mealActions';
import BottomMenu from './BottomMenu'
import CreditBalance from './CreditBalance'
import Header from './Header'
import MealTicket from './MealTicket'
import DModal from '../UI/DModal'
import Transactions from './Transactions'
import AddCard from '../userRegistration/AddCard'
import { Modal } from 'react-bootstrap';
import QRCode from 'qrcode.react'

import PlainForm from './PlainForm'
import './Dashboard.css'
import MealTicketModal from './MealTicketModal';
import { useAlert } from 'react-alert';

const Dashboard = () => {
    
    const store = useStore();
    const state = useSelector(state => state)
    const alert = useAlert()
    const dispatch = useDispatch();
    const [verified, setVerfied] = useState()
    const [bvnAdded, setBvnAdded] = useState()
    const [availBal, setAvailable] = useState()
    const [showReview, setShowReview] = useState(false)
    const [showVoucher, setShowVoucher] = useState(false)
    const [show, setShow] = useState(false)
    const [addedCard, setAddedCard] = useState()
    const [addCard, setAddCard] = useState(false)
    const [firstTicket, setFirstTicket] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getTransactionStatus(localStorage.getItem('completeToken')))
            await dispatch(getLatestState(localStorage.getItem('completeToken')));
            await dispatch(getUserTickets(localStorage.getItem('completeToken')));           

            const state1 = store.getState()
            await localStorage.setItem('dashData', JSON.stringify(state1.dashData))

            setVerfied(JSON.parse(localStorage.getItem('dashData')).verified)
            setBvnAdded(JSON.parse(localStorage.getItem('dashData')).bvnAdded)
            setAvailable(JSON.parse(localStorage.getItem('dashData')).availBal)
            setAddedCard(JSON.parse(localStorage.getItem('dashData')).addedCard)
            setFirstTicket(JSON.parse(localStorage.getItem('Tickets').length)> 1)
        }
        fetchData();

    }, [])
    


    const modalBtnClickHandler = () => {
        setShow(false)
        setShowReview(false)
        setAddCard(false)
        window.location.reload();

    }

    const closeHandler = (a) => {
        setShow(!a)
        setShowReview(a)
    }

    const getMealTicket1 = async () => {
        if(!JSON.parse(localStorage.getItem('dashData')).bvnAdded){
            setShow(true)
        }else{
            if(!verified){
               return setShowReview(true);
            }
            if(!addedCard && !firstTicket){
                setAddCard(true)
            }
            try {

                console.log('clicked')
                const tickets = JSON.parse(localStorage.getItem('Tickets')).reverse();

                if (tickets.length > 1){
                    const dateCreated = new Date(tickets[0].createdAt).getDate();
                    if(dateCreated != new Date(Date.now()).getDate() && tickets.length>1){
                        await dispatch(getMealTicket(localStorage.getItem('completeToken'), '500'))
                    }else{
                        return alert.error('You already got a ticket today')
                    }
                }else {
                
                    await dispatch(getMealTicket(localStorage.getItem('completeToken'), '500'))
                }
                    

                setShowVoucher(true)
            } catch(err){
                console.log(err)
            }
        }
    }

    const payback = () => {
        if(!JSON.parse(localStorage.getItem('dashData')).bvnAdded){
            setShow(true)
        }else{
            console.log(verified)
            if(!verified){
               return setShowReview(true);
            }
            console.log(addedCard)
            if(!addedCard){
                console.log('Hello')
                setAddCard(true)
            }
        }
    }

    const close = () => {
        
        setShowVoucher(false)
        
        setAddCard(false)

        window.location.reload();

    }

    const downloadQR = () => {
        const canvas = document.getElementById("ticket-qr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `MealTicket-${Date.now()}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        window.location.reload();
      };

  return (
    <Fragment>
        <Header image={true} imgSrc={'logo.png'} style={{width: '5rem', marginLeft: '1.5rem'}} heading='Dashboard' classes={'dashboard-header'}/>
  
        <div className='d-flex flex-column'style={{marginTop: '7rem', width: '100%'}}>
            <div style={{padding: '1rem'}}>
                <CreditBalance availBal={availBal} />
                <MealTicket getMealTicket={getMealTicket1} payback={payback}/>
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
                modalBody={<p>Your account is under review.<br/>You will be contacted within in next 24hrs</p>}
                headerText={'Under Review'}
                onClick={modalBtnClickHandler}
                footer={true}
            />
           

            <Modal show={showVoucher} centered>
                <Modal.Header>
                    Here's your meal ticket
                </Modal.Header>
                <Modal.Body>
                    <QRCode id='ticket-qr' level='H' value={`${store.getState().ticketId}`}/>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={downloadQR} className='btn'>Download</button>
                    <button onClick={close} className='btn'>Close</button>
                </Modal.Footer>
            </Modal>
            
            <AddCard onClose={close} show={addCard} onClick={modalBtnClickHandler}/>
        </div>
    </Fragment>
  )
}

export default Dashboard

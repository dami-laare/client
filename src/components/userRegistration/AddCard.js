import React, {useState, useEffect} from 'react';
import {useDispatch, useStore} from 'react-redux';
import { useAlert } from 'react-alert';
import {
    CardNumber,
    CardSecurityCode,
    ValidThruMonth,
    ValidThruYear,
  } from "reactjs-credit-card/form";
import Card from "reactjs-credit-card/card";
import ReactCodeInput from 'react-code-input'
import Button from '../UI/Button';
import { Modal } from 'react-bootstrap';
import { useCardForm } from 'reactjs-credit-card';
import { addCard } from '../../actions/userActions';
import { useNavigate, } from 'react-router-dom';


const style = {
    fontFamily: 'monospace',
    margin:  '2px',
    MozAppearance: 'textfield',
    width: '1.5rem',
    height: '1.8rem',
    borderRadius: '5px',
    fontSize: '0.9rem',
    fontWeight: 600,
    paddingLeft: 'calc(1rem - 11px)',
    backgroundColor: 'white',
    color: '#000',
    border: '2px solid #00000050',

  }

const AddCard = ({show, onClick, onClose}) => {
    const [cardShow, setCardShow] = useState(show)
  const [loading, setLoading ] = useState(false)
  const [pin, setPin] = useState('')
    const getFormData = useCardForm()
    const store = useStore();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert()

    useEffect(() => {
        setCardShow(show)
    }, [show])

    const pinChangeHandler = (e) => {
        setPin(e)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        const [data, isValid] = getFormData()

        if(data.number.isValid) {
            let state = store.getState();

       
            await dispatch(addCard(data.number.value, data.validMonth.value, data.validYear.value, data.securityCode.value, pin, localStorage.getItem('completeToken')))
            
            state = store.getState();

            if(state.error) {
                setCardShow(false)
                setLoading(false)
                return alert.error(state.error);
        }
            window.location.replace(`${state.checkoutUrl}`)
            setCardShow(false)
            setLoading(false)

        }
    }
    return (
        <Modal show={cardShow} centered >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter f-600">
                        Add Card
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='px-3'>
                    <Card fixClass='w-50'/>
                    <form onSubmit={submitHandler}>
                        <CardNumber className='form-control my-3' placeholder="Card Number" />
                        <ValidThruMonth className='form-control mb-3'></ValidThruMonth>
                        <ValidThruYear className='form-control mb-3' />
                        <CardSecurityCode placeholder="CVV" className=" mb-3 form-control input-text semi" />
                        <p className='text-dark d-inline me-5'>PIN</p>
                        <ReactCodeInput 
                            type='password'
                            fields={4}
                            onChange={pinChangeHandler}
                            inputStyle={style}
                            className='pin mb-3'
                        />
                        <div className='w-100 d-flex justify-content-between'>
                            
                            <button type='submit' className='btn'>{loading ? <i class="loading text-white fas fa-circle-notch" ></i> : 'Upgrade Account'}</button>
                            <button onClick={() => {setCardShow(false); onClose()}} className='btn'>Close</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <p className='text-dark'style={{fontSize: '0.7rem'}}>*N50 will be debited from your account to verify your card. This amount will be refunded in 48 hours.</p>
                </Modal.Footer>        
            </Modal>
    )
}

export default AddCard

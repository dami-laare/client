import React, {useState} from 'react';
import {useDispatch, useStore} from 'react-redux';
import { useAlert } from 'react-alert';
import {
    CardHolder,
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


const style = {
    fontFamily: 'monospace',
    margin:  '4px',
    MozAppearance: 'textfield',
    width: '2.5rem',
    height: '3rem',
    borderRadius: '10px',
    fontSize: '1.2rem',
    fontWeight: 600,
    paddingLeft: 'calc(1.5rem - 10px)',
    backgroundColor: 'white',
    color: '#FF611D',
    border: '1px solid #c7663ccb',

  }

const AddCard = ({show, onClick}) => {
    const [cardShow, setCardShow] = useState(show)
    const getFormData = useCardForm()
    const store = useStore();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        const [data, isValid] = getFormData()

        if(isValid) {
            let currState = store.getState();
       
            dispatch(addCard(data.number.value, data.validMonth.value, data.validYear.value, data.securityCode.value, currState.token))
            
            currState = store.getState();

            if(currState.error) {
                return alert.error(currState.error);
            }
            setCardShow(false)

        }
    }
    return (
        <Modal show={show} centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter f-600">
                        Add Card
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card />
                    <form>
                        <CardNumber className='form-control my-3' placeholder="Card Number" />
                        <CardHolder className='form-control mb-3' placeholder="Card Holder" />
                        <ValidThruMonth className='form-control mb-3'></ValidThruMonth>
                        <ValidThruYear className='form-control mb-3' />
                        <CardSecurityCode placeholder="CVV" className=" mb-3 form-control input-text semi" />
                        <ReactCodeInput 
                            type='password'
                            fields={6}
                            // onChange={pinChangeHandler}
                            inputStyle={style}
                            className='pin'
                        />
                        <button className='btn'>Submit</button>
                    </form>
                </Modal.Body>           
            </Modal>
    )
}

export default AddCard

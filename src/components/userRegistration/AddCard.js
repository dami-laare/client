import React from 'react'
import ({useDispatch, useStore}) from 'react-redux';
import ({ useAlert }) from 'react-alert'
import {
    CardHolder,
    CardNumber,
    CardSecurityCode,
    ValidThruMonth,
    ValidThruYear,
  } from "reactjs-credit-card/form";
import Card from "reactjs-credit-card/card";
import Button from '../UI/Button'
import { Modal } from 'react-bootstrap'
import { useCardForm } from 'reactjs-credit-card';


const AddCard = ({addCard, onClick}) => {
    const getFormData = useCardForm()
    const store = useStore();
    const dispatch = useDispatch();

    const submitHandler = async (e) {
        e.preventDefault();

        const [data, isValid] = getFormData()

        if(isValid) {
            let currState = store.getState();
       
            dispatch(addCard(data.number.value, data.validMonth.value, data.validYear.value, data.securityCode.value, currState.token)
            
            currState = store.getState();

            if(currState.error) {
                return alert.error(currState.error);
            }

        }
    }
    return (
        <Modal show={addCard} centered>
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
                        <button className='btn'>Submit</button>
                    </form>
                </Modal.Body>
                {/* <Modal.Footer className='row'>
                    <div className='col-5'>
                        <Button btnText='Got It!' onClick={onClick}/>
                    </div>
                </Modal.Footer>
             */}
                
            </Modal>
    )
}

export default AddCard

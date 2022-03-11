import React, { Fragment } from 'react'
import { Modal } from 'react-bootstrap';
import QRCode from 'react-qr-code';


const MealTicketModal = ({show, onClose, value}) => {
  return (
    <Fragment>
        <Modal show={show}>
            <Modal.Header>
                Here's your meal ticket
            </Modal.Header>
            <Modal.Body>
                <QRCode size={200} level={'H'} value='Hello'/>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={onClose(true)} className='btn'>Close</button>

            </Modal.Footer>
        </Modal>
    </Fragment>
  )
}

export default MealTicketModal
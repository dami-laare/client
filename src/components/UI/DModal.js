import React from 'react'
import Button from '../UI/Button'
import { Modal } from 'react-bootstrap'

const DModal = ({show, headerText, modalBody, onClick, footer}) => {
    
  return (
    <Modal show={show} centered>
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter f-600">
                {headerText}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>{modalBody}</div>
        </Modal.Body>
        {footer && (
            <Modal.Footer className='row'>
                <div className='col-5'>
                    <Button btnText='Got It!' onClick={onClick}/>
                </div>
            </Modal.Footer>
        )}
        
    </Modal>
  )
}

export default DModal
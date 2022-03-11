import React, { useState, Fragment } from 'react'
import { QrReader } from 'react-qr-reader';
import { useAlert } from 'react-alert';
import { useDispatch, useStore } from 'react-redux'
import Header from '../UI/Header'
import {verifyTicket} from '../../actions/adminActions'

const ScanQr = () => {

    const store = useStore();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [id, setId] = useState('');
    const [value, setValue] = useState('')
    
    const verify = async () => {
        await dispatch(verifyTicket(id));

        const state = store.getState()

        if (state.error) {
            return alert.error(state.error)
        }

        setValue(state.value)

        alert.info(state.message)
    }

    return (
        <Fragment>
            <Header image={true} imgSrc={`${process.env.PUBLIC_URL}/logo.png`}/>

            <div className='text-center my-auto w-75 d-flex flex-column px-3'>
                <QrReader
                    className='mb-4'
                    constraints={{facingMode: 'environment'}}
                    onResult={(result, error) => {
                    if (!!result) {
                        setId(result.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                    }}
                    style={{ width: '100%' }}
                />
                {id && (
                    <div>
                        <p>Ticket:<br/>{id}</p>
                        <p>Value:<br/>{value}</p>
                        <button onClick={verify} className='btn'>Verify Ticket</button>
                    </div>
                )}
                
            </div>
        </Fragment>
    )
}

export default ScanQr
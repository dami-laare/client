import React, { useState, Fragment } from 'react'
import { QrReader } from 'react-qr-reader';


const ScanQr = () => {

    const [id, setId] = useState();
    return (
        <Fragment>
            <div className='w-75 d-flex flex-column px-3'>
                <QrReader
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
                <p>{id}</p>
            </div>
        </Fragment>
    )
}

export default ScanQr
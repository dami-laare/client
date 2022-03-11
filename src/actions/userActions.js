import axios from "axios";

export const submitInviteCode = (inviteCode) => async function(dispatch) {
    try{
        dispatch({
            type: 'LOADING'
        })

        const { data } = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/invite/validate/${inviteCode}`)


        dispatch({
            type: 'SUCCESS',
            payload: {...data, token:'Allowed'}
        })

        await localStorage.setItem('inviteAllowed', 'true')

    }catch(error) {
        dispatch({
            type: 'FAIL',
            payload: {error: error.response.data.message}
        })

        localStorage.clear()
    }
}

export const registerUser = (phone, name, email,address) => async function(dispatch) {
    try{
        dispatch({
            type: 'LOADING'
        })

        const { data } = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/user/register`, {
            phone,
            name,
            email,
            address
        })

        await localStorage.setItem('registerToken', data.token)


        dispatch({
            type: 'SUCCESS',
            payload: {...data}
        })



    }catch(error) {
        dispatch({
            type: 'FAIL',
            payload:{ error:error.response.data.message}
        })
    }
}

export const resendOTP = () => async function(dispatch) {
    try{
        dispatch({
            type: 'LOADING'
        })

        const { data } = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/resend`, {token: localStorage.getItem('registerToken')})



        dispatch({
            type: 'SUCCESS',
            payload: {...data}
        })



    }catch(error) {
        dispatch({
            type: 'FAIL',
            payload:{ error:error.response.data.message}
        })
    }
}

export const verifyOTP = (otp, token) => async function(dispatch) {
    try{

        dispatch({
            type: 'LOADING'
        })

        const {data} = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/otp/verify`,{
            otp,
            token
        })

        dispatch({
            type: 'SUCCESS',
            payload: {...data, token}
        })
        
        await localStorage.setItem('registerToken', data.token)

    }catch(err){
        console.log(err)
        dispatch({
            type: 'FAIL',
            payload: {error: err.response.data.message, token}
        })
    }
}

export const addPin = (pin, token) => async function(dispatch){
    try{

        dispatch({
            type: 'LOADING'
        })

        const {data} = await axios.put(`https://test-getfungry.herokuapp.com/api/v1/user/pin/new`,{
            pin,
            token
        })

        dispatch({
            type: 'SUCCESS',
            payload: {...data, token}
        })

        
        await localStorage.setItem('completeToken', data.token)
        await localStorage.setItem('dashData', JSON.stringify(data.dashData))



    }catch(err){
        console.log(err)
        dispatch({
            type: 'FAIL',
            payload: {error: err.response.data.message, token}
        })
    }   
}

export const verifyBVN = (bvn, dob, token) => async function(dispatch){
    try{

        dispatch({
            type: 'LOADING'
        })

        const {data} = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/bvn/verify`,{
            bvn,
            dob,
            token
        })

        dispatch({
            type: 'SUCCESS',
            payload: {...data, token}
        })

        const dashData = JSON.parse(localStorage.getItem('dashData'))

        dashData.bvnAdded = true

        localStorage.setItem('dashData', JSON.stringify(dashData))

    }catch(err){
        console.log(err)
        dispatch({
            type: 'FAIL',
            payload: {error: err.response.data.message, token}
        })
    }   
}

export const addCard = (cardNo, expMnth, expYr, cvv, pin, token) => async function(dispatch){
    try{

        dispatch({
            type: 'LOADING'
        })

        const {data} = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/user/add-card`,{
            cardNo,
            expMnth,
            expYr,
            cvv,
            pin,
            token
        })

        dispatch({
            type: 'ADD_CARD_SUCCESS',
            payload: {...data, token}
        })

    }catch(err){
        dispatch({
            type: 'FAIL',
            payload: {error: err.response.data.message, token}
        })
    }   
}

export const getTransactionStatus = (token) => async function(dispatch){
    try{

        dispatch({
            type: 'LOADING'
        })

        const {data} = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/transaction/status`,{
            token
        })

        dispatch({
            type: 'TRANSACTION_STATUS_SUCCESS',
            payload: {...data}
        })

    }catch(err){
        console.log(err)
        dispatch({
            type: 'FAIL',
            payload: {error: err.response.data.message, token}
        })
    }   
}

export const login = (phone, pin) => async function(dispatch){
    try{

        dispatch({
            type: 'LOADING'
        })

        const {data} = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/user/login`,{
            phone,
            pin,
        })

        dispatch({
            type: 'SUCCESS',
            payload: {...data}
        })

        localStorage.setItem('completeToken', data.token)
        localStorage.setItem('dashData', JSON.stringify(data.dashData))

    }catch(err){
        console.log(err)
        dispatch({
            type: 'FAIL',
            payload: {error: err.response.data.message}
        })
        localStorage.clear()
    }
}

export const getLatestState = (token) => async function(dispatch){
    try{

        dispatch({
            type: 'LOADING'
        })

        const {data} = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/user/latest`,{
            token
        })

        dispatch({
            type: 'LATEST',
            payload: {...data}
        })



    }catch(err){
        console.log(err)
    }
}

export const logout = (token) => async function(dispatch){
    try{

        dispatch({
            type: 'LOADING'
        })

        const {data} = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/user/logout`,{
            token
        })

        dispatch({
            type: 'LOGOUT',
        })
        localStorage.clear()


    }catch(err){
        console.log(err)
        dispatch({
            type: 'FAIL',
            payload: {error: err.response.data.message}
        })
        localStorage.clear()
    }
}

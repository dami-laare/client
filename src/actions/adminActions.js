import axios from "axios";


export const generateToken = () => async (dispatch) => {
    try{
        dispatch({
            type: 'LOADING'
        })

        const { data } = await axios.get(`https://test-getfungry.herokuapp.com/api/v1/admin/generate`)


        dispatch({
            type: 'TOKEN_SUCCESS',
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

export const verifyUser = (id) => async (dispatch) => {
    try{
        dispatch({
            type: 'LOADING'
        })

        const { data } = await axios.post(`https://test-getfungry.herokuapp.com/api/v1/admin/verify`, {
            id
        })


        dispatch({
            type: 'VERIFY',
            payload: {...data}
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
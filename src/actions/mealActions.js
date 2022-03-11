import axios from 'axios';


export const getMealTicket = (token, value) => async (dispatch) => {
    try {
        dispatch({
            type:"GETTING_MEAL_TICKET"
        })

        const {data} = await axios.post(`http://localhost:4000/api/v1/ticket`, {token, value});

        console.log(data)

        dispatch({
            type: 'MEAL_TICKET_SUCCESS',
            payload: data.newTicket._id
        })


    } catch(err){
        console.log(err)
    }
}
export const getUserTickets = (token) => async (dispatch) => {
    try {
        dispatch({
            type:"LOADING"
        })

        const {data} = await axios.post(`http://localhost:4000/api/v1/user/tickets`, {token});


        dispatch({
            type: 'ALL_TICKET_SUCCESS',
            payload: data.tickets
        })

        await localStorage.setItem('Tickets', JSON.stringify(data.tickets))


    } catch(err){
        console.log(err)
    }
}
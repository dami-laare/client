import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';


let initialState = {};

const reducer = (state = initialState,  action) => {
    switch(action.type){
        case 'LOADING':
            return {
                ...state,
                verified: state.verified,
                token: state.token,
                'loading': true,
                'success': null,
                details: state.details,
                bvnAdded: store.bvnAdded,
                addedCard: store.addedCard,
                tickets: store.tickets
            }
        case 'SUCCESS':
            return {
                'loading': false,
                'success': action.payload.success,
                'token': action.payload.token,
                verified: action.payload.verified,
                details: action.payload.details,
                addedCard: action.payload.addedCard,
                bvnAdded: action.payload.bvnAdded,
                tickets: action.payload.tickets
            }

        case 'FAIL':
            return {
                'loading': false,
                'success': false,
                'error': action.payload.error,
                token: action.payload.token,
                verified: state.verified,
                details: state.details,
                addedCard: store.addedCard,
                bvnAdded: store.bvnAdded,
                tickets: store.tickets
            }
        case 'LOGOUT':
            return initialState 

        case 'TOKEN_SUCCESS':
            return {
                loading: false,
                success: true,
                token: action.payload.code
            }

        case 'VERIFY':
            return {
                loading: false,
                success: true,
                message: action.payload.message,
                value: action.payload.ticket.value
            }

        case 'LATEST':
            return {
                ...state,
                dashData: action.payload.dashData
            }
        case 'ADD_CARD_SUCCESS':
            return {
                ...state,
                checkoutUrl: action.payload.checkoutUrl
            }
        
        case 'TRANSACTION_STATUS_SUCCESS':
            return{
                ...state,
                transactionStatus: action.payload.status
            }

        case 'GETTING_MEAL_TICKET':
            return {
                ...state,
                loading: true
            }

        case 'MEAL_TICKET_SUCCESS':
            return {
                ...state,
                loading:false,
                success: true,
                ticketId: action.payload
            }

        case 'ALL_TICKET_SUCCESS':
            return {
                ...state,
                loading:false,
                success: true,
                tickets: action.payload
            }
        default:
            return state
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

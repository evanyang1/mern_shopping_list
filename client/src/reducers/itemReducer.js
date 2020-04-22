//import {v1 as uuid} from 'uuid'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types'

const initialState = {
    items: [],
    loading: false // once we make the request, set to true; once we get the data back, set to false again
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload, // b/c items = [] initially
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload) //action.payload = id
            }
        case ADD_ITEM: 
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default: 
            return state
    }
}
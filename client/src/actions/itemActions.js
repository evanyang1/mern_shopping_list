import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'
import axios from 'axios'

export const getItems = () => dispatch => {
    dispatch(setItemsLoading())
    axios  
        .get('/api/items') // proxy so we don't need to do the full http localhost url
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
}

export const addItem = item => dispatch => {
    axios
        .post('/api/items', item)
        .then(res => 
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            }))
}


export const deleteItem = id => dispatch => {
    axios.delete(`/api/items/${id}`).then(res => 
        dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
}



export const setItemsLoading = _ => {
    return {
        type: ITEMS_LOADING
    }
}

import axios from 'axios';
import { GET_LEADS, DELETE_LEAD, POST_LEAD } from './types';
import { createMessage, returnErrors} from './messages';

// http://localhost:8000/api/leads/
// GET LEADS: 
export const getLeads = () => dispatch => {

    axios.get('/api/leads/')
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status))); 
};
// DELETE LEAD: 
export const deleteLead = (id) => dispatch => {

    axios.delete(`/api/leads/${id}`)
        .then(res => {
            dispatch(createMessage({ deleteLead: "Lead Deleted"}));
            dispatch({
                type: DELETE_LEAD,
                payload: id
            });
        }).catch(err => console.log(err));
};

// POST LEAD 
export const postLead = lead => dispatch => {

    axios.post('/api/leads/', lead)
        .then(res => {
            dispatch(createMessage({ addLead: "Lead Added"}));
            dispatch({
                type: POST_LEAD,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status))); 
};
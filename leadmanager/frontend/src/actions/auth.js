import axios from "axios";
import { returnErrors } from './messages';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // user loading: 
    dispatch({ type: USER_LOADING });
    // get token from state
    const token = getState().auth.token;
    //headers:
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // jos token on, niin mukaan headeriin kuten postmanissa 
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })
}
// LOGIN USER: 
export const login = (username, password) => dispatch => {
    //headers:
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body:
    const body = JSON.stringify({ username, password });

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        })
}

// LOGOUT: 
export const logout = () => (dispatch, getState) => {
    // get token from state
    const token = getState().auth.token;
    //headers:
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // jos token on, niin mukaan headeriin kuten postmanissa 
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.post('/api/auth/logout/', null, config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
}
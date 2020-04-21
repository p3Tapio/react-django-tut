import axios from "axios";
import { returnErrors } from './messages';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // user loading: 
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
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
// REG USER: 
export const register = ({ username, email, password }) => dispatch => {
    //headers:
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body:
    const body = JSON.stringify({ username, email, password });

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
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



    axios.post('/api/auth/logout/', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
}
// functio headerin configin asettamiseen, jossa auth/token: 
export const tokenConfig = getState => {
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
    return config
}

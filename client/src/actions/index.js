import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// export const fetchUser = () => { //thunk will recoginize that action creator returned a function and auto call it with dispatch
//     return function(dispatch) { //auto forwards to reducers
//         axios.get('/api/current_user')
//             .then(res => dispatch({type: FETCH_USER, payload: res}));
// //dispatch action after response of api
//     }
// };

export const fetchUser = () => async dispatch => {     
    const res = await axios.get('/api/current_user')
        dispatch({type: FETCH_USER, payload: res.data});
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({type: FETCH_USER, payload: res.data});
};

//post request to backend
//response await a post request, values is data send to backend
export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    //navigate around with action creator after survey submitted
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: res.data });
}

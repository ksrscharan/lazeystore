import axios from 'axios'
import { setAccessToken } from '../reducers/accessTokenSlice'
export const handleLogout = (dispatch, navigate) => {
    axios
        .post(
            'http://localhost:3000/auth/logout',
            {},
            {
                withCredentials: true,
            }
        )
        .then((res) => {
            console.log('Logout successful:', res.data);

            dispatch(setAccessToken(null));

            navigate('/login');
        })
        .catch((error) => {
            console.error('Logout failed or server error:', error.message);

            dispatch(setAccessToken(null));
            navigate('/login');
        });
};

export const getNewAccessToken = (dispatch) => {
    axios
        .get('http://localhost:3000/auth/createAccessToken', {
            withCredentials: true,
        })
        .then((res) => {
            dispatch(setAccessToken(res.data.accessToken));
            // navigate('/');
        })
        .catch((e) => {
            console.log('Silent refresh failed:', e.message);
        });
};
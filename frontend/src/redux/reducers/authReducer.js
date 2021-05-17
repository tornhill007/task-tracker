import {authAPI} from "../../api/api";
import {reset} from "redux-form";
// import {stopSubmit} from "redux-form"

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

let initialState = {
    userId: null,
    userName: null,
    token: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};


export const setAuthUserData = (userId, userName, token) => ({
    type: SET_AUTH_USER_DATA,
    data: {userId, userName, token}
});

// export const getAuthUserData = () => async (dispatch) => {
//     let response = await authAPI.me();
//     console.log(response);
//     if (response.data.resultCode === 0) {
//         let {id, email, login} = response.data.data;
//         dispatch(setAuthUserData(id, email, login, true));
//     }
// };

export const login = (password, userName) => async (dispatch) => {
    try {
        let response = await authAPI.login(password, userName);
        console.log("response", response)
        console.log(response);
        if (response.statusText === 'OK') {
            dispatch(reset('register'))
            // dispatch(getAuthUserData());
            let {userId, userName, token} = response.data;
            dispatch(setAuthUserData(userId, userName, token));
            let user = {
                userId,
                userName,
                token,
                timestamp: Date.now()
            }
            window.localStorage.setItem("user", JSON.stringify(user))
        }
        else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            // dispatch(stopSubmit("login", {_error: message}))
        }
    }
    catch (err) {
        alert(err.response.data.message);
    }

};

export const register = (password, userName, repeatPassword) => async (dispatch) => {
    try {
        if(password === repeatPassword) {
            let response = await authAPI.register(password, userName);
            console.log("123", response);
            if (response.statusText === 'OK') {
                dispatch(reset('register'))
                alert('you have registered')
            } else {

                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                alert(message);

                // dispatch(stopSubmit("login", {_error: message}))
            }
        }
        else {
            alert("Password mismatch")
        }

    } catch (err) {
        alert(err.response.data.message);
    }

};

// export const logout = (email, password, rememberMe) => async (dispatch) => {
//     let response = await authAPI.logout(email, password, rememberMe);
//     console.log(response);
//     if (response.data.resultCode === 0) {
//         dispatch(setAuthUserData(null, null, null, false));
//     }
// };

export default authReducer;
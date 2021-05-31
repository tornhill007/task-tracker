import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import authReducer from "./reducers/authReducer";
import { reducer as formReducer } from 'redux-form';
import projectsReducer from "./reducers/projectsReducer";
import columnsReducer from "./reducers/columnsReducer";
import usersReducer from "./reducers/usersReducer";


let reducers = combineReducers({
    auth: authReducer,
    projectsPage: projectsReducer,
    columnsPage: columnsReducer,
    usersPage: usersReducer,
    form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
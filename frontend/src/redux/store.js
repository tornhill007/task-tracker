import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import authReducer from "./reducers/authReducer";
import { reducer as formReducer } from 'redux-form';
import projectsReducer from "./reducers/projectsReducer";
import columnsReducer from "./reducers/columnsReducer";


let reducers = combineReducers({
    auth: authReducer,
    projectsPage: projectsReducer,
    columnsPage: columnsReducer,
    form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
//     applyMiddleware(thunkMiddleware)
// ));

export default store;
import {authAPI, columnsApi as columnsAPI} from "../../api/api";
import {reset} from "redux-form";
// import {stopSubmit} from "redux-form"
import {sortByPosition} from '../../utils/sort'

const SET_COLUMNS = 'SET_COLUMNS';
const SET_COLUMN_ORDER = 'SET_COLUMN_ORDER';
const ON_DRAG_END = 'ON_DRAG_END';

let initialState = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Take out the garbage'},
        'task-2': {id: 'task-2', content: 'qqqqqqqqqqqqqqqqq'},
        'task-3': {id: 'task-3', content: 'wwwwwwwwwwwwwwwwwwwwwwwwww'},
        'task-4': {id: 'task-4', content: 'eeeeeeeeeeeeeeeeeee'},
    },
    columns: {},
    columnOrder: []
};

const columnsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COLUMNS:
            let columnsArr = action.columns.map((column, index) => {
                return {
                    id: `column-${column.columnid}`,
                    name: column.name,
                    taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
                    position: column.position,
                    columnId: column.columnid
                }
            })
            let columnsObj = {};
            let columnsOrder = [];
            columnsArr.forEach(key => {
                columnsObj[key.id] = key;
                columnsOrder.push({
                    id: key.id,
                    position: key.position
                })
            });

            console.log("columnsArr", columnsArr);

            sortByPosition(columnsOrder);
            let columnsOrderFinish = columnsOrder.map(column => column.id)
            console.log("columnsOrder", columnsOrderFinish);
            console.log("columnsObj", columnsObj);

            console.log(action.columns)
            return {
                ...state,
                columns: columnsObj,
                columnOrder: columnsOrderFinish
            };
        case ON_DRAG_END:
            const {destination, source, draggableId, type} = action.result;

            if (!destination) {
                return;
            }

            if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
            ) {
                return;
            }


            if(type === 'column') {
                const newColumnOrder = Array.from(state.columnOrder);
                console.log("newColumnOrder", newColumnOrder)
                console.log("source.index", source.index)
                console.log("destination.index", destination.index)
                newColumnOrder.splice(source.index, 1);
                newColumnOrder.splice(destination.index, 0, draggableId);

                const newState = {
                    ...state,
                    columnOrder: newColumnOrder
                }
                return newState;
            }

            const start = this.state.columns[source.droppableId];
            const finish = this.state.columns[destination.droppableId];

            if (start === finish) {
                const newTaskIds = Array.from(start.taskIds);
                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, draggableId);

                const newColumn = {
                    ...start,
                    taskIds: newTaskIds,
                };

                const newState = {
                    ...state,
                    columns: {
                        ...state.columns,
                        [newColumn.id]: newColumn,
                    },
                };

                return newState;
            }

            // Moving from one list to another
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds,
            };

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds,
            };

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            };
            return newState;
        default:
            return state;
    };

};

export const setColumns = (columns) => ({
    type: SET_COLUMNS,
    columns
})

export const onDragEnd = (result) => ({
    type: ON_DRAG_END,
    result
})
//
// export const setColumnOrder = (columns) => ({
//     type: SET_COLUMN_ORDER,
//     columns
// })

export const getColumns = (projectId) => async (dispatch) => {
    let response = await columnsAPI.getColumns(projectId);
    console.log("response11", response);
    dispatch(setColumns(response.data));
};

// export const setProjects = (projects) => ({
//     type: SET_ALL_PROJECTS,
//     projects
// });

// export const getAuthUserData = () => async (dispatch) => {
//     let response = await authAPI.me();
//     console.log(response);
//     if (response.data.resultCode === 0) {
//         let {id, email, login} = response.data.data;
//         dispatch(setAuthUserData(id, email, login, true));
//     }
// };
//
// export const login = (password, userName) => async (dispatch) => {
//     try {
//         let response = await authAPI.login(password, userName);
//         console.log(response);
//         if (response.statusText === 'OK') {
//             dispatch(reset('register'))
//             // dispatch(getAuthUserData());
//             let {userId, userName, token} = response.data;
//             dispatch(setAuthUserData(userId, userName, token));
//             let user = {
//                 userId,
//                 userName,
//                 token,
//                 timestamp: Date.now()
//             }
//             window.localStorage.setItem("user", JSON.stringify(user))
//         }
//         else {
//             let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
//             // dispatch(stopSubmit("login", {_error: message}))
//         }
//     }
//     catch (err) {
//         alert(err.response.data.message);
//     }
//
// };
//
// export const register = (password, userName, repeatPassword) => async (dispatch) => {
//     try {
//         if(password === repeatPassword) {
//             let response = await authAPI.register(password, userName);
//             console.log("123", response);
//             if (response.statusText === 'OK') {
//                 dispatch(reset('register'))
//                 alert('you have registered')
//             } else {
//                 alert(2)
//                 let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
//                 alert(message);
//
//                 // dispatch(stopSubmit("login", {_error: message}))
//             }
//         }
//         else {
//             alert("Password mismatch")
//         }
//
//     } catch (err) {
//         alert(err.response.data.message);
//     }
//
// };

// export const logout = (email, password, rememberMe) => async (dispatch) => {
//     let response = await authAPI.logout(email, password, rememberMe);
//     console.log(response);
//     if (response.data.resultCode === 0) {
//         dispatch(setAuthUserData(null, null, null, false));
//     }
// };

export default columnsReducer;
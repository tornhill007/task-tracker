import {
    authAPI,
    columnsApi,
    projectsApi, tasksAPI,
} from "../../api/api";
import {reset} from "redux-form";
// import {stopSubmit} from "redux-form"
import {sortByPosition} from '../../utils/sort'

const SET_COLUMNS = 'SET_COLUMNS';
const SET_COLUMN_ORDER = 'SET_COLUMN_ORDER';
const ON_DRAG_END = 'ON_DRAG_END';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const CHANGE_IS_INPUT = 'CHANGE_IS_INPUT';
const UPDATE_COLUMN = 'UPDATE_COLUMN';
const SET_ALL_TASKS = 'SET_ALL_TASKS';
const SET_TASK_INFO = 'SET_TASK_INFO';
const CLOSE_TASK_INFO = 'CLOSE_TASK_INFO';

let initialState = {
    isInput: false,
    isOpen: false,
    content: null,
    taskInfo: null,
    isTaskInfo: false,
    tasks: {
        // 'task-1': {id: 'task-1', content: 'Take out the garbage'},
        // 'task-2': {id: 'task-2', content: 'qqqqqqqqqqqqqqqqq'},
        // 'task-3': {id: 'task-3', content: 'wwwwwwwwwwwwwwwwwwwwwwwwww'},
        // 'task-4': {id: 'task-4', content: 'eeeeeeeeeeeeeeeeeee'},
    },
    columns: {},
    columnOrder: []
};

const columnsReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                content: action.content
            };
        case CHANGE_IS_INPUT:
            return {
                ...state,
                isInput: !state.isInput
            };
            case SET_TASK_INFO:
                console.log("taskInfo", action.taskInfo)
            return {
                ...state,
                taskInfo: action.taskInfo,
                isTaskInfo: true
            };
                case CLOSE_TASK_INFO:
            return {
                ...state,
                isTaskInfo: false
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false
            };
        case SET_ALL_TASKS:
            let newTasks = {};

            console.log("STATE>COLUMNS", state.columns)
            let newTasksArr = action.tasks.map((task, index) => {
                return {
                    id: `task-${task.taskid}`,
                    taskid: task.taskid,
                    content: task.taskname,
                    columnid: task.columnid,
                    description: task.description,
                    users: task.users,
                    markers: task.markers,
                    projectid: task.projectid,
                    position: task.position
                }
            })
            newTasksArr.forEach((key,index) => {
                newTasks[key.id] = key;
            })
            console.log("newTasks", newTasks)
            return {
                ...state,
                tasks: newTasks
            };
        case SET_COLUMNS:
console.log("[11]", action.tasks);
console.log("[22]", action.columns);
            let columnsArr = action.columns.map((column, index) => {
                let taskSort = action.tasks.filter((task, index) => task.columnid == column.columnid);
                console.log("taskSort", taskSort);
                sortByPosition(taskSort);
                return {
                    id: `column-${column.columnid}`,
                    name: column.name,
                    // taskIds: ['task-5', 'task-6', 'task-7', 'task-8', 'task-9'],
                    taskIds: taskSort.map((item, index) => `task-${item.taskid}`),
                    position: column.position,
                    columnId: column.columnid
                }
            })
            // let tasksId = action.tasks.filter((task, index) => task.columnid == column.columnid);
            //
            // sortByPosition(tasksId);
            //
            // tasksId.map((item, index) => `task-${item.taskid}`)
            // console.log("SORTBYTASK", tasksId)
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


            if (type === 'column') {
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

            const start = state.columns[source.droppableId];
            const finish = state.columns[destination.droppableId];

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
    }
    ;

};

export const setColumns = (columns, tasks) => ({
    type: SET_COLUMNS,
    columns, tasks
})

export const setAllTasks = (tasks) => ({
    type: SET_ALL_TASKS,
    tasks
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

export const openModal = (content) => ({type: OPEN_MODAL, content});
export const closeModal = () => ({type: CLOSE_MODAL});
export const changeIsInput = () => ({type: CHANGE_IS_INPUT});
export const setTaskInfo = (taskInfo) => ({type: SET_TASK_INFO, taskInfo});
export const closeTaskInfo = () => ({type: CLOSE_TASK_INFO});


export const getColumns = (projectId) => async (dispatch) => {
    // alert(2)
console.log('222222222222222222')
    let response1 = await tasksAPI.getAllTasks(projectId);
    let response = await columnsApi.getColumns(projectId);
    console.log("[333333333333333333333333333]", response1)

    dispatch(setAllTasks(response1.data));

    dispatch(setColumns(response.data, response1.data));
    console.log("response11", response1);


};

export const getAllTasks = (projectId) => async (dispatch) => {
    // alert(2)
    let response = await tasksAPI.getAllTasks(projectId);

    console.log("response22222", response);
    dispatch(setAllTasks(response.data));
};

export const addNewTask = (taskName, columnId, projectId, position) => async (dispatch) => {

    let response = await tasksAPI.addNewTask(taskName, columnId, projectId, position);
    dispatch(getColumns(projectId));
    // console.log("response22222", response);
    // dispatch(setAllTasks(response.data));
};

export const onUpdateColumnsPosition = (newColumns, projectId) => async (dispatch) => {
    console.log("initialState.columns", initialState)

    let response = await columnsApi.updateColumnsPosition(newColumns)
    console.log("response", response);
    dispatch(getColumns(projectId));
};

export const onUpdateColumn = (id, name, projectId) => async (dispatch) => {
    // console.log("initialState.columns", initialState)

    let response = await columnsApi.updateColumn(id, name)
    console.log("response", response);
    dispatch(getColumns(projectId));
};

export const onRemoveColumn = (id, projectId) => async (dispatch) => {
    // console.log("initialState.columns", initialState)

    let response = await columnsApi.removeColumn(id)
    console.log("response", response);
    dispatch(getColumns(projectId));
};

export const createNewColumn = (name, projectListId, position) => async (dispatch) => {
    let response = await columnsApi.createNewColumn(name, projectListId, position)
    console.log("response", response);
    dispatch(getColumns(projectListId));
};

export const updateTaskName = (taskName, projectId, taskId) => async (dispatch) => {
    console.log("UPDATETASKNAME", taskName, projectId, taskId);
    let response = await tasksAPI.updateTaskName(taskName, projectId, taskId)
    console.log("response", response);
    dispatch(getColumns(projectId));
};

export const updateDescription = (taskDescription, projectId, taskId) => async (dispatch) => {
    console.log("UPDATETASKNAME", taskDescription, projectId, taskId);
    let response = await tasksAPI.updateTaskDescription(taskDescription, projectId, taskId)
    console.log("response", response);
    dispatch(getColumns(projectId));
};

export const addNewMarker = (markers, projectId, taskId) => async (dispatch) => {
    console.log("UPDATETASKNAME", markers, projectId, taskId);
    let response = await tasksAPI.addNewMarker(markers, projectId, taskId)
    console.log("response", response);
    dispatch(getColumns(projectId));
};

export const updateTasksPosAndColumnId = (tasksArr, projectId) => async (dispatch) => {
    console.log("UPDATE_TASKS_POSITION", tasksArr, projectId);
    let response = await tasksAPI.updateTasksPosAndColumnId(tasksArr, projectId)
    console.log("response", response);
    dispatch(getColumns(projectId));
};

export const removeTask = (taskId, projectId) => async (dispatch) => {
    // console.log("UPDATE_TASKS_POSITION", tasksArr, projectId);
    let response = await tasksAPI.removeTask(taskId, projectId)
    console.log("response", response);
    dispatch(getColumns(projectId));
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
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
const OPEN_FORM_FOR_NEW_COLUMN = 'OPEN_FORM_FOR_NEW_COLUMN';

let initialState = {
    isOpenFormNewColumn: false,
    isInput: false,
    isOpen: false,
    content: null,
    taskInfo: null,
    isTaskInfo: false,
    tasks: {},
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
        case OPEN_FORM_FOR_NEW_COLUMN:
            return {
                ...state,
                isOpenFormNewColumn: !state.isOpenFormNewColumn,
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
            newTasksArr.forEach((key, index) => {
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

export const openModal = (content) => ({type: OPEN_MODAL, content});
export const openFormForNewColumn = () => ({type: OPEN_FORM_FOR_NEW_COLUMN});
export const closeModal = () => ({type: CLOSE_MODAL});
export const changeIsInput = () => ({type: CHANGE_IS_INPUT});
export const setTaskInfo = (taskInfo) => ({type: SET_TASK_INFO, taskInfo});
export const closeTaskInfo = () => ({type: CLOSE_TASK_INFO});


export const getColumns = (projectId) => async (dispatch) => {
    try {
        let response = await columnsApi.getColumns(projectId);
        dispatch(setAllTasks(response.data.tasks));
        dispatch(setColumns(response.data.columns, response.data.tasks));
    } catch (e) {
        console.log(e)
    }
};

export const getAllTasks = (projectId) => async (dispatch) => {
    try {
        let response = await tasksAPI.getAllTasks(projectId);
        dispatch(setAllTasks(response.data));
    } catch (e) {
        console.log(e)
    }
};

export const addNewTask = (taskName, columnId, projectId, position) => async (dispatch) => {
    try {
        let response = await tasksAPI.addNewTask(taskName, columnId, projectId, position);
        dispatch(getColumns(projectId));
    } catch (e) {
        console.log(e)
    }

};

export const onUpdateColumnsPosition = (newColumns, projectId) => async (dispatch) => {
    try {
        let response = await columnsApi.updateColumnsPosition(newColumns)
        dispatch(getColumns(projectId));
    } catch (e) {
        console.log(e)
    }
};

export const onUpdateColumn = (id, name, projectId) => async (dispatch) => {
    try {
        let response = await columnsApi.updateColumn(id, name, projectId)
        dispatch(getColumns(projectId));
    } catch (e) {
        console.log(e);
    }
};

export const onRemoveColumn = (id, projectId) => async (dispatch) => {
    try {
        let response = await columnsApi.removeColumn(id, projectId)
        dispatch(getColumns(projectId));
    } catch (e) {
        console.log(e)
    }
};

export const createNewColumn = (name, projectListId, position) => async (dispatch) => {
    try {
        let response = await columnsApi.createNewColumn(name, projectListId, position)
        dispatch(getColumns(projectListId));
    } catch (e) {
        console.log(e)
    }
};

export const updateTaskName = (taskName, projectId, taskId) => async (dispatch) => {
    try {
        let response = await tasksAPI.updateTaskName(taskName, projectId, taskId)
        dispatch(getColumns(projectId));
    } catch (e) {
        console.log(e);
    }
};

export const updateDescription = (taskDescription, projectId, taskId) => async (dispatch) => {
    try {
        let response = await tasksAPI.updateTaskDescription(taskDescription, projectId, taskId)
        dispatch(getColumns(projectId));
    } catch (e) {
        console.log(e)
    }
};

export const addNewMarker = (markers, projectId, taskId) => async (dispatch) => {
    try {
        let response = await tasksAPI.addNewMarker(markers, projectId, taskId)
        dispatch(getColumns(projectId));
    } catch (e) {
        console.log(e)
    }
};

export const updateTasksPosAndColumnId = (tasksArr, projectId) => async (dispatch) => {
    try {
        let response = await tasksAPI.updateTasksPosAndColumnId(tasksArr, projectId)
        dispatch(getColumns(projectId));
    } catch (e) {
        console.log(e)
    }

};

export const removeTask = (taskId, projectId) => async (dispatch) => {
    try {
        let response = await tasksAPI.removeTask(taskId, projectId)
        dispatch(getColumns(projectId));
    } catch (e) {
        console.log(e)
    }
};

export default columnsReducer;
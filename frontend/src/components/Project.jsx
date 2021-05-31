import React, {useState} from 'react';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import classes from "./Projects.module.css";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import Columns from "./Columns/Columns";
import {connect} from "react-redux";
import {
    addNewTask,
    changeIsInput, createNewColumn, getAllTasks,
    getColumns,
    onDragEnd, onRemoveColumn, onUpdateColumn,
    onUpdateColumnsPosition, openFormForNewColumn,
    openModal, setTaskInfo, updateTasksPosAndColumnId
} from "../redux/reducers/columnsReducer";
import {columnsApi, usersApi} from "../api/api";
import EditModalContainer from "./Modal/EditModal/EditModalContainer";
import {getProjectName, getProjects} from "../redux/selectors/projectsSelector";
import TaskInfo from "./Tasks/TaskInfo/TaskInfo";
import {
    createNewProject, editProject,
    getAllProjects,
    setIsOpenInputEditProject,
    setIsOpenInviteList
} from "../redux/reducers/projectsReducer";
import {
    addToProject,
    getAllUsers,
    getParticipantsOnTask,
    leaveProject,
    removeFromProject
} from "../redux/reducers/usersReducer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTimes, faCheck, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {setAuthUserData} from "../redux/reducers/authReducer";
import {Redirect} from "react-router-dom";
import InviteList from "./InviteList";
import AutosizeInput from 'react-input-autosize';

// const initialData = {
//     tasks: {
//         'task-1': {id: 'task-1', content: 'Take out the garbage'},
//         'task-2': {id: 'task-2', content: 'qqqqqqqqqqqqqqqqq'},
//         'task-3': {id: 'task-3', content: 'wwwwwwwwwwwwwwwwwwwwwwwwww'},
//         'task-4': {id: 'task-4', content: 'eeeeeeeeeeeeeeeeeee'},
//     },
//     columns: {
//         'column-1': {
//             id: 'column-1',
//             name: 'Kek1',
//             taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
//         },
//         'column-2': {
//             id: 'column-2',
//             name: 'Kek2',
//             taskIds: []
//         },
//         'column-3': {
//             id: 'column-3',
//             name: 'Kek3',
//             taskIds: []
//         },
//         'column-4': {
//             id: 'column-4',
//             name: 'Kek4',
//             taskIds: []
//         },
//         'column-5': {
//             id: 'column-5',
//             name: 'Kek5',
//             taskIds: []
//         }
//     },
//     columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5']
// }
// let tasks = [
//     {
//         id: 1,
//         name: 'kek1'
//     },
//     {
//         id: 3,
//         name: 'kek2'
//     },
//     {
//         id: 2,
//         name: 'kek3'
//     },
// ]


class Project extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            // id: this.props.id,
            text: this.props.text,
            projectName: ''
        };

        this.changeText = this.changeText.bind(this);
        this.changeProjectName = this.changeProjectName.bind(this);
    }
    newRef = React.createRef();

    handleFocus = (event) => event.target.select();

    save(id) {
        const {projectName} = this.state;
        console.log(projectName)
        this.props.editProject(id, projectName, this.props.userId);
        this.onOpenInputEditProject();

    }

    changeText(event) {
        this.setState({
            text: event.target.value
        });
    }

    changeProjectName(event) {
        this.setState({
            projectName: event.target.value
        });
    }


    createNewColumn(projectListId) {
        const {text} = this.state;
        let position;
        if(this.props.columnsOrder.length === 0) {
            position = 1;
        }
        else {
            position = this.props.columns[this.props.columnsOrder[this.props.columnsOrder.length-1]].position + 1;
        }
        this.props.createNewColumn(text, projectListId, position);

    }


    getProjects = async (userId, userName, token) => {
        this.props.getAllProjects(userId, userName, token);
    }

    projectId = this.props.match.params.projectId;

    componentDidMount() {

        this.props.getParticipantsOnTask(this.props.match.params.projectId, this.props.userId);

        document.addEventListener('mousedown', this.handleClickOutside);

        if (JSON.parse(localStorage.getItem('user'))) {

            let user = JSON.parse(localStorage.getItem('user'));
            if (user.timestamp > Date.now() - 3600000) {
                console.log(user.userId, user.userName, user.token)
                this.props.setAuthUserData(user.userId, user.userName, user.token)
                this.getProjects(user.userId, user.userName, user.token);
            } else {
                window.localStorage.removeItem('user');

                this.props.setAuthUserData(null, null, null)
            }
        }

        this.props.getAllUsers(this.projectId);
        let projectId = this.props.match.params.projectId;
        this.props.getColumns(projectId);


    }

    // componentWillUnmount() {
    //     document.removeEventListener('mousedown', this.handleClickOutside);
    // }
    //
    // /**
    //  * Alert if clicked on outside of element
    //  */
    // handleClickOutside(event) {
    //     if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
    //         alert('You clicked outside of me!');
    //     }
    // }

    getProjectNameOrId() {
        let result = this.props.projects.filter(item => item.projectid == this.projectId)
        return result[0];
    }

    // state = initialData;

    editProject = (title, buttonName, id, text) => {
        this.props.openModal(<EditModalContainer title={title} id={id} text={text} parameters={{buttonName}}/>);
    };

    onOpenInputEditProject = () => {
        if(!this.state.projectName || this.state.projectName === '') {
            this.setState({
                projectName: this.getProjectNameOrId().name
            });
        }
        this.props.setIsOpenInputEditProject();
    }


    onDragEnd = async result => {

        let projectId = this.props.match.params.projectId;
        const {destination, source, draggableId, type} = result;

        if (type === 'column') {
            if (!destination || source.index === destination.index) {
                return;
            }
            const cloneObjColumns = JSON.parse(JSON.stringify(this.props.columns));
            // const cloneObjColumnsTmp = JSON.parse(JSON.stringify(this.props.columns));
            // const cloneColumnOrderTmp = JSON.parse(JSON.stringify(this.props.columnOrder));
            console.log("cloneObjColumns", cloneObjColumns);
            // console.log(cloneColumnOrderTmp === this.props.columnOrder);
            cloneObjColumns[this.props.columnOrder[source.index]].position = this.props.columns[this.props.columnOrder[destination.index]].position
            if (destination.index > source.index) {
                for (let i = destination.index; i >= 0; i--) {
                    if (i === source.index) {
                        continue;
                    }
                    cloneObjColumns[this.props.columnOrder[i]].position = +cloneObjColumns[this.props.columnOrder[i]].position - 1;
                }
            } else {
                for (let i = destination.index; i < source.index; i++) {
                    cloneObjColumns[this.props.columnOrder[i]].position = +cloneObjColumns[this.props.columnOrder[i]].position + 1;
                }
            }
            console.log("[cloneObjColumns]", cloneObjColumns)
            const newColumnsTmp = Object.values(cloneObjColumns);

            const newColumns = newColumnsTmp.map((column, index) => ({
                columnId: column.columnId,
                position: column.position
            }));

            console.log("[newColumns]", newColumns);

            // newColumns[source.index].position = newColumns[destination.index].position;
            // for(let i = destination.index; i >= 0; i--) {
            //     newColumns[i].position -= 1;
            // }
            console.log("cloneObjColumns", cloneObjColumns);
            console.log("source.index", source.index)
            console.log("this.props.columnOrder;", this.props.columnOrder)
            console.log("destination.index", destination.index)
            console.log("newColumns", newColumns);
            // let sortedColumns = newColumns.map((column, index) => {
            //
            // })


            this.props.onDragEnd(result);
            this.props.onUpdateColumnsPosition(newColumns, projectId);

            return;
        }

        // this.props.columnOrder;


        // const {destination, source, draggableId, type} = result;
        //
        if (!destination) {

            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {

            return;
        }


        // if(type === 'column') {
        //     const newColumnOrder = Array.from(this.state.columnOrder);
        //     newColumnOrder.splice(source.index, 1);
        //     newColumnOrder.splice(destination.index, 0, draggableId);
        //
        //     const newState = {
        //         ...this.state,
        //         columnOrder: newColumnOrder
        //     }
        //     this.setState(newState);
        //     return;
        // }



        const start = this.props.columns[source.droppableId];
        const finish = this.props.columns[destination.droppableId];


        if (start === finish) {

            const newTaskIds = Array.from(start.taskIds);
            let returnedTask = newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);


            let tmpTasksArr = newTaskIds.map(task => {
                return this.props.tasks[task];
            })


            if (destination.index > source.index) {
                tmpTasksArr[destination.index].position = +tmpTasksArr[destination.index - 1].position;
                for (let i = destination.index - 1; i >= 0; i--) {
                    // if(i === source.index) {
                    //     continue;
                    // }
                    tmpTasksArr[i].position = +tmpTasksArr[i].position - 1;
                }
            } else {
                tmpTasksArr[destination.index].position = +tmpTasksArr[destination.index + 1].position;
                for (let i = destination.index + 1; i <= source.index; i++) {
                    tmpTasksArr[i].position = +tmpTasksArr[i].position + 1;
                }
            }

            this.props.onDragEnd(result);
            this.props.updateTasksPosAndColumnId(tmpTasksArr, projectId);


            return;
        }



        // console.log("start.taskIds", start.taskIds);
        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);

        let returnedTask = startTaskIds.splice(source.index, 1);


        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };


        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        console.log("returnedTask", returnedTask);
        let tmpTasksArr = finishTaskIds.map(task => {
            // console.log("taskT", task)
            if (task === returnedTask[0]) {
                // console.log("zzz", task, returnedTask);
                this.props.tasks[task].columnid = String(finish.columnId);
            }
            return this.props.tasks[task];
        })

        if (destination.index == tmpTasksArr.length - 1) {
            console.log("AP", tmpTasksArr[destination.index].position, +tmpTasksArr[destination.index].position + 1)
            console.log("destination.index", destination.index)
            console.log("tmp.length - 1", tmpTasksArr.length - 1)
            if (tmpTasksArr.length - 1 == 0) {
                tmpTasksArr[destination.index].position = +tmpTasksArr[destination.index].position + 1;
            } else {
                tmpTasksArr[destination.index].position = +tmpTasksArr[destination.index - 1].position + 1;
            }

        } else {
            tmpTasksArr[destination.index].position = tmpTasksArr[destination.index + 1].position;
            for (let i = tmpTasksArr.length - 1; i > destination.index; i--) {
                tmpTasksArr[i].position = +tmpTasksArr[i].position + 1;
            }
        }
        console.log("tmp", tmpTasksArr)
        console.log("finishTaskIds", finishTaskIds);
        this.props.onDragEnd(result);
        this.props.updateTasksPosAndColumnId(tmpTasksArr, projectId);

    };


    onOpenOrCloseInviteList = () => {
        this.props.setIsOpenInviteList();
    }


    addNewColumn = (title, buttonName, projectListId, position) => {
        this.props.openModal(<EditModalContainer title={title} parameters={{projectListId, position, buttonName}}/>);
    };

    openFormForNewColumn = () => {
        this.props.openFormForNewColumn();
    };


    onLeaveProject = () => {
        this.props.leaveProject(this.props.userId, this.projectId);
    }

    render() {
        console.log("[dsds]", this.projectId);
        console.log("1111111111111111111", this.props)
        console.log("ACTIVE_USERS", this.props.activeUsers)
        console.log("USERS", this.props.users)
        console.log("this.props.tasks", this.props.tasks);
        console.log("this.props.taskInfo", this.props.taskInfo);
        console.log("this.props.projects", this.props.projects);
        let res = this.props.projects.find(project => project.projectid == this.projectId);
        if (!res && this.props.projects.length !== 0) {
            return <Redirect to={'/projects'}/>
        }
        console.log("res", res)
        return this.props.projects.length !== 0 ? <div className={classes.mainWrap}>
            {this.props.taskInfo && this.props.isTaskInfo && this.props.tasks[this.props.taskInfo.id] ?
                <TaskInfo/> : ''}
            <div className={this.props.isTaskInfo ? classes.map : ''}>
                <div className={classes.wrapNavbar}>
                    {this.props.isOpenInputEditProject ? <div className={classes.wrapItemTitle}>
                <AutosizeInput onFocus={this.handleFocus} spellCheck={false} inputStyle={{ border: 'none', outline: '.20rem solid #0079bf', fontSize: '18px', fontWeight: '700', margin: '0.15rem 0 2px 10px', height: '33px', padding: `0 10px 0 10px`,  fontFamily: 'Arial' }} value={this.state.projectName} onChange={this.changeProjectName} name="form-field-name" autoFocus={true} onBlur={() => {this.save(this.projectId)}}
                    //     onClick={() => {
                    //     this.editProject("Edit project", "Save changes", this.projectId, this.getProjectNameOrId().name)
                    // }}
                />

                    {/*{this.getProjectNameOrId().name}</input>*/}
                    </div> : <div onClick={() => {this.onOpenInputEditProject()}} className={classes.itemNameProject}>
                <span
                    //     onClick={() => {
                    //     this.editProject("Edit project", "Save changes", this.projectId, this.getProjectNameOrId().name)
                    // }}
                >

                    {this.state.projectName !== '' ? this.state.projectName : this.getProjectNameOrId().name}</span>
                    </div>}
                {/*<div onClick={() => {*/}
                {/*    this.onLeaveProject()*/}
                {/*}}>*/}
                {/*    Leave the project*/}
                {/*</div>*/}
                <div className={classes.itemNameProject} onClick={() => {
                    this.onOpenOrCloseInviteList()
                }}><span>Invite</span>

                </div>
                    <div className={classes.containerBlock}>

                        {this.props.IsOpenInviteList ? <InviteList title={'list of possible users'} menuName={'Invite to project'} projectId={this.projectId} userName={this.props.userName}
                                                                   users={this.props.users}/> : ''}
                    </div>
                </div>

                {/*<button onClick={() => {*/}
                {/*    this.addNewColumn("Add new column", "Add new column", this.getProjectNameOrId().projectid)*/}
                {/*}}>New column*/}
                {/*</button>*/}
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="all-columns" direction="horizontal" type="column">
                        {(provided) => (


                            <div className={classes.container} {...provided.droppableProps} ref={provided.innerRef}>
                                {this.props.columnOrder.map((columnId, index) => {

                                    const column = this.props.columns[columnId];

                                    let res = column.taskIds.filter(task => {
                                        return this.props.tasks[task] === undefined ? false : true;
                                    })

                                    const tasks = res.map(
                                        taskId => {
                                            return this.props.tasks[taskId]
                                        },
                                    );
                                    // let indexUndefined = tasks.indexOf(undefined);
                                    // console.log("indexUndefined", indexUndefined);
                                    // indexUndefined !== -1 && tasks.splice(indexUndefined, 1);
                                    // console.log("this.props.columns", tasks)
                                    return <Columns allTasks={this.props.tasks} taskInfo={this.props.taskInfo}
                                                    addNewTask={this.props.addNewTask}
                                                    setTaskInfo={this.props.setTaskInfo}
                                                    onRemoveColumn={this.props.onRemoveColumn}
                                                    projectId={this.props.match.params.projectId}
                                                    onUpdateColumn={this.props.onUpdateColumn}
                                                    isInput={this.props.isInput}
                                                    changeIsInput={this.props.changeIsInput} key={column.id}
                                                    column={column} tasks={tasks} index={index}/>;
                                })}
                                {/*<div className={classes.itemCreateColumn}>*/}
                                {/*    fdsfs*/}
                                {/*</div>*/}

                                {this.props.isOpenFormNewColumn ? <div className={` ${classes.itemCreateColumnInput}`}>

                                    <div>
                                        <input ref={this.newRef} onChange={this.changeText} value={this.state.text} autoFocus={true} className={classes.itemInputTitle} placeholder={"Enter title of column"} type="text"/>
                                    </div>
                                    <div className={classes.itemCreateColumnWrap}>
                                    <input onClick={() => {this.createNewColumn(this.getProjectNameOrId().projectid)}} className={classes.itemInput} value={"add column"} type={'button'}/>


                                        <div onClick={() => this.openFormForNewColumn()} className={classes.itemLeftColumn}>
                                            <FontAwesomeIcon  className={`fa-2x`}
                                                             icon={faTimes}/>
                                        </div>

                                    </div>
                                </div>
                                    :
                                    <div onClick={() => {this.openFormForNewColumn()}} className={classes.itemCreateColumn}>

                                    <div className={`${classes.itemLeftIcon} ${classes.itemLeftColumn}`}>
                                        <FontAwesomeIcon className={`fa-xs`}
                                                         icon={faPlus}/>
                                    </div>
                                    <div>
                                        add another column
                                    </div>


                                </div>}
                                {provided.placeholder}

                            </div>
                        )}

                    </Droppable>

                </DragDropContext>

            </div>
        </div> : ''


    }
}

const mapStateToProps = (state) => ({
    columns: state.columnsPage.columns,
    columnsOrder: state.columnsPage.columnOrder,
    columnOrder: state.columnsPage.columnOrder,
    tasks: state.columnsPage.tasks,
    projects: state.projectsPage.projects,
    isInput: state.columnsPage.isInput,
    users: state.usersPage.users,
    taskInfo: state.columnsPage.taskInfo,
    isTaskInfo: state.columnsPage.isTaskInfo,
    IsOpenInviteList: state.projectsPage.IsOpenInviteList,
    activeUsers: state.usersPage.activeUsers,
    userName: state.auth.userName,
    userId: state.auth.userId,
    isOpenFormNewColumn: state.columnsPage.isOpenFormNewColumn,
    isOpenInputEditProject: state.projectsPage.isOpenInputEditProject,

})


let AuthRedirectComponent = withAuthRedirect(Project);

export default connect(mapStateToProps, {
    leaveProject,
    getAllProjects,
    setAuthUserData,
    addToProject,
    removeFromProject,
    getAllUsers,
    setIsOpenInviteList,
    addNewTask,
    updateTasksPosAndColumnId,
    setTaskInfo,
    getColumns,
    getAllTasks,
    onDragEnd,
    openModal,
    onUpdateColumnsPosition,
    onUpdateColumn,
    onRemoveColumn,
    changeIsInput,
    openFormForNewColumn,
    createNewColumn,
    setIsOpenInputEditProject,
    editProject,
    getParticipantsOnTask
})(AuthRedirectComponent);

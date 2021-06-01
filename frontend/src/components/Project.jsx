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
import EditModalContainer from "./Modal/EditModal/EditModalContainer";
import TaskInfo from "./Tasks/TaskInfo/TaskInfo";
import {
    editProject,
    getAllProjects, removeProject,
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
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'
import {setAuthUserData} from "../redux/reducers/authReducer";
import {Redirect} from "react-router-dom";
import InviteList from "./InviteList";
import AutosizeInput from 'react-input-autosize';
import backgrounds from "../common/backgrounds/backgrounds";

class Project extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            projectName: '',
            backgrounds: backgrounds
        };

        this.changeText = this.changeText.bind(this);
        this.changeProjectName = this.changeProjectName.bind(this);
    }

    newRef = React.createRef();
    handleFocus = (event) => event.target.select();

    save(id) {
        const {projectName} = this.state;
        this.props.editProject(id, projectName, this.props.userId);
        this.onOpenInputEditProject();

    }

    getBackground = () => {
        console.log("qwe", this.props.projects);
        let background = this.props.projects.find(item => item.projectid == this.projectId).background;
        return this.state.backgrounds.find(item => item.title === background).background;
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
        if (this.props.columnsOrder.length === 0) {
            position = 1;
        } else {
            position = this.props.columns[this.props.columnsOrder[this.props.columnsOrder.length - 1]].position + 1;
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

    getProjectNameOrId() {
        let result = this.props.projects.filter(item => item.projectid == this.projectId)
        return result[0];
    }

    editProject = (title, buttonName, id, text) => {
        this.props.openModal(<EditModalContainer title={title} id={id} text={text} parameters={{buttonName}}/>);
    };

    onOpenInputEditProject = () => {
        if (!this.state.projectName || this.state.projectName === '') {
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
            const newColumnsTmp = Object.values(cloneObjColumns);
            const newColumns = newColumnsTmp.map((column, index) => ({
                columnId: column.columnId,
                position: column.position
            }));

            this.props.onDragEnd(result);
            this.props.onUpdateColumnsPosition(newColumns, projectId);

            return;
        }

        if (!destination) {

            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {

            return;
        }

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

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);

        let returnedTask = startTaskIds.splice(source.index, 1);

        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        let tmpTasksArr = finishTaskIds.map(task => {
            if (task === returnedTask[0]) {
                this.props.tasks[task].columnid = String(finish.columnId);
            }
            return this.props.tasks[task];
        })

        if (destination.index == tmpTasksArr.length - 1) {
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

    onRemoveProject = () => {
        this.props.removeProject(this.projectId, this.props.userId)
    }

    render() {

        // let activeUsers = [];
        // this.props.activeUsers.forEach(activeUser => {
        //     let user = this.props.users.find(user => user.username === activeUser);
        //     activeUsers.push(user);
        // })
        console.log('activeUsers', this.props.activeUsers)

        let res = this.props.projects.find(project => project.projectid == this.projectId);
        if (!res && this.props.projects.length !== 0) {
            return <Redirect to={'/projects'}/>
        }
        console.log("background", this.projectId)
        console.log("background", this.props.projects)
        return this.props.projects.length !== 0 ? <div style={{backgroundImage: `url(${this.getBackground()})`}} className={classes.mainWrap}>
            {this.props.taskInfo && this.props.isTaskInfo && this.props.tasks[this.props.taskInfo.id] ?
                <TaskInfo/> : ''}
            <div className={this.props.isTaskInfo ? classes.map : ''}>
                <div className={classes.wrapWrapNavbar}>
                    <div className={classes.wrapNavbar}>
                    {this.props.isOpenInputEditProject ? <div className={classes.wrapItemTitle}>
                        <AutosizeInput onFocus={this.handleFocus} spellCheck={false} inputStyle={{
                            border: 'none',
                            outline: '.20rem solid #0079bf',
                            fontSize: '18px',
                            fontWeight: '700',
                            margin: '0.15rem 0 2px 10px',
                            height: '33px',
                            padding: `0 10px 0 10px`,
                            fontFamily: 'Arial'
                        }} value={this.state.projectName} onChange={this.changeProjectName} name="form-field-name"
                                       autoFocus={true} onBlur={() => {
                            this.save(this.projectId)
                        }}
                        />
                    </div> : <div onClick={() => {
                        this.onOpenInputEditProject()
                    }} className={classes.itemNameProject}>
                <span
                >

                    {this.state.projectName !== '' ? this.state.projectName : this.getProjectNameOrId().name}</span>
                    </div>}
                    <div className={classes.wrapUserName}>
                    {this.props.activeUsers.map(activeUser => <div title={activeUser} className={classes.itemParticipant}><span
                        className={classes.wrapIconName}>{activeUser.substr(0, 1)}</span>
                    </div>)}
                    </div>

                    <div className={classes.itemNameProject} onClick={() => {
                        this.onOpenOrCloseInviteList()
                    }}><span>Invite</span>
                    </div>
                    </div>
                    <div className={classes.wrapItemRemove}>
                    <div className={classes.itemNameProject} onClick={() => {
                        this.onRemoveProject()
                    }}><span>Remove project</span>
                    </div>
                    </div>

                </div>
                <div className={classes.containerBlock}>

                    {this.props.IsOpenInviteList ?
                        <InviteList title={'list of possible users'} menuName={'Invite to project'}
                                    projectId={this.projectId} userName={this.props.userName}
                                    users={this.props.users}/> : ''}
                </div>
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
                                {this.props.isOpenFormNewColumn ? <div className={` ${classes.itemCreateColumnInput}`}>
                                        <div>
                                            <input ref={this.newRef} onChange={this.changeText} value={this.state.text}
                                                   autoFocus={true} className={classes.itemInputTitle}
                                                   placeholder={"Enter title of column"} type="text"/>
                                        </div>
                                        <div className={classes.itemCreateColumnWrap}>
                                            <input onClick={() => {
                                                this.createNewColumn(this.getProjectNameOrId().projectid)
                                            }} className={classes.itemInput} value={"add column"} type={'button'}/>


                                            <div onClick={() => this.openFormForNewColumn()}
                                                 className={classes.itemLeftColumn}>
                                                <FontAwesomeIcon className={`fa-2x`}
                                                                 icon={faTimes}/>
                                            </div>

                                        </div>
                                    </div>
                                    :
                                    <div onClick={() => {
                                        this.openFormForNewColumn()
                                    }} className={classes.itemCreateColumn}>

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
    getParticipantsOnTask,
    removeProject
})(AuthRedirectComponent);

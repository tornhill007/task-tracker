import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import classes from './Tasks.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faPen, faBars} from '@fortawesome/free-solid-svg-icons';
import markers from '../../common/markers';
import {connect} from "react-redux";

class Task extends React.Component {

    state = {
        isActiveTask: false,
    }

    onSetTaskInfo(taskInfo) {
        this.props.setTaskInfo(taskInfo);
    }

    checkCurrentUser = () => {

        // console.log()
        let tmp = this.props.participantsOnTask.find(item => item.taskid === this.props.taskId);
if(!tmp) {
    return false;
}

return tmp.newUsers.filter(item => item.username == this.props.userName).length !== 0;

        console.log("aaa",tmp)
        // if(!tmp) {
        //     return false;
        // }
        // let result = tmp.newUsers.filter(item => item.username === this.props.userName)
    }

    render() {
        // this.checkCurrentUser()
        console.log(this.props.task);
        let tmp = this.props.participantsOnTask.find(item => item.taskid === this.props.taskId);
        console.log(tmp)
        this.checkCurrentUser(this.props.userName)
        let activeUsers = [];
        this.props.activeUsers.forEach(activeUser => {
            let user = this.props.users.find(user => user.username === activeUser);
            activeUsers.push(user);
        })

        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <>
                        <div onMouseOver={() => {
                            this.setState({
                                isActiveTask: true
                            })
                        }} onMouseLeave={() => {
                            this.setState({
                                isActiveTask: false
                            })
                        }} onClick={() => {
                            this.onSetTaskInfo(this.props.task)
                        }} className={classes.container}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}
                             ref={provided.innerRef}
                             draggable={snapshot.isDragging}
                        >
                            {this.state.isActiveTask ? <FontAwesomeIcon onClick={(e) => {
                            }} className={`fa-xs` + ` ${this.props.isScroll ? classes.icon1 : classes.icon}`}
                                                                        icon={faPen}/> : ''}
                            <div className={`${classes.positionIcon}`}>
                                <div className={classes.blockMarkers}>
                                    {this.props.tasks[this.props.task.id].markers && this.props.tasks[this.props.task.id].markers.map(item =>
                                        <div>
                                            <div
                                                style={{backgroundColor: `${markers.find(item1 => item1.name === item).style}`}}
                                                className={` ${classes.itemMarker}`}></div>
                                        </div>)}
                                </div>
                                <div
                                    className={`${this.props.tasks[this.props.task.id].markers && classes.itemMarkerPadding} ${classes.leftItem}`}>{this.props.task.content}
                                </div>
                            </div>

                            <div
                                className={`${this.props.participantsOnTask.find(item => item.taskid === this.props.taskId) && (this.props.tasks[this.props.task.id].markers && this.props.tasks[this.props.task.id].markers.length === 0 || !this.props.tasks[this.props.task.id].markers) && classes.blockMargin} ${classes.blockWrapParticipant}`}>
                                <div className={classes.wrapperLeft}>
                                    {this.checkCurrentUser() &&
                                    <div title="You are subscribed to this task" className={classes.eyeIcon}>
                                        <FontAwesomeIcon className={`${classes.iconStyle} fa-cm`}
                                                         icon={faEye}/></div>}
                                    {this.props.task.description &&
                                    <div title="This card with a description" className={classes.eyeIcon}>
                                        <FontAwesomeIcon className={`${classes.iconStyle} fa-cm`}
                                                         icon={faBars}/></div>}
                                </div>
                                <div className={classes.blockItemParticipant}>
                                    {(this.props.participantsOnTask.length !== 0) && this.props.participantsOnTask.find(item => item.taskid === this.props.taskId) && this.props.participantsOnTask.find(item => item.taskid === this.props.taskId).newUsers.map(user =>
                                        <div className={classes.itemParticipant}><span
                                            className={classes.wrapIconName}>{user.username.substr(0, 1)}</span>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Draggable>
        );
    }
}

const mapStateToProps = (state) => ({
    tasks: state.columnsPage.tasks,
    users: state.usersPage.users,
    activeUsers: state.usersPage.activeUsers,
    participantsOnTask: state.usersPage.participantsOnTask,
    userName: state.auth.userName,
    textForDescriptionTmp: state.columnsPage.textForDescriptionTmp
});

export default connect(mapStateToProps, {})(Task);
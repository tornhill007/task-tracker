import React from 'react';
// import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import classes from './Tasks.module.css';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faTimes} from '@fortawesome/free-solid-svg-icons';
import markers from '../../common/markers';
import {connect} from "react-redux";

// const Container = styled.div`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
//   background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
// `;

class Task extends React.Component {

    state = {
        isActiveTask: false
    }


    onSetTaskInfo(taskInfo) {
        this.props.setTaskInfo(taskInfo);
    }

    checkActiveUsers = (activeUser) => {
        let index = this.props.activeUsers.indexOf(activeUser);
        return index !== -1;
    }

    render() {

        let activeUsers = [];
        this.props.activeUsers.forEach(activeUser => {
            let user = this.props.users.find(user => user.username === activeUser);
            activeUsers.push(user);
        })
        // console.log("taskId", this.props.participantsOnTask.find(item => item.taskid === this.props.taskId))
        let tmp = this.props.participantsOnTask.find(item => item.taskid === this.props.taskId);
        console.log("tmp", tmp)
        // console.log("this.props.task", this.props.task);
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
                                    {this.props.tasks[this.props.task.id].markers && this.props.tasks[this.props.task.id].markers.map(item => <div><div style={{backgroundColor: `${markers.find(item1 => item1.name === item).style}`}}
                                        className={` ${classes.itemMarker}`}></div></div>)}
                                    {/*<div className={classes.itemMarker}></div>*/}
                                    {/*<div className={classes.itemMarker}></div>*/}
                                    {/*<div className={classes.itemMarker}></div>*/}
                                    {/*<div className={classes.itemMarker}></div>*/}
                                </div>
                                <div className={`${this.props.tasks[this.props.task.id].markers && classes.itemMarkerPadding} ${classes.leftItem}`}>{this.props.task.content}
                                </div>
                                {/*{this.state.isActiveTask ? <FontAwesomeIcon className={`fa-xs` + ` ${classes.positionIcon} ${classes.icon}`} icon={faPen}/> : ''}*/}
                            </div>

                            <div className={`${ this.props.participantsOnTask.find(item => item.taskid === this.props.taskId) && (this.props.tasks[this.props.task.id].markers && this.props.tasks[this.props.task.id].markers.length === 0 || !this.props.tasks[this.props.task.id].markers) && classes.blockMargin} ${classes.blockWrapParticipant}`}>
                                <div className={classes.blockItemParticipant}>
                                {(this.props.participantsOnTask.length !== 0) && this.props.participantsOnTask.find(item => item.taskid === this.props.taskId) && this.props.participantsOnTask.find(item => item.taskid === this.props.taskId).newUsers.map(user => <div className={classes.itemParticipant}><span
                                    className={classes.wrapIconName}>{user.username.substr(0, 1)}</span>
                                </div>)}
                                {/*{this.props.activeUsers.filter(user => !this.checkActiveUsers(user.username)).map(item => <div>1</div>)}*/}
                                {/*{this.props.tasks[this.props.task.id].markers && this.props.tasks[this.props.task.id].markers.map(item => <div style={{backgroundColor: `${markers.find(item1 => item1.name === item).style}`}}*/}
                                {/*                                                                                                                    className={` ${classes.itemMarker}`}></div>)}*/}
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
    participantsOnTask: state.usersPage.participantsOnTask
    // taskInfo: state.columnsPage.taskInfo,
});

export default connect(mapStateToProps, {})(Task);
import React from "react";
import { withRouter } from "react-router";
import {connect} from "react-redux";
import {closeTaskInfo} from "../../../redux/reducers/columnsReducer";
import classes from "./TaskInfo.module.css";
import {addNewParticipant, setIsOpenUserList} from "../../../redux/reducers/usersReducer";

class TaskInfo extends React.Component {

    onCloseTaskInfo() {
        this.props.closeTaskInfo();
    }

    onOpenListUsers() {
        this.props.setIsOpenUserList();
    }

    checkUserInList(users, user) {
        let index = users.indexOf(user);
        if(index === -1) {
            return false
        }
        else {
            return true
        }
    }

    onAddNewParticipant(newUser, users) {
        console.log("allUsers", users)
        console.log("newUser", newUser)
        if(users) {
            users.push(newUser);
        }
        else {
            users = [newUser];
        }
        this.props.addNewParticipant(users, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
    }

    render() {
        console.log("[555]",this.props.taskInfo)
        // let task = this.props.tasks[`task-${+this.props.match.params.taskId}`]
        // console.log("[666]", task);
        return (
            <div className={classes.wrapper}>
                <button onClick={() => {this.onCloseTaskInfo()}}>Close</button>
                <div>
                Name of task: {this.props.taskInfo.content}
                </div>
                <div>
                    Description: {this.props.taskInfo.description}
                </div>
                <div>
                    Participants: {this.props.taskInfo.users.map(item => <div>{item}</div>)}
                    <div className={classes.container}>
                    {this.props.isOpenUsersList ? <div className={classes.listWrap}>
                        {this.props.users.map(user => <div className={`${classes.userWrap} ${this.checkUserInList( this.props.taskInfo.users, user.username) && classes.cursor}`}><div  onClick={() => {this.onAddNewParticipant(user.username, this.props.taskInfo.users)}}>{user.username}</div>{this.checkUserInList( this.props.taskInfo.users, user.username) ? <div>OK</div> : ''}</div>)}
                    </div> : ''}
                    </div>
                    {/*{this.props.isOpenUsersList ? <select onBlur={() => {this.onOpenListUsers()}} autoFocus={true} multiple>{this.props.users.map((user, index) => <option key={index}>{user.username}</option>)}</select> : ''}*/}
                    <button onClick={() => {this.onOpenListUsers()}}>{this.props.isOpenUsersList ? 'close list' : "add participants"}</button>
                </div>
                <div>
                    Marker's list: {this.props.taskInfo.markers}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tasks: state.columnsPage.tasks,
    taskInfo: state.columnsPage.taskInfo,
    users: state.usersPage.users,
    isOpenUsersList: state.usersPage.isOpenUsersList
})

export default connect(mapStateToProps, {closeTaskInfo, addNewParticipant, setIsOpenUserList})(withRouter(TaskInfo));
import React from "react";
import { withRouter } from "react-router";
import {connect} from "react-redux";
import {
    addNewMarker,
    closeTaskInfo,
    removeTask,
    updateDescription,
    updateTaskName
} from "../../../redux/reducers/columnsReducer";
import classes from "./TaskInfo.module.css";
import {addNewParticipant, setIsOpenMarkersList, setIsOpenUserList} from "../../../redux/reducers/usersReducer";

class TaskInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.id,
            markers: ["critical", "important", "not important", "bug"],
            isInput: false,
            isTextArea: false,
            text: this.props.tasks[this.props.taskInfo.id].content,
            textForDescription: this.props.tasks[this.props.taskInfo.id].description
        };

        // this.changeText = this.changeText.bind(this);

    }

    changeText = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    changeDescription = (event) => {
        this.setState({
            textForDescription: event.target.value
        });
    }

    onCloseTaskInfo() {
        this.props.closeTaskInfo();
    }

    onOpenListUsers() {
        this.props.setIsOpenUserList();
    }

    onOpenListMarkers() {
        this.props.setIsOpenMarkersList();
    }

    onEditTaskName() {
        this.setState({
            isInput: !this.state.isInput
        })
    }

    onEditDescription() {
        this.setState({
            isTextArea: !this.state.isTextArea
        })
    }

    checkUserInList(users, user) {
        if(users === null) {
            return false;
        }
        let index = users.indexOf(user);
        if(index === -1) {
            return false
        }
        else {
            return true
        }
    }

    checkMarkerInList(markers, marker) {
        if(markers === null) {
            return false;
        }
        let index = markers.indexOf(marker);
        if(index === -1) {
            return false
        }
        else {
            return true
        }
    }

    onUpdateTaskName = (taskId, projectId) => {
        console.log("taskId, projectId", taskId, projectId)
        this.props.updateTaskName(this.state.text, projectId, taskId);
        this.setState({
            isInput: !this.state.isInput
        })
    }

    onUpdateDescription = (taskId, projectId) => {
        console.log("taskId, projectId", this.state.textForDescription, taskId, projectId)
        // let text = this.state.textForDescription ? this.state.textForDescription : null
        this.props.updateDescription(this.state.textForDescription, projectId, taskId);
        this.setState({
            isTextArea: !this.state.isTextArea
        })
    }

    onRemoveParticipant(user, users) {
        // console.log("allUsers", users)
        // console.log("newUser", newUser)

        let index = users.indexOf(user);
        if(index !== -1) {
            users.splice(index, 1);
        }
        this.props.addNewParticipant(users, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
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

    onAddNewMarker(newMarker, markers) {
        console.log("allmarkers", markers)
        console.log("newMarker", newMarker)
        if(markers) {
            markers.push(newMarker);
        }
        else {
            markers = [newMarker];
        }
        console.log("markers", markers)
        console.log("markers", markers)
        console.log("markers1", markers, this.props.taskInfo.projectid, this.props.taskInfo.taskid)
        this.props.addNewMarker(markers, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
    }

    onRemoveMarker(newMarker, markers) {
        // console.log("allUsers", users)
        // console.log("newUser", newUser)

        let index = markers.indexOf(newMarker);
        if(index !== -1) {
            markers.splice(index, 1);
        }
        this.props.addNewMarker(markers, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
    }

    onRemoveTask(taskId) {
        this.props.closeTaskInfo();
        this.props.removeTask(taskId, this.props.taskInfo.projectid);
    }

    render() {
        console.log("[444]",this.props.taskInfo)
        console.log("[555]",this.props.tasks[this.props.taskInfo.id])

        console.log("[666]",this.props.tasks[this.props.taskInfo.id].users)
        // let task = this.props.tasks[`task-${+this.props.match.params.taskId}`]
        // console.log("[666]", task);
        return (
            <div className={classes.wrapper}>
                <button onClick={() => {this.onCloseTaskInfo()}}>Close</button>
                {this.state.isInput ? <input onChange={this.changeText}
                                             onBlur={() => this.onUpdateTaskName(this.props.taskInfo.taskid, this.props.taskInfo.projectid)}
                                             autoFocus={true} value={this.state.text}/> : <div onClick={() => {this.onEditTaskName()}}>
                    Name of task: {this.props.tasks[this.props.taskInfo.id].content}
                </div>}

                <div>
                    Description: {this.props.tasks[this.props.taskInfo.id].description && <div onClick={() => {this.onEditDescription()}}>{this.props.tasks[this.props.taskInfo.id].description}</div>}
                    {this.state.isTextArea ? <textarea onBlur={() => {this.onUpdateDescription(this.props.taskInfo.taskid, this.props.taskInfo.projectid)}} onChange={this.changeDescription} autoFocus={true} name="" id="" cols="30" rows="10">{this.state.textForDescription}</textarea> : <div onClick={() => {this.onEditDescription()}}>{!this.props.tasks[this.props.taskInfo.id].description && <span>Add more detail description</span>} </div>}

                </div>
                <div>
                    Participants: {this.props.tasks[this.props.taskInfo.id].users ? this.props.tasks[this.props.taskInfo.id].users.map(item => <div>{item}</div>) : <div>list is empty</div>}
                    <div className={classes.container}>
                    {this.props.isOpenUsersList ? <div className={classes.listWrap}>
                        {this.props.users.map(user => <div onClick={() => { !this.checkUserInList( this.props.tasks[this.props.taskInfo.id].users, user.username) ? this.onAddNewParticipant(user.username, this.props.tasks[this.props.taskInfo.id].users) : this.onRemoveParticipant(user.username, this.props.tasks[this.props.taskInfo.id].users)}} className={`${classes.userWrap} ${this.checkUserInList( this.props.tasks[this.props.taskInfo.id].users, user.username) && classes.cursor}`}><div  >{user.username}</div>{this.checkUserInList( this.props.tasks[this.props.taskInfo.id].users, user.username) ? <div>OK</div> : ''}</div>)}
                    </div> : ''}
                    </div>
                    {/*{this.props.isOpenUsersList ? <select onBlur={() => {this.onOpenListUsers()}} autoFocus={true} multiple>{this.props.users.map((user, index) => <option key={index}>{user.username}</option>)}</select> : ''}*/}
                    <button onClick={() => {this.onOpenListUsers()}}>{this.props.isOpenUsersList ? 'close list' : "add participants"}</button>
                </div>
                <div>
                    Marker's list: {this.props.tasks[this.props.taskInfo.id].markers ? this.props.tasks[this.props.taskInfo.id].markers.map(marker => <div>{marker}</div>) : <div>No markers</div>}
                    <div className={classes.container}>
                        {this.props.isOpenMarkersList ? <div className={classes.listWrap}>
                            {this.state.markers.map(marker => <div onClick={() => { !this.checkMarkerInList( this.props.tasks[this.props.taskInfo.id].markers, marker) ? this.onAddNewMarker(marker, this.props.tasks[this.props.taskInfo.id].markers) : this.onRemoveMarker(marker, this.props.tasks[this.props.taskInfo.id].markers)}} className={`${classes.userWrap} ${this.checkMarkerInList( this.props.tasks[this.props.taskInfo.id].markers, marker) && classes.cursor}`}><div  >{marker}</div>{this.checkMarkerInList( this.props.tasks[this.props.taskInfo.id].markers, marker) ? <div>OK</div> : ''}</div>)}
                        </div> : ''}
                    </div>
                    {/*{this.props.isOpenUsersList ? <select onBlur={() => {this.onOpenListUsers()}} autoFocus={true} multiple>{this.props.users.map((user, index) => <option key={index}>{user.username}</option>)}</select> : ''}*/}
                    <button onClick={() => {this.onOpenListMarkers()}}>{this.props.isOpenMarkersList ? 'close list' : "add marker"}</button>
                </div>
                <div>
                    <button onClick={() => {this.onRemoveTask(this.props.taskInfo.taskid)}}>delete card</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tasks: state.columnsPage.tasks,
    taskInfo: state.columnsPage.taskInfo,
    users: state.usersPage.users,
    isOpenUsersList: state.usersPage.isOpenUsersList,
    isOpenMarkersList: state.usersPage.isOpenMarkersList
})

export default connect(mapStateToProps, {addNewMarker, removeTask, updateTaskName, updateDescription, closeTaskInfo, addNewParticipant, setIsOpenMarkersList, setIsOpenUserList})(withRouter(TaskInfo));
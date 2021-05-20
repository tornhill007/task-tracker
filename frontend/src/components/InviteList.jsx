import React from "react";
import classes from "./Projects.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {addToProject, getAllUsers, removeFromProject} from "../redux/reducers/usersReducer";
import {setIsOpenInviteList} from "../redux/reducers/projectsReducer";

class InviteList extends React.Component {

    // componentDidMount() {
    //     this.props.getAllUsers(this.props.projectId);
    // }


    checkActiveUsers = (activeUser) => {
        let index = this.props.activeUsers.indexOf(activeUser);
        return index !== -1;
    }

    onAddToProject = (userId) => {
        this.props.addToProject(userId, this.props.projectId);
    }

    onRemoveFromProject = (userId) => {
        this.props.removeFromProject(userId, this.props.projectId);
    }

    onOpenOrCloseInviteList = () => {
        this.props.setIsOpenInviteList();
    }

    render() {
        return (
            <div className={classes.listWrap}>
                <div className={classes.wrapperItem}>
                    <div className={classes.itemTitle}>
                        <div className={classes.closeItem}>Invite to project</div>
                        <div className={classes.cursor} onClick={() => {
                            this.onOpenOrCloseInviteList()
                        }}><FontAwesomeIcon icon={faTimesCircle}/></div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className={classes.itemWrap}>
                    {this.props.users.filter(activeUser => activeUser.username !== this.props.userName).map(user => <div
                        onClick={() => {
                            !this.checkActiveUsers(user.username) ? this.onAddToProject(user.userid) : this.onRemoveFromProject(user.userid)
                        }}
                        className={`${classes.itemName} ${this.checkActiveUsers(user.username) && classes.itemColor}`}>{user.username}</div>)}
                    {/*{this.props.users.map(user => <div onClick={() => { !this.checkUserInList( this.props.tasks[this.props.taskInfo.id].users, user.username) ? this.onAddNewParticipant(user.username, this.props.tasks[this.props.taskInfo.id].users) : this.onRemoveParticipant(user.username, this.props.tasks[this.props.taskInfo.id].users)}} className={`${classes.userWrap} ${this.checkUserInList( this.props.tasks[this.props.taskInfo.id].users, user.username) && classes.cursor}`}><div  >{user.username}</div>{this.checkUserInList( this.props.tasks[this.props.taskInfo.id].users, user.username) ? <div>OK</div> : ''}</div>)}*/}
                    {/*{this.state.markers.map(marker => <div onClick={() => { !this.checkMarkerInList( this.props.tasks[this.props.taskInfo.id].markers, marker) ? this.onAddNewMarker(marker, this.props.tasks[this.props.taskInfo.id].markers) : this.onRemoveMarker(marker, this.props.tasks[this.props.taskInfo.id].markers)}} className={`${classes.userWrap} ${this.checkMarkerInList( this.props.tasks[this.props.taskInfo.id].markers, marker) && classes.cursor}`}><div  >{marker}</div>{this.checkMarkerInList( this.props.tasks[this.props.taskInfo.id].markers, marker) ? <div>OK</div> : ''}</div>)}*/}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    activeUsers: state.usersPage.activeUsers,
})

export default connect(mapStateToProps, {removeFromProject, getAllUsers, setIsOpenInviteList, addToProject})(InviteList);
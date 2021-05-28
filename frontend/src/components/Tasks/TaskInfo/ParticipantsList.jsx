import classes from "./ParticipantsList.module.css";
import React from "react";
import {connect} from "react-redux";
import {addNewParticipant, removeParticipant} from "../../../redux/reducers/usersReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

class ParticipantsList extends React.Component {


    checkParticipantInList(user) {

        let participantOnTask = this.props.participantOnTask.map(participant => participant.username);

        if (participantOnTask === null) {
            return false;
        }
        let index = participantOnTask.indexOf(user);
        if (index === -1) {
            return false
        } else {
            return true
        }
    }


    onAddNewParticipant(newUser, users, userId) {

        if (users) {
            users.push(newUser);
        } else {
            users = [newUser];
        }

        this.props.addNewParticipant(this.props.taskInfo.projectid, this.props.taskInfo.taskid, userId);
    }

    removeParticipant(userId) {
        this.props.removeParticipant(this.props.taskInfo.projectid, this.props.taskInfo.taskid, userId);
    }


    render() {
        console.log("[123454]", this.props.activeUsers);
        return (
            <div  className={classes.itemWrap}>
                {this.props.activeParticipants.map(user => {
                    console.log(user)
                    return <div onClick={() => {
                        !this.checkParticipantInList(user.username) ? this.onAddNewParticipant(user.username, this.props.tasks[this.props.taskInfo.id].users, user.userid) : this.removeParticipant(user.userid)
                    }} className={classes.itemName}>
                        <div

                            className={classes.itemGroupLeft}>
                            <div className={classes.containerIconName}><span
                                className={classes.wrapIconName}>{user.username.substr(0, 1)}</span>
                            </div>
                            <div>{user.username}</div>
                        </div>
                        <div>

                            {this.checkParticipantInList(user.username) ?
                                <FontAwesomeIcon icon={faCheck}/> : ''}
                        </div>

                    </div>
                })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: state.columnsPage.tasks,
    taskInfo: state.columnsPage.taskInfo,
    participantOnTask: state.usersPage.participantOnTask,
})

export default connect(mapStateToProps, {removeParticipant, addNewParticipant})(ParticipantsList);

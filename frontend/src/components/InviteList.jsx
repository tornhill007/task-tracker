import React from "react";
import classes from "./Projects.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle, faCheck} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {addToProject, getAllUsers, removeFromProject} from "../redux/reducers/usersReducer";
import {setIsOpenInviteList} from "../redux/reducers/projectsReducer";
import ParticipantsList from "./Tasks/TaskInfo/ParticipantsList";
import MarkersList from "./Tasks/TaskInfo/MarkersList";

class InviteList extends React.Component {

    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            // alert('You clicked outside of me!');
            this.props.columnMenu ? this.onOpenColumnMenu() : this.props.taskMenu ? this.props.onCloseTaskMenu() :
                this.onOpenOrCloseInviteList()
        }
    }


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

    onOpenColumnMenu = () => {
        this.props.onOpenColumnMenu();
    }

    onRemoveColumn = () => {
        this.props.onRemoveColumn(this.props.columnId, this.props.projectId);
    }

    render() {
        return (
            <div ref={this.setWrapperRef} className={`${this.props.wrapMenu && classes.listWrapMenu} ${classes.listWrap}`}>
                <div className={classes.wrapperItem}>
                    <div className={classes.itemTitle}>
                        <div className={classes.closeItem}>{this.props.menuName || this.props.nameRef}</div>
                        <div className={classes.cursor} onClick={() => {
                            this.props.columnMenu ? this.onOpenColumnMenu() : this.props.taskMenu ? this.props.onCloseTaskMenu() :
                                this.onOpenOrCloseInviteList()
                        }}><FontAwesomeIcon icon={faTimesCircle}/></div>
                    </div>
                    <div>
                    </div>
                </div>
                <div>
                    {this.props.columnMenu ? false :
                        <div className={classes.itemText}><span>{this.props.title}</span></div>}
                </div>
                {this.props.nameRef === 'Participants' ? <ParticipantsList
                    activeParticipants={this.props.activeParticipants}/> : this.props.nameRef === 'Markers' ?
                    <MarkersList markers={this.props.markers}/> : !this.props.users ?
                        <div className={classes.itemWrapColumnMenu}>
                            <div onClick={() => {
                                this.onRemoveColumn()
                            }}>Remove column
                            </div>
                        </div> : <div className={classes.itemWrap}>
                            {this.props.users.filter(activeUser => activeUser.username !== this.props.userName).map(user =>
                                <div
                                    onClick={() => {
                                        !this.checkActiveUsers(user.username) ? this.onAddToProject(user.userid) : this.onRemoveFromProject(user.userid)
                                    }}
                                    className={`${classes.itemName} ${this.checkActiveUsers(user.username) && ''}`}>
                                    <div className={classes.itemGroupLeft}>
                                        <div className={classes.containerIconName}><span
                                            className={classes.wrapIconName}>{user.username.substr(0, 1)}</span></div>
                                        <div>{user.username}</div>
                                    </div>
                                    {this.checkActiveUsers(user.username) ?
                                        <div><FontAwesomeIcon icon={faCheck}/></div> : ''}</div>)}
                        </div>}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    activeUsers: state.usersPage.activeUsers,
})

export default connect(mapStateToProps, {
    removeFromProject,
    getAllUsers,
    setIsOpenInviteList,
    addToProject
})(InviteList);
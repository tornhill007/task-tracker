import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {
    addNewMarker, changeTextForDescription,
    closeTaskInfo,
    removeTask,
    updateDescription,
    updateTaskName
} from "../../../redux/reducers/columnsReducer";
import classes from "./TaskInfo.module.css";
import {
    addNewParticipant, getParticipantOnTask,
    removeParticipant,
    setIsOpenMarkersList,
    setIsOpenUserList
} from "../../../redux/reducers/usersReducer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faTimes,
    faWindowMaximize,
    faTimesCircle,
    faBars,
    faUser,
    faTag,
    faEraser,
    faEye
} from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from "react-textarea-autosize";
import InviteList from "../../InviteList";
import markers from '../../../common/markers';

class TaskInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nameRef: '',
            x: '',
            nameRefPlus: '',
            title: '',
            titlePlus: '',
            rectTop: false,
            rectTopPlus: false,
            rectLeftPlus: false,
            rectRightPlus: false,
            rectLeft: false,
            isInput: false,
            isTextArea: false,
            text: this.props.tasks[this.props.taskInfo.id].content || '',
            textForDescription: this.props.tasks[this.props.taskInfo.id].description || '',
            textForDescriptionTmp: this.props.tasks[this.props.taskInfo.id].description || '',
            isButton: false,
            isOpenTaskMenu: false,
            isOpenTaskMenuLeft: false
        };

        this.myRef = React.createRef();
        this.participantRef = React.createRef();
        this.MarkersRef = React.createRef();
        this.markerRef = React.createRef();
        this.partRef = React.createRef();
        this.partRefPlus = React.createRef();
        this.markerRefPlus = React.createRef();

        this.onCloseTaskMenu = this.onCloseTaskMenu.bind(this);
        this.onCloseTaskMenuPlus = this.onCloseTaskMenuPlus.bind(this);
    }

    handleFocus = (event) => event.target.focus();

    componentDidMount() {
        this.props.getParticipantOnTask(this.props.taskInfo.projectid, this.props.taskInfo.taskid, this.props.userId);
    }

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

    changeText = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    setIsButton = (isButton) => {
        this.setState({
            isButton: isButton
        });
    }

    getCoordinate = (ref, refName, title) => {
        let rect = ref.current.getBoundingClientRect();

        this.setState({
            isOpenTaskMenu: true,
            isOpenTaskMenuLeft: false,
            rectTop: rect.top,
            rectLeft: rect.left,
            nameRef: refName,
            title
        })
    }

    getCoordinateForPlus = (ref, refName, title) => {
        let rect = ref.current.getBoundingClientRect();
        this.setState({
            isOpenTaskMenuLeft: true,
            isOpenTaskMenu: false,
            rectTopPlus: rect.top,
            rectLeftPlus: rect.left,
            rectRightPlus: rect.right,
            x: rect.x,
            nameRefPlus: refName,
            titlePlus: title
        })
    }

    changeDescription = (event) => {
        this.setState({
            textForDescription: event.target.value,
        });
    }

    onCloseTaskMenu = () => {
        this.setState({
            isOpenTaskMenu: false,
        });
    }

    onCloseTaskMenuPlus = () => {
        this.setState({
            isOpenTaskMenuLeft: false,
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
            isTextArea: true
        })
    }

    checkUserInList(user) {

    }

    checkMarkerInList(markers, marker) {
        if (markers === null) {
            return false;
        }
        let index = markers.indexOf(marker);
        if (index === -1) {
            return false
        } else {
            return true
        }
    }

    onUpdateTaskName = (taskId, projectId) => {
        if (!this.state.text || this.state.text === '') {
            this.setState({
                isInput: !this.state.isInput
            })
            return;
        }
        this.props.updateTaskName(this.state.text, projectId, taskId);
        this.setState({
            isInput: !this.state.isInput
        })
        return;
    }

    onCloseTextarea = () => {
        this.setState({
            isTextArea: false,
            textForDescription: this.props.tasks[this.props.taskInfo.id].description,
            textForDescriptionTmp: this.props.tasks[this.props.taskInfo.id].description
        })
    }

    onUpdateDescription = (taskId, projectId) => {
        if (this.state.textForDescription === this.state.textForDescriptionTmp) {
            this.setState({
                isTextArea: false,
            })
            return
        }
        this.props.updateDescription(this.state.textForDescription, projectId, taskId);
        this.setState({
            isTextArea: false,
        })

        this.setState({
            textForDescriptionTmp: this.state.textForDescription,
        })
    }

    onAddNewMarker(newMarker, markers) {

        if (markers) {
            markers.push(newMarker);
        } else {
            markers = [newMarker];
        }
        this.props.addNewMarker(markers, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
    }

    onRemoveMarker(newMarker, markers) {
        let index = markers.indexOf(newMarker);
        if (index !== -1) {
            markers.splice(index, 1);
        }
        this.props.addNewMarker(markers, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
    }

    onRemoveTask(taskId) {
        this.props.closeTaskInfo();
        this.props.removeTask(taskId, this.props.taskInfo.projectid);
    }

    render() {
        const name = this.props.columns['column-' + this.props.tasks[this.props.taskInfo.id].columnid].name;
        let activeUsers = [];
        this.props.activeUsers.forEach(activeUser => {
            let user = this.props.users.find(user => user.username === activeUser);
            activeUsers.push(user);
        })
        return (
            <>
                <div className={classes.wrapForWrap}>
                </div>
                <div className={classes.wrapper}>
                    <div className={classes.firstBlock}>
                        <div className={classes.firstBlockLeft}>
                            <div className={classes.firstBlockLeftIcon}>
                                <FontAwesomeIcon className={`${classes.iconStyle} fa-lg`}
                                                 icon={faWindowMaximize}/>
                            </div>
                            <div className={classes.wrapperFirstBlock}>
                                <TextareaAutosize value={this.state.text}
                                                  onBlur={() => this.onUpdateTaskName(this.props.taskInfo.taskid, this.props.taskInfo.projectid)}
                                                  onChange={this.changeText} className={classes.firstBlockCenter}
                                                  onFocus={() => {
                                                      this.onEditTaskName()
                                                  }}/>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => {
                        this.onCloseTaskInfo()
                    }} className={classes.firstBlockRight}><FontAwesomeIcon className={`${classes.borderIcon} fa-lg`}
                                                                            icon={faTimesCircle}/></div>
                    <div className={classes.itemActiveColumn}>in column <span
                        className={classes.itemActiveColumnUnderline}>{name}</span>
                        {this.checkParticipantInList(this.props.userName) &&
                        <span className={classes.eyeIcon}><FontAwesomeIcon className={`${classes.iconStyle} fa-cm`}
                                                                           icon={faEye}/></span>}
                    </div>
                    <div className={classes.cardDetail}>
                        {this.props.participantOnTask.length !== 0 ? <div className={classes.cardParticipants}>
                            <div>
                                <span className={classes.cardTitle}>Participants</span>
                            </div>
                            <div className={classes.containerIconName}>
                                {this.props.participantOnTask.map((participant, index) => <div key={index}
                                    className={classes.itemParticipant}><span
                                    className={classes.wrapIconName}>{participant.username.substr(0, 1)}</span>
                                </div>)}
                                <div onClick={() => {
                                    this.getCoordinateForPlus(this.partRefPlus, 'Participants', 'Projects Participants')
                                }} ref={this.partRefPlus}><span
                                    className={`${classes.wrapIconPlus} ${classes.wrapIconName}`}>+</span>
                                </div>
                            </div>
                        </div> : ''}
                        {this.props.tasks[this.props.taskInfo.id].markers && this.props.tasks[this.props.taskInfo.id].markers.length !== 0 &&
                        <div className={classes.cardParticipants}>
                            <div>
                                <span className={classes.cardTitle}>Markers</span>
                            </div>
                            <div className={classes.containerIconName}>
                                {this.props.tasks[this.props.taskInfo.id].markers.map((marker, index) => {
                                    return <div key={index} className={classes.itemParticipant}><span
                                        style={{backgroundColor: markers.find(item => item.name === marker).style}}
                                        className={classes.wrapIconMarker}>{marker.substr(0, 1)}</span>
                                    </div>
                                })}
                                <div onClick={() => {
                                    this.getCoordinateForPlus(this.markerRefPlus, 'Markers', 'Project Markers')
                                }} ref={this.markerRefPlus}><span
                                    className={`${classes.wrapIconMarkerPlus} ${classes.wrapIconMarker}`}>+</span>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className={classes.secondBlock}>
                        <div className={classes.secondBlockLeft}>
                            <div className={classes.firstBlockLeftIcon}>
                                <FontAwesomeIcon className={`${classes.iconStyle} fa-lg`}
                                                 icon={faBars}/>
                                <span className={classes.itemDesc}>Description</span>
                                {(this.state.textForDescriptionTmp) && (!this.state.isTextArea) ? <a onClick={() => {
                                    this.onEditDescription()
                                }} className={classes.itemButtonChange}>Change</a> : false}
                            </div>

                            <div className={classes.secondBlockTextArea}>

                                {this.state.textForDescriptionTmp && !this.state.isTextArea ?
                                    <div className={classes.itemBlockName} onClick={() => {
                                        this.onEditDescription()
                                    }}>{this.state.textForDescription}</div> : <><TextareaAutosize onFocus={() => {
                                        this.setIsButton(true)
                                    }} ref={this.myRef} autoFocus={this.state.isTextArea && true}
                                                                                                   value={this.state.textForDescription}
                                                                                                   placeholder={"Add more detail information..."}
                                                                                                   onBlur={() => {
                                                                                                       this.onUpdateDescription(this.props.taskInfo.taskid, this.props.taskInfo.projectid);
                                                                                                       this.setIsButton(false)
                                                                                                   }}
                                                                                                   onChange={this.changeDescription}
                                                                                                   className={classes.secondBlockCenter}/>
                                        {(this.state.textForDescriptionTmp || this.state.isButton) &&
                                        <div className={classes.itemCreateColumnWrap}>
                                            <input className={classes.itemInput} value={"Save changes"}
                                                   type={'button'}/>


                                            <div className={classes.itemLeftColumn}>
                                                <FontAwesomeIcon onMouseDown={(e) => {
                                                    this.onCloseTextarea()
                                                }} className={`fa-2x`}
                                                                 icon={faTimes}/>
                                            </div>
                                        </div>}
                                    </>
                                }
                            </div>
                        </div>
                        <div className={classes.thirdBlock}>
                            <div className={classes.thirdItemWrap}>
                                {this.state.isOpenTaskMenu &&
                                <div style={{top: `${this.state.rectTop - 47}px`}} className={classes.itemListInvite}>
                                    <InviteList markers={markers} title={this.state.title}
                                                activeParticipants={activeUsers} nameRef={this.state.nameRef}
                                                onCloseTaskMenu={this.onCloseTaskMenu} taskMenu={true}/>
                                </div>}
                                {this.state.isOpenTaskMenuLeft && <div style={{top: `${this.state.rectTopPlus - 50}px`}}
                                                                       className={classes.itemListInvitePlus}>
                                    <InviteList markers={markers} title={this.state.titlePlus}
                                                activeParticipants={activeUsers} nameRef={this.state.nameRefPlus}
                                                onCloseTaskMenu={this.onCloseTaskMenuPlus} taskMenu={true}/>
                                </div>}
                                <div className={classes.itemRigthBlockTitle}>
                                    ADD TO TASK
                                </div>
                                <div onClick={() => {
                                    this.getCoordinate(this.participantRef, 'Participants', 'Projects Participants')
                                }} ref={this.participantRef} className={classes.itemList}>
                                    <FontAwesomeIcon className={`${classes.itemIcon} fa-cm`}
                                                     icon={faUser}/>
                                    <span className={classes.itemNameButton}>Participants</span>
                                </div>
                                <div onClick={() => {
                                    this.getCoordinate(this.MarkersRef, 'Markers', 'Project Markers')
                                }} ref={this.MarkersRef} className={classes.itemList}>
                                    <FontAwesomeIcon className={`${classes.itemIcon} fa-cm`}
                                                     icon={faTag}/>
                                    <span className={classes.itemNameButton}>Markers</span>
                                </div>
                                <div className={`${classes.itemRigthBlockSecondTitle} ${classes.itemRigthBlockTitle}`}>
                                    ACTIONS
                                </div>
                                <div onClick={() => {
                                    this.onRemoveTask(this.props.taskInfo.taskid)
                                }} className={classes.itemList}>
                                    <FontAwesomeIcon className={`${classes.itemIcon} fa-cm`}
                                                     icon={faEraser}/>
                                    <span className={classes.itemNameButton}>Remove task</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    tasks: state.columnsPage.tasks,
    taskInfo: state.columnsPage.taskInfo,
    users: state.usersPage.users,
    isOpenUsersList: state.usersPage.isOpenUsersList,
    isOpenMarkersList: state.usersPage.isOpenMarkersList,
    activeUsers: state.usersPage.activeUsers,
    userName: state.auth.userName,
    userId: state.auth.userId,
    participantOnTask: state.usersPage.participantOnTask,
    columns: state.columnsPage.columns
})

export default connect(mapStateToProps, {
    getParticipantOnTask,
    removeParticipant,
    addNewMarker,
    removeTask,
    updateTaskName,
    updateDescription,
    closeTaskInfo,
    addNewParticipant,
    setIsOpenMarkersList,
    setIsOpenUserList,
    changeTextForDescription
})(withRouter(TaskInfo));
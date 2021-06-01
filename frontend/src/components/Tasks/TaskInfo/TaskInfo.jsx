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
            text: this.props.tasks[this.props.taskInfo.id].content,
            textForDescription: this.props.tasks[this.props.taskInfo.id].description,
            textForDescriptionTmp: this.props.tasks[this.props.taskInfo.id].description,
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

        // for(let key of this.state.markers) {
        //     console.log("key", key.id);
        //     let ref = 'markerRef'+key.id;
        //     this[ref] = React.createRef();
        // }

        this.onCloseTaskMenu = this.onCloseTaskMenu.bind(this);
        this.onCloseTaskMenuPlus = this.onCloseTaskMenuPlus.bind(this);

    }


    handleFocus = (event) => event.target.focus();
    // focusRef = React.createRef();

    componentDidMount() {
        this.props.getParticipantOnTask(this.props.taskInfo.projectid, this.props.taskInfo.taskid, this.props.userId);
        // this.props.changeTextForDescription(this.state.textForDescriptionTmp);
    }

    // onKeyName = (e) => {
    //     if (e.keyCode===13 && e.ctrlKey) {
    //         this.props.updateTaskName(this.state.text, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
    //         this.setState({
    //             isInput: !this.state.isInput
    //         })
    //     }
    //
    // }

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
        console.log("ref", ref.current);
        let rect = ref.current.getBoundingClientRect();

        console.log("rect", rect);
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
        console.log("ref", ref.current);
        let rect = ref.current.getBoundingClientRect();

        console.log("rect", rect);
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
        // console.log(users, user)
        // this.props.activeUsers
        // this.props.participantOnTask

        // let participantOnTask = this.props.participantOnTask.map(participant => participant.userName);
        //
        //  if(participantOnTask === null) {
        //      return false;
        //  }
        //  let index = participantOnTask.indexOf(user);
        //  if(index === -1) {
        //      return false
        //  }
        //  else {
        //      return true
        //  }
    }

    // checkParticipantInList(user) {
    //     // console.log(users, user)
    //     // this.props.activeUsers
    //     // this.props.participantOnTask
    //
    //     let participantOnTask = this.props.participantOnTask.map(participant => participant.username);
    //
    //     if (participantOnTask === null) {
    //         return false;
    //     }
    //     let index = participantOnTask.indexOf(user);
    //     if (index === -1) {
    //         return false
    //     } else {
    //         return true
    //     }
    // }

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
            // alert(1)
            this.setState({
                isInput: !this.state.isInput
            })
            return;
        }
        this.props.updateTaskName(this.state.text, projectId, taskId);
// alert(2)
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
        // this.props.changeTextForDescription(this.props.tasks[this.props.taskInfo.id].description)
    }

    onUpdateDescription = (taskId, projectId) => {
        // let text = this.state.textForDescription ? this.state.textForDescription : null
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

        // this.props.changeTextForDescription(this.state.textForDescription)

        // if(this.state.textForDescription === '') {
        //     this.setState({
        //         isTextArea: !this.state.isTextArea,
        //     })
        // }
    }

    // onRemoveParticipant(user, users) {
    //
    //     let index = users.indexOf(user);
    //     if (index !== -1) {
    //         users.splice(index, 1);
    //     }
    //     this.props.addNewParticipant(users, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
    // }

    // removeParticipant(userId) {
    //     this.props.removeParticipant(this.props.taskInfo.projectid, this.props.taskInfo.taskid, userId);
    // }
    //
    // onAddNewParticipant(newUser, users, userId) {
    //
    //     if (users) {
    //         users.push(newUser);
    //     } else {
    //         users = [newUser];
    //     }
    //
    //     this.props.addNewParticipant(this.props.taskInfo.projectid, this.props.taskInfo.taskid, userId);
    // }

    onAddNewMarker(newMarker, markers) {

        if (markers) {
            markers.push(newMarker);
        } else {
            markers = [newMarker];
        }

        this.props.addNewMarker(markers, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
    }

    onRemoveMarker(newMarker, markers) {
        // console.log("allUsers", users)
        // console.log("newUser", newUser)

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

        console.log("ON TASK", this.props.participantOnTask)
        // alert(this.state.rect)
        const name = this.props.columns['column-' + this.props.tasks[this.props.taskInfo.id].columnid].name;
        console.log("[098]", this.state.textForDescriptionTmp)

        let activeUsers = [];
        this.props.activeUsers.forEach(activeUser => {
            let user = this.props.users.find(user => user.username === activeUser);
            activeUsers.push(user);
        })
        console.log('activeUsers', activeUsers)
        // let task = this.props.tasks[`task-${+this.props.match.params.taskId}`]
        // console.log("[666]", task);
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

                            <div>
                                <TextareaAutosize value={this.state.text}
                                                  onBlur={() => this.onUpdateTaskName(this.props.taskInfo.taskid, this.props.taskInfo.projectid)}
                                                  onChange={this.changeText} className={classes.firstBlockCenter}
                                                  onFocus={() => {
                                                      this.onEditTaskName()
                                                  }}/>
                                {/*this.props.tasks[this.props.taskInfo.id].content*/}

                                {/*{this.state.isInput ? <input onChange={this.changeText}*/}
                                {/*                             onBlur={() => this.onUpdateTaskName(this.props.taskInfo.taskid, this.props.taskInfo.projectid)}*/}
                                {/*                             autoFocus={true} value={this.state.text}/> :*/}
                                {/*    <textarea onFocus={() => {*/}
                                {/*        this.onEditTaskName()*/}
                                {/*    }}>*/}
                                {/*        {this.props.tasks[this.props.taskInfo.id].content}*/}
                                {/*    </textarea>}*/}
                            </div>
                        </div>

                    </div>
                    <div onClick={() => {
                        this.onCloseTaskInfo()
                    }} className={classes.firstBlockRight}><FontAwesomeIcon className={`${classes.borderIcon} fa-lg`}
                                                                            icon={faTimesCircle}/></div>
                    <div className={classes.itemActiveColumn}>in column <span
                        className={classes.itemActiveColumnUnderline}>{name}</span>
                        {this.checkParticipantInList(this.props.userName) && <span className={classes.eyeIcon}><FontAwesomeIcon className={`${classes.iconStyle} fa-cm`}
                                                                                                                                icon={faEye}/></span>}
                    </div>
                    <div className={classes.cardDetail}>
                        {this.props.participantOnTask.length !== 0 ? <div className={classes.cardParticipants}>
                            <div>
                                <span className={classes.cardTitle}>Participants</span>
                            </div>
                            <div className={classes.containerIconName}>
                                {this.props.participantOnTask.map(participant => <div className={classes.itemParticipant}><span
                                    className={classes.wrapIconName}>{participant.username.substr(0, 1)}</span>
                                </div>)}
                                <div onClick={() => {this.getCoordinateForPlus(this.partRefPlus, 'Participants', 'Projects Participants')}} ref={this.partRefPlus}><span
                                    className={`${classes.wrapIconPlus} ${classes.wrapIconName}`}>+</span>
                                </div>
                            </div>
                        </div> : ''}

                        {this.props.tasks[this.props.taskInfo.id].markers && this.props.tasks[this.props.taskInfo.id].markers.length !== 0 && <div className={classes.cardParticipants}>
                            <div>
                                <span className={classes.cardTitle}>Markers</span>
                            </div>
                            <div className={classes.containerIconName}>
                                {this.props.tasks[this.props.taskInfo.id].markers.map((marker, index) => {
                                    return <div  className={classes.itemParticipant}><span style={{backgroundColor: markers.find(item => item.name === marker).style}}
                                                                                   className={classes.wrapIconMarker}>{marker.substr(0, 1)}</span>
                                    </div>})}
                                <div onClick={() => {this.getCoordinateForPlus(this.markerRefPlus, 'Markers', 'Project Markers')}} ref={this.markerRefPlus}><span
                                    className={`${classes.wrapIconMarkerPlus} ${classes.wrapIconMarker}`}>+</span>
                                </div>
                            </div>
                        </div> }

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


                                {/*this.props.tasks[this.props.taskInfo.id].content*/}

                                {/*{this.state.isInput ? <input onChange={this.changeText}*/}
                                {/*                             onBlur={() => this.onUpdateTaskName(this.props.taskInfo.taskid, this.props.taskInfo.projectid)}*/}
                                {/*                             autoFocus={true} value={this.state.text}/> :*/}
                                {/*    <textarea onFocus={() => {*/}
                                {/*        this.onEditTaskName()*/}
                                {/*    }}>*/}
                                {/*        {this.props.tasks[this.props.taskInfo.id].content}*/}
                                {/*    </textarea>}*/}
                            </div>

                        </div>
                        <div className={classes.thirdBlock}>
                            <div className={classes.thirdItemWrap}>
                                {this.state.isOpenTaskMenu && <div style={{top: `${this.state.rectTop-47}px`}} className={classes.itemListInvite}>
                                    <InviteList markers={markers} title={this.state.title} activeParticipants={activeUsers} nameRef={this.state.nameRef} onCloseTaskMenu={this.onCloseTaskMenu} taskMenu={true}/>
                                </div>}
                                {this.state.isOpenTaskMenuLeft && <div style={{top: `${this.state.rectTopPlus-50}px`}} className={classes.itemListInvitePlus}>
                                    <InviteList markers={markers} title={this.state.titlePlus} activeParticipants={activeUsers} nameRef={this.state.nameRefPlus} onCloseTaskMenu={this.onCloseTaskMenuPlus} taskMenu={true}/>
                                </div>}
                                <div className={classes.itemRigthBlockTitle}>
                                    ADD TO TASK
                                </div>
                                <div onClick={() => {this.getCoordinate(this.participantRef, 'Participants', 'Projects Participants')}} ref={this.participantRef} className={classes.itemList}>
                                    <FontAwesomeIcon className={`${classes.itemIcon} fa-cm`}
                                                     icon={faUser}/>
                                    <span className={classes.itemNameButton}>Participants</span>
                                </div>
                                <div onClick={() => {this.getCoordinate(this.MarkersRef, 'Markers', 'Project Markers')}} ref={this.MarkersRef} className={classes.itemList}>
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
                    {/*<div>*/}
                    {/*    Description: {this.props.tasks[this.props.taskInfo.id].description && <div onClick={() => {*/}
                    {/*    this.onEditDescription()*/}
                    {/*}}>{this.props.tasks[this.props.taskInfo.id].description}</div>}*/}
                    {/*    {this.state.isTextArea ? <textarea onBlur={() => {*/}
                    {/*            this.onUpdateDescription(this.props.taskInfo.taskid, this.props.taskInfo.projectid)*/}
                    {/*        }} onChange={this.changeDescription} autoFocus={true} name="" id="" cols="30"*/}
                    {/*                                       rows="10">{this.state.textForDescription}</textarea> :*/}
                    {/*        <div onClick={() => {*/}
                    {/*            this.onEditDescription()*/}
                    {/*        }}>{!this.props.tasks[this.props.taskInfo.id].description &&*/}
                    {/*        <span>Add more detail description</span>} </div>}*/}

                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    Participants: {this.props.participantOnTask ? this.props.participantOnTask.map(item =>*/}
                    {/*    <div>{item.username}</div>) : <div>list is empty</div>}*/}
                    {/*    <div className={classes.container}>*/}
                    {/*        {this.props.isOpenUsersList ? <div className={classes.listWrap}>*/}
                    {/*            /!*{activeUsers.map(user => <div onClick={() => { !this.checkUserInList( this.props.tasks[this.props.taskInfo.id].users, user.username) ? this.onAddNewParticipant(user.username, this.props.tasks[this.props.taskInfo.id].users) : this.onRemoveParticipant(user.username, this.props.tasks[this.props.taskInfo.id].users)}} className={`${classes.userWrap} ${this.checkUserInList( this.props.tasks[this.props.taskInfo.id].users, user.username) && classes.cursor}`}><div  >{user.username}</div>{this.checkUserInList( this.props.tasks[this.props.taskInfo.id].users, user.username) ? <div>OK</div> : ''}</div>)}*!/*/}
                    {/*            /!*this.onAddNewParticipant(user.username, this.props.tasks[this.props.taskInfo.id].users, user.userid*!/*/}
                    {/*            /!*this.removeParticipant(user.userid)*!/*/}
                    {/*            {activeUsers.map(user => <div onClick={() => {*/}
                    {/*                !this.checkParticipantInList(user.username) ? this.onAddNewParticipant(user.username, this.props.tasks[this.props.taskInfo.id].users, user.userid) : this.removeParticipant(user.userid)*/}
                    {/*            }}*/}
                    {/*                                          className={`${classes.userWrap} ${this.checkParticipantInList(user.username) && classes.cursor}`}>*/}
                    {/*                <div>{user.username}</div>*/}
                    {/*                {this.checkParticipantInList(user.username) ? <div>OK</div> : ''}</div>)}*/}
                    {/*        </div> : ''}*/}
                    {/*        /!*<div onClick={() => {this.removeParticipant()}}>REMOVE</div>*!/*/}
                    {/*    </div>*/}
                    {/*    /!*{this.props.isOpenUsersList ? <select onBlur={() => {this.onOpenListUsers()}} autoFocus={true} multiple>{this.props.users.map((user, index) => <option key={index}>{user.username}</option>)}</select> : ''}*!/*/}
                    {/*    <button onClick={() => {*/}
                    {/*        this.onOpenListUsers()*/}
                    {/*    }}>{this.props.isOpenUsersList ? 'close list' : "add participants"}</button>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    Marker's*/}
                    {/*    list: {this.props.tasks[this.props.taskInfo.id].markers ? this.props.tasks[this.props.taskInfo.id].markers.map(marker =>*/}
                    {/*    <div>{marker}</div>) : <div>No markers</div>}*/}
                    {/*    <div className={classes.container}>*/}
                    {/*        {this.props.isOpenMarkersList ? <div className={classes.listWrap}>*/}
                    {/*            {this.state.markers.map(marker => <div onClick={() => {*/}
                    {/*                !this.checkMarkerInList(this.props.tasks[this.props.taskInfo.id].markers, marker) ? this.onAddNewMarker(marker, this.props.tasks[this.props.taskInfo.id].markers) : this.onRemoveMarker(marker, this.props.tasks[this.props.taskInfo.id].markers)*/}
                    {/*            }}*/}
                    {/*                                                   className={`${classes.userWrap} ${this.checkMarkerInList(this.props.tasks[this.props.taskInfo.id].markers, marker) && classes.cursor}`}>*/}
                    {/*                <div>{marker}</div>*/}
                    {/*                {this.checkMarkerInList(this.props.tasks[this.props.taskInfo.id].markers, marker) ?*/}
                    {/*                    <div>OK</div> : ''}</div>)}*/}
                    {/*        </div> : ''}*/}
                    {/*    </div>*/}
                    {/*    /!*{this.props.isOpenUsersList ? <select onBlur={() => {this.onOpenListUsers()}} autoFocus={true} multiple>{this.props.users.map((user, index) => <option key={index}>{user.username}</option>)}</select> : ''}*!/*/}
                    {/*    /!*<button onClick={() => {*!/*/}
                    {/*    /!*    this.onOpenListMarkers()*!/*/}
                    {/*    /!*}}>{this.props.isOpenMarkersList ? 'close list' : "add marker"}</button>*!/*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <button onClick={() => {*/}
                    {/*        this.onRemoveTask(this.props.taskInfo.taskid)*/}
                    {/*    }}>delete card*/}
                    {/*    </button>*/}
                    {/*</div>*/}
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
import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import classes from './Tasks.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faPen, faBars} from '@fortawesome/free-solid-svg-icons';
import markers from '../../common/markers';
import {connect} from "react-redux";
import {closeTaskInfo, setIsOpenQuickEditor, updateTaskName} from "../../redux/reducers/columnsReducer";
import TextareaAutosize from "react-textarea-autosize";

class Task extends React.Component {

    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.changeText = this.changeText.bind(this);
    }

    handleFocus = (event) => event.target.select();

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
            this.onCloseQuickEditor();
            this.setState({
                isActiveTask: false
            })
        }
    }

    state = {
        isActiveTask: false,
        isOpenQuickEditor: false,
        text: this.props.task.content
    }

    onCloseTaskInfo() {
        this.props.closeTaskInfo();
    }

    onSetTaskInfo(taskInfo) {
        this.props.setTaskInfo(taskInfo);
    }

    changeText(event) {
        this.setState({
            text: event.target.value
        })
        // this.props.setTaskInfo(taskInfo);
    }

    onCloseQuickEditor() {
        this.setState({
            isOpenQuickEditor: false,
            text: this.props.task.content
        })
    }

    onSave() {
        if (!this.state.text) {
            return
        }
        this.props.updateTaskName(this.state.text, this.props.projectId, this.props.taskId);
        this.setState({
            isOpenQuickEditor: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.task.content !== prevProps.task.content) {
            this.setState({
                text: this.props.task.content
            })
        }

    }

    onOpenQuickEditor() {
        this.props.setIsOpenQuickEditor(true);
        this.setState({
            isOpenQuickEditor: true
        })
    }

    checkCurrentUser = () => {
        let tmp = this.props.participantsOnTask.find(item => item.taskid === this.props.taskId);
        if (!tmp) {
            return false;
        }
        return tmp.newUsers.filter(item => item.username == this.props.userName).length !== 0;
    }

    render() {
        let tmp = this.props.participantsOnTask.find(item => item.taskid === this.props.taskId);
        this.checkCurrentUser(this.props.userName)
        let activeUsers = [];
        this.props.activeUsers.forEach(activeUser => {
            let user = this.props.users.find(user => user.username === activeUser);
            activeUsers.push(user);
        })

        return (
            this.state.isOpenQuickEditor ?
                <div ref={this.setWrapperRef} className={classes.wrapperEditor}><TextareaAutosize autoFocus={true} onFocus={this.handleFocus}
                    className={classes.firstBlockCenter} value={this.state.text} onChange={this.changeText}/>
                    <div className={classes.editorItemRight}><input onClick={() => {
                        this.onSave()
                    }} className={`${classes.itemInputEdit} ${classes.itemInput}`} value={"Save"} type={'button'}/>
                    </div>
                </div> : <Draggable draggableId={this.props.task.id} index={this.props.index}>
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
                                    e.stopPropagation();
                                    this.onOpenQuickEditor()
                                }} className={`fa-xs` + ` ${this.props.isScroll ? classes.icon1 : classes.icon}`}
                                                                            icon={faPen}/> : ''}

                                <div className={`${classes.positionIcon}`}>
                                    <div className={classes.blockMarkers}>
                                        {this.props.tasks[this.props.task.id].markers && this.props.tasks[this.props.task.id].markers.map((item, index) =>
                                            <div key={index} title={item}>
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
                                        {(this.props.participantsOnTask.length !== 0) && this.props.participantsOnTask.find(item => item.taskid === this.props.taskId) && this.props.participantsOnTask.find(item => item.taskid === this.props.taskId).newUsers.map((user, index) =>
                                            <div key={index} title={user.username} className={classes.itemParticipant}><span
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
    textForDescriptionTmp: state.columnsPage.textForDescriptionTmp,
    isOpenQuickEditor: state.columnsPage.isOpenQuickEditor
});

export default connect(mapStateToProps, {updateTaskName, closeTaskInfo, setIsOpenQuickEditor})(Task);
import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Tasks from '../Tasks/Tasks';
import classes from './Columns.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize';
import InviteList from "../InviteList";

export default class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.id,
            isInput: false,
            text: this.props.column.name,
            textNewTask: '',
            isTaskInput: false,
            isScroll: false,
            isOpenColumnMenu: false
        };

        this.changeText = this.changeText.bind(this);
        this.changeTaskText = this.changeTaskText.bind(this);
        this.onOpenColumnMenu = this.onOpenColumnMenu.bind(this);
        this.onRemoveColumn = this.onRemoveColumn.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.testRef = this.testRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    inputRef = React.createRef();

    handleFocus = (event) => event.target.select();

    changeText(event) {
        this.setState({
            text: event.target.value
        });
    }

    changeTaskText(event) {
        this.setState({
            textNewTask: event.target.value
        });
    }

    onEditColumn() {
        this.setState({
            isInput: !this.state.isInput
        })
    }

    onKeyDown(e) {
        if (e.key === 'Enter') {
            this.onUpdateColumn(this.props.column.columnId, this.state.text, this.props.projectId)
        }
    }

    onUpdateColumn(idColumn, name, projectId) {
        if(!name || name === '') {
            this.setState({
                isInput: !this.state.isInput
            })
            return;
        }
        this.props.onUpdateColumn(idColumn, name, projectId);
        this.setState({
            isInput: !this.state.isInput
        })
    }

    onOpenInput() {
        this.setState({
            isTaskInput: !this.state.isTaskInput
        })
    }

    onOpenColumnMenu() {
        this.setState({
            isOpenColumnMenu: !this.state.isOpenColumnMenu
        })
    }

    onKeyNewTask = (e) => {
        if (e.key === 'Enter') {
            this.onAddNewTask(this.props.column.columnId, this.props.projectId, this.onCalculateIndex(this.props.allTasks))
        }
    }

    onAddNewTask(columnId, projectId, position) {
        if(!this.state.textNewTask || this.state.textNewTask === '') {
            return;
        }
        this.props.addNewTask(this.state.textNewTask, columnId, projectId, position);
        this.setState({
            isTaskInput: !this.state.isTaskInput
        })
    }

    onRemoveColumn(idColumn, projectId) {
        this.props.onRemoveColumn(idColumn, projectId);
    }

    onCalculateIndex(allTasks) {
        if (this.props.column.taskIds.length === 0) {
            return 1
        } else return +allTasks[this.props.column.taskIds[this.props.column.taskIds.length - 1]].position + 1
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.tasks.length !== this.props.tasks.length) {
            const block = document.getElementById('test' + this.props.column.id);
            const hasVerScroll = block.scrollHeight > block.clientHeight;
            this.setState({
                isScroll: hasVerScroll
            })
        }
    }

    componentDidMount() {
        const block = document.getElementById('test' + this.props.column.id);
        const hasVerScroll = block.scrollHeight > block.clientHeight;
        this.setState({
            isScroll: hasVerScroll
        })
        document.addEventListener('mousedown', this.handleClickOutside);
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    testRef(node) {
        this.testRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if(!this.state.textNewTask || this.state.textNewTask === '') {
                this.onOpenInput();
            }
            this.onAddNewTask(this.props.column.columnId, this.props.projectId, this.onCalculateIndex(this.props.allTasks))
        }
    }

    render() {
console.log("123", this.state.isScroll)
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (
                    <div {...provided.draggableProps} ref={provided.innerRef} className={classes.container}>
                       <div ref={this.state.isTaskInput ? this.setWrapperRef : this.testRef}>
                        {this.state.isInput ? <div className={classes.headerWrapper}>
                                <div><input className={classes.itemTextAreaTitle} onFocus={this.handleFocus}
                                            onChange={this.changeText}
                                            onKeyDown={(e) => this.onKeyDown(e)}
                                            onBlur={() => this.onUpdateColumn(this.props.column.columnId, this.state.text, this.props.projectId)}
                                            autoFocus={true} value={this.state.text}/></div>
                                <div onClick={() => {this.onOpenColumnMenu()}} className={classes.itemTitleRigth} {...provided.dragHandleProps}><span>...</span>
                                </div>
                            </div> :
                            <div className={classes.headerWrapper}>
                                <div onClick={() => this.onEditColumn()} {...provided.dragHandleProps}
                                     className={classes.title}>
                                    <div><span>{this.props.column.name}</span></div>
                                </div>
                                <div onClick={() => {this.onOpenColumnMenu()}} className={classes.itemTitleRigth} {...provided.dragHandleProps}><span>...</span>
                                </div>
                            </div>
                        }
                        {this.state.isOpenColumnMenu ? <div className={classes.wrapMenu}><InviteList wrapMenu={true} menuName={"Column Actions"} onRemoveColumn={this.onRemoveColumn} columnId={this.props.column.columnId} onOpenColumnMenu={this.onOpenColumnMenu} columnMenu={true} projectId={this.props.projectId}/></div>  : ''}
                        <Droppable droppableId={this.props.column.id} type="task">
                            {(provided, snapshot) => (
                                <div  className={classes.taskList}
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                                     isDraggingOver={snapshot.isDraggingOver}
                                >
                                    <div id={'test' + this.props.column.id} className={classes.taskListTmp}>
                                    {
                                        this.props.tasks.length === 0 ? '' : this.props.tasks[0] === undefined ? '' : this.props.tasks.map((task, index) => {
                                            return <Tasks
                                                taskId={task.taskid}
                                                isScroll={this.state.isScroll}
                                                taskInfo={this.props.taskInfo}
                                                setTaskInfo={this.props.setTaskInfo}
                                                projectId={this.props.projectId} key={task.id} task={task}
                                                index={index}/>
                                        })}



                                    {}
                                    {provided.placeholder}
                                    {this.state.isTaskInput ? <div className={classes.containerTask}
                                    >
                                        <div>
                                            <div className={`${classes.leftItem}`}>
                                                <TextareaAutosize onKeyDown={(e) => {this.onKeyNewTask(e)}}  onChange={this.changeTaskText} value={this.state.textNewTask}
                                                                  autoFocus={true} placeholder={"Please, enter header"}
                                                                  className={`${this.state.isScroll ? classes.textareaItemScroll : classes.textareaItem}`}/>
                                            </div>
                                        </div>
                                    </div> : ''}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                        <div className={classes.wrapItemFooter}>
                            {this.state.isTaskInput ? <div className={classes.itemCreateColumnWrap}>
                                <input onClick={() => {
                                    this.onAddNewTask(this.props.column.columnId, this.props.projectId, this.onCalculateIndex(this.props.allTasks))
                                }} className={classes.itemInput} value={"add another task"} type={'button'}/>
                                <div onClick={() => {this.onOpenInput()}} className={` ${classes.itemLeftColumn} `}>
                                    <FontAwesomeIcon  className={`fa-2x`}
                                                      icon={faTimes}/>
                                </div>
                            </div> :
                                <div onClick={() => {
                                    this.onOpenInput()
                                }} className={classes.itemFooterButton}>
                                    <div className={classes.itemFooterButtonLeft}><FontAwesomeIcon className={`fa-xs`}
                                                                                                   icon={faPlus}/></div>
                                    <div className={classes.itemButton}>add another task
                                    </div>
                                </div>}
                        </div>
                       </div>
                    </div>
                )}
            </Draggable>

        );
    }
}

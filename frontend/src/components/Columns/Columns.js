import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Tasks from '../Tasks/Tasks';
import classes from './Columns.module.css';
import ColumnName from "./ColumnName/ColumnsName";
import TaskInfo from "../Tasks/TaskInfo/TaskInfo";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faPlus} from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize';

// const Container = styled.div`
//   margin: 8px;
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   width: 220px;
//
//   display: flex;
//   flex-direction: column;
// `;
// const Title = styled.h3`
//   padding: 8px;
// `;
// const TaskList = styled.div`
//   padding: 8px;
//   transition: background-color 0.2s ease;
//   background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
//   flex-grow: 1;
//   min-height: 100px;
// `;

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
        };


        this.changeText = this.changeText.bind(this);
        this.changeTaskText = this.changeTaskText.bind(this);
    }

    inputRef = React.createRef();

    // state = {
    //     // id: this.props.id,
    //     isInput: false,
    //     text: this.props.column.name
    // };

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

    onUpdateColumn(idColumn, name, projectId) {
        console.log("[123123123]", idColumn, name, projectId)
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

    onAddNewTask(columnId, projectId, position) {
        console.log("[POS]", position);
        this.props.addNewTask(this.state.textNewTask, columnId, projectId, position);
        this.setState({
            isTaskInput: !this.state.isTaskInput
        })
    }

    onRemoveColumn(idColumn, projectId) {
        // console.log("[123123123]", idColumn, name, projectId)
        this.props.onRemoveColumn(idColumn, projectId);
        // this.setState({
        //     isInput: !this.state.isInput
        // })
    }

    onCalculateIndex(allTasks) {
        console.log("qqq", allTasks)

        if (this.props.column.taskIds.length === 0) {
            return 1
        } else return +allTasks[this.props.column.taskIds[this.props.column.taskIds.length - 1]].position + 1
        // +this.props.allTasks[this.props.column.taskIds[this.props.column.taskIds.length-1]].position + 1
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
    }


    render() {

        console.log("00000000000000000000000000", this.props.tasks)
        console.log("qthis.props.tasksqq", this.props.tasks)
        console.log("qthis.props.tasksqqAll", this.props.allTasks)
        console.log("REEEEEEEEEEF", this.inputRef)
        // console.log("STATE", +this.props.allTasks[this.props.column.taskIds[this.props.column.taskIds.length-1]].position + 1)
        // console.log("this.props.tasks111", this.props.column.taskIds[this.props.column.taskIds.length-1])
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (


                    <div {...provided.draggableProps} ref={provided.innerRef} className={classes.container}>
                        {this.state.isInput ? <input onChange={this.changeText}
                                                     onBlur={() => this.onUpdateColumn(this.props.column.columnId, this.state.text, this.props.projectId)}
                                                     autoFocus={true} value={this.state.text}/> :
                            <div className={classes.headerWrapper}>
                                <div onClick={() => this.onEditColumn()} {...provided.dragHandleProps}
                                     className={classes.title}>
                                    <div><span>{this.props.column.name}</span></div>
                                </div>
                                <div className={classes.itemTitleRigth} {...provided.dragHandleProps}><span>...</span>
                                </div>
                            </div>}

                        {/*<button onClick={() => {*/}
                        {/*    this.onRemoveColumn(this.props.column.columnId, this.props.projectId)*/}
                        {/*}}>Del*/}
                        {/*</button>*/}
                        <Droppable droppableId={this.props.column.id} type="task">
                            {(provided, snapshot) => (
                                <div id={'test' + this.props.column.id} className={classes.taskList}
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                                     isDraggingOver={snapshot.isDraggingOver}

                                >
                                    {
                                        this.props.tasks.length === 0 ? '' : this.props.tasks[0] === undefined ? '' : this.props.tasks.map((task, index) => {
                                            console.log("[task]", task);
                                            return <Tasks
                                                isScroll={this.state.isScroll}
                                                taskInfo={this.props.taskInfo}
                                                setTaskInfo={this.props.setTaskInfo}
                                                projectId={this.props.projectId} key={task.id} task={task}
                                                index={index}/>
                                        })}
                                    {}
                                    {provided.placeholder}
                                    {/*{this.state.isTaskInput ? <input onBlur={() => {*/}
                                    {/*    this.state.textNewTask ? this.onAddNewTask(this.props.column.columnId, this.props.projectId, this.onCalculateIndex(this.props.allTasks)) : this.onOpenInput()*/}
                                    {/*}} autoFocus={true} placeholder={"Please, enter header"}*/}
                                    {/*                                 onChange={this.changeTaskText}*/}
                                    {/*                                 value={this.state.textNewTask}/> : ''}*/}
                                    {this.state.isTaskInput ? <div className={classes.containerTask}

                                    >
                                        <div>

                                            <div className={`${classes.leftItem}`}>
                                                <TextareaAutosize onBlur={() => {
                                                    this.state.textNewTask ? this.onAddNewTask(this.props.column.columnId, this.props.projectId, this.onCalculateIndex(this.props.allTasks)) : this.onOpenInput()
                                                }} onChange={this.changeTaskText} value={this.state.textNewTask}
                                                                  autoFocus={true} placeholder={"Please, enter header"}
                                                                  className={`${this.state.isScroll ? classes.textareaItemScroll : classes.textareaItem}`}/>
                                            </div>

                                            {/*{this.state.isActiveTask ? <FontAwesomeIcon className={`fa-xs` + ` ${classes.positionIcon} ${classes.icon}`} icon={faPen}/> : ''}*/}
                                            {/*<div contentEditable={true} className={classes.textareaItem} onBlur={() => {*/}
                                            {/*    this.state.textNewTask ? this.onAddNewTask(this.props.column.columnId, this.props.projectId, this.onCalculateIndex(this.props.allTasks)) : this.onOpenInput()*/}
                                            {/*}} autoFocus={true} placeholder={"Please, enter header"}*/}
                                            {/*     onChange={this.changeTaskText}*/}
                                            {/*     value={this.state.textNewTask}/>*/}
                                        </div>

                                    </div> : ''}
                                </div>
                            )}

                        </Droppable>
                        <div className={classes.wrapItemFooter}>
                            <div onClick={() => {
                                this.onOpenInput()
                            }} className={classes.itemFooterButton}>
                                <div className={classes.itemFooterButtonLeft}><FontAwesomeIcon className={`fa-xs`}
                                                                                               icon={faPlus}/></div>
                                <div className={classes.itemButton}>add another task
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </Draggable>

        );
    }
}

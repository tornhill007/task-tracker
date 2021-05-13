import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Tasks from '../Tasks/Tasks';
import classes from './Columns.module.css';
import ColumnName from "./ColumnName/ColumnsName";
import TaskInfo from "../Tasks/TaskInfo/TaskInfo";

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
            isTaskInput: false
        };

        this.changeText = this.changeText.bind(this);
        this.changeTaskText = this.changeTaskText.bind(this);
    }

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

        // console.log("this.props.column.taskIds", this.props.column.taskIds)
        // console.log("this.props.column.taskIds[this.props.column.taskIds.length-1]", this.props.column.taskIds[this.props.column.taskIds.length-1])
        // console.log("allTasks[this.props.column.taskIds[this.props.column.taskIds.length-1]].position + 1", +allTasks[this.props.column.taskIds[this.props.column.taskIds.length-1]].position + 1)
        if(this.props.column.taskIds.length === 0 ) {
            return 1
        }
        else return +allTasks[this.props.column.taskIds[this.props.column.taskIds.length-1]].position + 1
        // +this.props.allTasks[this.props.column.taskIds[this.props.column.taskIds.length-1]].position + 1
    }

    // onEditColumn() {
    //     // this.setState({
    //     //     isInput: !this.state.isInput
    //     // })
    //     this.props.changeIsInput();
    // }

    render() {
        console.log("qthis.props.tasksqq", this.props.tasks)
        console.log("qthis.props.tasksqqAll", this.props.allTasks)
        // console.log("STATE", +this.props.allTasks[this.props.column.taskIds[this.props.column.taskIds.length-1]].position + 1)
        // console.log("this.props.tasks111", this.props.column.taskIds[this.props.column.taskIds.length-1])
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (


                    <div {...provided.draggableProps} ref={provided.innerRef} className={classes.container}>
                        {this.state.isInput ? <input onChange={this.changeText}
                                                     onBlur={() => this.onUpdateColumn(this.props.column.columnId, this.state.text, this.props.projectId)}
                                                     autoFocus={true} value={this.state.text}/> :
                            <h3 onClick={() => this.onEditColumn()} {...provided.dragHandleProps}
                                className={classes.title}>{this.props.column.name}</h3>}
                        <button onClick={() => {
                            this.onRemoveColumn(this.props.column.columnId, this.props.projectId)
                        }}>Del
                        </button>
                        <Droppable droppableId={this.props.column.id} type="task">
                            {(provided, snapshot) => (
                                <div className={classes.taskList}
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                                     isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {
                                        this.props.tasks.length === 0 ? '' : this.props.tasks[0] === undefined ? '' : this.props.tasks.map((task, index) => {
                                            console.log("[task]", task);
                                            return <Tasks taskInfo={this.props.taskInfo} setTaskInfo={this.props.setTaskInfo} projectId={this.props.projectId} key={task.id} task={task} index={index}/>
                                        })}
                                    {}
                                    {provided.placeholder}
                                </div>
                            )}

                        </Droppable>
                        {this.state.isTaskInput ? <input onBlur={() => {
                            this.state.textNewTask ? this.onAddNewTask(this.props.column.columnId, this.props.projectId, this.onCalculateIndex(this.props.allTasks)) : this.onOpenInput()
                        }} autoFocus={true} placeholder={"Please, enter header"} onChange={this.changeTaskText}
                                                         value={this.state.textNewTask}/> : ''}
                        <button onClick={() => {
                            this.onOpenInput()
                        }}>add task
                        </button>
                    </div>
                )}
            </Draggable>

        );
    }
}

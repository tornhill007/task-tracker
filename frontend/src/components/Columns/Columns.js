import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Tasks from '../Tasks/Tasks';
import classes from './Columns.module.css';

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
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (


                    <div {...provided.draggableProps} ref={provided.innerRef} className={classes.container}>
                        <h3 {...provided.dragHandleProps} className={classes.title}>{this.props.column.name}</h3>
                        <Droppable droppableId={this.props.column.id} type="task">
                            {(provided, snapshot) => (
                                <div className={classes.taskList}
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                                     isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {this.props.tasks.map((task, index) => (
                                        <Tasks key={task.id} task={task} index={index}/>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                    </div>
                )}
            </Draggable>
        )
            ;
    }
}

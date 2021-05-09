import React from 'react';
// import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import classes from './Tasks.module.css';
import {NavLink} from "react-router-dom";

// const Container = styled.div`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
//   background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
// `;

export default class Task extends React.Component {

    onSetTaskInfo(taskInfo) {
        this.props.setTaskInfo(taskInfo);
    }

    render() {

        console.log("vvvv", this.props)
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>

                {(provided, snapshot) => (


                            <div onClick={() => {this.onSetTaskInfo(this.props.task)}}  className={classes.container}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  draggable={snapshot.isDragging}
                            >
                                {this.props.task.content}
                            </div>


                )}
            </Draggable>
        );
    }
}

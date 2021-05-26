import React from 'react';
// import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import classes from './Tasks.module.css';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faTimes} from '@fortawesome/free-solid-svg-icons'

// const Container = styled.div`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
//   background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
// `;

export default class Task extends React.Component {

    state = {
        isActiveTask: false
    }


    onSetTaskInfo(taskInfo) {
        this.props.setTaskInfo(taskInfo);
    }

    render() {

        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>

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
                        {this.state.isActiveTask ? <FontAwesomeIcon onClick={(e) => {}} className={`fa-xs` + ` ${this.props.isScroll ? classes.icon1 : classes.icon}`} icon={faPen}/> : ''}
                        <div  className={`${classes.positionIcon}`}>

                            <div className={`${classes.leftItem}`}>{this.props.task.content}

                            </div>

                            {/*{this.state.isActiveTask ? <FontAwesomeIcon className={`fa-xs` + ` ${classes.positionIcon} ${classes.icon}`} icon={faPen}/> : ''}*/}

                        </div>

                    </div>

                    </>


                )}
            </Draggable>
        );
    }
}

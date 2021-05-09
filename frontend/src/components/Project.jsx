import React, {useState} from 'react';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import classes from "./Projects.module.css";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import Columns from "./Columns/Columns";
import {connect} from "react-redux";
import {
    addNewTask,
    changeIsInput, getAllTasks,
    getColumns,
    onDragEnd, onRemoveColumn, onUpdateColumn,
    onUpdateColumnsPosition,
    openModal, setTaskInfo
} from "../redux/reducers/columnsReducer";
import {columnsApi} from "../api/api";
import EditModalContainer from "./Modal/EditModal/EditModalContainer";
import {getProjectName, getProjects} from "../redux/selectors/projectsSelector";
import TaskInfo from "./Tasks/TaskInfo/TaskInfo";


// const projects = [
//     {
//         id: 1,
//         name: 'Hello',
//         tasks: [
//             {
//                 id: 'a',
//                 name: 'kek1'
//             },
//             {
//                 id: 'b',
//                 name: 'kek2'
//             },
//             {
//                 id: 'c',
//                 name: 'kek3'
//             },
//         ]
//     },
//     {
//         id: 2,
//         name: 'Hello1',
//         tasks: [
//             {
//                 id: 'q',
//                 name: 'kek4'
//             },
//             {
//                 id: 'w',
//                 name: 'kek5'
//             },
//             {
//                 id: 'e',
//                 name: 'kek6'
//             },
//         ]
//     },
//     {
//         id: 3,
//         name: 'Hello2',
//         tasks: [
//             {
//                 id: 'r',
//                 name: 'kek7'
//             },
//             {
//                 id: 't',
//                 name: 'kek8'
//             },
//             {
//                 id: 'y',
//                 name: 'kek9'
//             },
//         ]
//     },
//     {
//         id: 4,
//         name: 'Hello3',
//         tasks: [
//             {
//                 id: 'u',
//                 name: 'kek10'
//             },
//             {
//                 id: 'i',
//                 name: 'kek11'
//             },
//             {
//                 id: 'o',
//                 name: 'kek12'
//             },
//         ]
//     },
//     {
//         id: 5,
//         name: 'Hello4',
//         tasks: [
//             {
//                 id: 'gf',
//                 name: 'kek13'
//             },
//             {
//                 id: 'cv',
//                 name: 'kek14'
//             },
//             {
//                 id: 'hg',
//                 name: 'kek15'
//             },
//         ]
//     },
// ]
const initialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Take out the garbage'},
        'task-2': {id: 'task-2', content: 'qqqqqqqqqqqqqqqqq'},
        'task-3': {id: 'task-3', content: 'wwwwwwwwwwwwwwwwwwwwwwwwww'},
        'task-4': {id: 'task-4', content: 'eeeeeeeeeeeeeeeeeee'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            name: 'Kek1',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            name: 'Kek2',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            name: 'Kek3',
            taskIds: []
        },
        'column-4': {
            id: 'column-4',
            name: 'Kek4',
            taskIds: []
        },
        'column-5': {
            id: 'column-5',
            name: 'Kek5',
            taskIds: []
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5']
}
// let tasks = [
//     {
//         id: 1,
//         name: 'kek1'
//     },
//     {
//         id: 3,
//         name: 'kek2'
//     },
//     {
//         id: 2,
//         name: 'kek3'
//     },
// ]



class Project extends React.Component {

    projectId = this.props.match.params.projectId;
    componentDidMount() {

        let projectId = this.props.match.params.projectId;
        console.log("PROJECTID", projectId);
        this.props.getColumns(projectId);


    }

    getProjectNameOrId() {
        console.log("[1]", this.projectId)
        console.log("[2]", this.props.projects)
       let result = this.props.projects.filter(item => item.projectid == this.projectId)
        console.log(result);
        return result[0];
    }

    state = initialData;

    editProject = (title, buttonName, id, text) => {
        this.props.openModal(<EditModalContainer title={title} id={id} text={text} parameters={{buttonName}}/>);
    };


    onDragEnd = async result => {
        //
        let projectId = this.props.match.params.projectId;
        const {destination, source, draggableId, type} = result;
        //
        // if(type === 'column') {
        //     const newColumnOrder = Array.from(this.props.columnOrder);
        //     console.log("POSITION1", newColumnOrder[source.index]);
        //     console.log("POSITION-START", this.props.columns[newColumnOrder[source.index]].position);
        //     console.log("POSITION-START", this.props.columns[newColumnOrder[source.index]].columnId);
        //
        //     console.log("COLUMN_ID-FINISH", this.props.columns[newColumnOrder[destination.index]].position);
        //     console.log("COLUMN_ID-FINISH", this.props.columns[newColumnOrder[destination.index]].columnId);
        //     await columnsApi.updateColumnsPosition(
        //         this.props.columns[newColumnOrder[source.index]].columnId,
        //         this.props.columns[newColumnOrder[destination.index]].columnId,
        //         this.props.columns[newColumnOrder[source.index]].position,
        //         this.props.columns[newColumnOrder[destination.index]].position
        //         )
        //     let projectId = this.props.match.params.projectId;
        //
        //     console.log("PROJECTID", projectId);
        //     this.props.getColumns(projectId);
        //     console.log("newColumnOrder", newColumnOrder)
        //     console.log("source.index", source.index)
        //
        //
        //     console.log("destination.index", destination.index)
        //     // newColumnOrder.splice(source.index, 1);
        //     // newColumnOrder.splice(destination.index, 0, draggableId);
        //     //
        //     // const newState = {
        //     //     ...state,
        //     //     columnOrder: newColumnOrder
        //     // }
        //     // return newState;
        // }




        if(type === 'column') {
            const cloneObjColumns = JSON.parse(JSON.stringify(this.props.columns));
            // const cloneObjColumnsTmp = JSON.parse(JSON.stringify(this.props.columns));
            // const cloneColumnOrderTmp = JSON.parse(JSON.stringify(this.props.columnOrder));
            console.log("cloneObjColumns", cloneObjColumns);
            // console.log(cloneColumnOrderTmp === this.props.columnOrder);
            cloneObjColumns[this.props.columnOrder[source.index]].position = this.props.columns[this.props.columnOrder[destination.index]].position
            if(destination.index > source.index) {
                for(let i = destination.index; i >= 0; i--) {
                    if(i === source.index) {
                        continue;
                    }
                    cloneObjColumns[this.props.columnOrder[i]].position = +cloneObjColumns[this.props.columnOrder[i]].position - 1;
                }
            }
            else {
                for(let i = destination.index; i < source.index; i++) {
                    cloneObjColumns[this.props.columnOrder[i]].position = +cloneObjColumns[this.props.columnOrder[i]].position + 1;
                }
            }
            console.log("[cloneObjColumns]", cloneObjColumns)
            const newColumnsTmp = Object.values(cloneObjColumns);

            const newColumns = newColumnsTmp.map((column, index) => ({
                columnId: column.columnId,
                position: column.position
            }));

            console.log("[newColumns]", newColumns);

            // newColumns[source.index].position = newColumns[destination.index].position;
            // for(let i = destination.index; i >= 0; i--) {
            //     newColumns[i].position -= 1;
            // }
            console.log("cloneObjColumns", cloneObjColumns);
            console.log("source.index", source.index)
            console.log("this.props.columnOrder;", this.props.columnOrder)
            console.log("destination.index", destination.index)
            console.log("newColumns", newColumns);
            // let sortedColumns = newColumns.map((column, index) => {
            //
            // })



            this.props.onDragEnd(result);
            this.props.onUpdateColumnsPosition(newColumns, projectId);
        }

        // this.props.columnOrder;


        // const {destination, source, draggableId, type} = result;
        //
        // if (!destination) {
        //     return;
        // }
        //
        // if (
        //     destination.droppableId === source.droppableId &&
        //     destination.index === source.index
        // ) {
        //     return;
        // }
        //
        //
        // if(type === 'column') {
        //     const newColumnOrder = Array.from(this.state.columnOrder);
        //     newColumnOrder.splice(source.index, 1);
        //     newColumnOrder.splice(destination.index, 0, draggableId);
        //
        //     const newState = {
        //         ...this.state,
        //         columnOrder: newColumnOrder
        //     }
        //     this.setState(newState);
        //     return;
        // }
        //
        // const start = this.state.columns[source.droppableId];
        // const finish = this.state.columns[destination.droppableId];
        //
        // if (start === finish) {
        //     const newTaskIds = Array.from(start.taskIds);
        //     newTaskIds.splice(source.index, 1);
        //     newTaskIds.splice(destination.index, 0, draggableId);
        //
        //     const newColumn = {
        //         ...start,
        //         taskIds: newTaskIds,
        //     };
        //
        //     const newState = {
        //         ...this.state,
        //         columns: {
        //             ...this.state.columns,
        //             [newColumn.id]: newColumn,
        //         },
        //     };
        //
        //     this.setState(newState);
        //     return;
        // }
        //
        // // Moving from one list to another
        // const startTaskIds = Array.from(start.taskIds);
        // startTaskIds.splice(source.index, 1);
        // const newStart = {
        //     ...start,
        //     taskIds: startTaskIds,
        // };
        //
        // const finishTaskIds = Array.from(finish.taskIds);
        // finishTaskIds.splice(destination.index, 0, draggableId);
        // const newFinish = {
        //     ...finish,
        //     taskIds: finishTaskIds,
        // };
        //
        // const newState = {
        //     ...this.state,
        //     columns: {
        //         ...this.state.columns,
        //         [newStart.id]: newStart,
        //         [newFinish.id]: newFinish,
        //     },
        // };
        // this.setState(newState);
    };

    // const [characters, updateCharacters] = useState(projects);
    //
    // const handleOnDragEnd = (result) => {
    //     const items = Array.from(characters);
    //     const [reorderItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderItem);
    //
    //     updateCharacters(items);
    // }
    //

    addNewColumn = (title, buttonName, projectListId, position) => {
        this.props.openModal(<EditModalContainer title={title} parameters={{projectListId, position, buttonName}}/>);
    };

    render() {

console.log("[dsds]",this.projectId);
        console.log("1111111111111111111", this.props)
        console.log("this.props.tasks", this.props.tasks);
        return <div >
            {this.props.taskInfo && this.props.isTaskInfo ? <TaskInfo/> : ''}
            <div className={this.props.isTaskInfo ? classes.map : ''}>
            <div onClick={() => {this.editProject("Edit project", "Save changes",  this.projectId, this.getProjectNameOrId().name)}}>{this.getProjectNameOrId().name}</div>
            <button onClick={() => {this.addNewColumn("Add new column", "Add new column", this.getProjectNameOrId().projectid)}}>New column</button>
            <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (


                    <div className={classes.container} {...provided.droppableProps} ref={provided.innerRef}>
                        {this.props.columnOrder.map((columnId, index) => {

                            const column = this.props.columns[columnId];
                            const tasks = column.taskIds.map(
                                taskId => {
                                    console.log("this.props.tasks", this.props.tasks)
                                    console.log("this.props.columns", this.props.columns)
                                    console.log("taskId", taskId)
                                    return this.props.tasks[taskId]
                                } ,
                            );
                            console.log("this.props.columns", tasks)
                            return <Columns taskInfo={this.props.taskInfo} addNewTask={this.props.addNewTask} setTaskInfo={this.props.setTaskInfo} onRemoveColumn={this.props.onRemoveColumn} projectId={this.props.location.aboutProps.projectId} onUpdateColumn={this.props.onUpdateColumn} isInput={this.props.isInput} changeIsInput={this.props.changeIsInput} key={column.id} column={column} tasks={tasks} index={index}/>;
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
            </div>
        </div>
        {/*<DragDropContext onDragEnd={handleOnDragEnd}>*/
        }
        {/*    <Droppable droppableId="characters">*/
        }
        {/*        {(provided) => (*/
        }
        {/*            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>*/
        }
        {/*                {characters.map((item, index) => {*/
        }
        {/*                    return <Draggable key={item.id} draggableId={String(item.id)} index={index}>*/
        }
        {/*                        {(provided) => (*/
        }
        {/*                            <li {...provided.draggableProps} {...provided.dragHandleProps}*/
        }
        {/*                                ref={provided.innerRef}>*/
        }
        {/*                                {1}*/
        }
        {/*                                /!*{item.tasks.map((task, index1) => {*!/*/
        }
        {/*                                /!*    return <Draggable key={task.id} draggableId={String(task.id)} index={index1}>*!/*/
        }
        {/*                                /!*        {(provided1) => (*!/*/
        }
        {/*                                /!*            <p {...provided1.draggableProps} {...provided1.dragHandleProps}*!/*/
        }
        {/*                                /!*               ref={provided1.innerRef}>{task.name}</p>*!/*/
        }
        {/*                                /!*        )}*!/*/
        }
        {/*                                */
        }
        {/*                            </li>*/
        }
        {/*                        )}*/
        }

        {/*                    </Draggable>*/
        }
        {/*                })}*/
        }
        {/*                {provided.placeholder}*/
        }
        {/*            </ul>*/
        }
        {/*        )}*/
        }
        {/*    </Droppable>*/
        }
        {/*</DragDropContext>*/
        }

    }
}

const mapStateToProps = (state) => ({
    columns: state.columnsPage.columns,
    columnOrder: state.columnsPage.columnOrder,
    tasks: state.columnsPage.tasks,
    projects: state.projectsPage.projects,
    isInput: state.columnsPage.isInput,
    taskInfo: state.columnsPage.taskInfo,
    isTaskInfo: state.columnsPage.isTaskInfo,
})


let AuthRedirectComponent = withAuthRedirect(Project);

export default connect(mapStateToProps, {addNewTask, setTaskInfo, getColumns, getAllTasks, onDragEnd, openModal, onUpdateColumnsPosition, onUpdateColumn, onRemoveColumn, changeIsInput})(AuthRedirectComponent);
//
// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import '../App.css';
//
// const finalSpaceCharacters = [
//     {
//         id: 'gary',
//         name: 'Gary Goodspeed',
//         thumb: '/images/gary.png'
//     },
//     {
//         id: 'cato',
//         name: 'Little Cato',
//         thumb: '/images/cato.png'
//     },
//     {
//         id: 'kvn',
//         name: 'KVN',
//         thumb: '/images/kvn.png'
//     },
//     {
//         id: 'mooncake',
//         name: 'Mooncake',
//         thumb: '/images/mooncake.png'
//     },
//     {
//         id: 'quinn',
//         name: 'Quinn Ergon',
//         thumb: '/images/quinn.png'
//     }
// ]
//
// function Projects() {
//     const [characters, updateCharacters] = useState(finalSpaceCharacters);
//
//     function handleOnDragEnd(result) {
//         if (!result.destination) return;
//
//         const items = Array.from(characters);
//         const [reorderedItem] = items.splice(result.source.index, 1);
//         items.splice(result.destination.index, 0, reorderedItem);
//
//         updateCharacters(items);
//     }
//
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>Final Space Characters</h1>
//                 <DragDropContext onDragEnd={handleOnDragEnd}>
//                     <Droppable droppableId="characters">
//                         {(provided) => (
//                             <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
//                                 {characters.map(({id, name, thumb}, index) => {
//                                     return (
//                                         <Draggable key={id} draggableId={id} index={index}>
//                                             {(provided) => (
//                                                 <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                                                     <div className="characters-thumb">
//                                                         <img src={thumb} alt={`${name} Thumb`} />
//                                                     </div>
//                                                     <p>
//                                                         { name }
//                                                     </p>
//                                                 </li>
//                                             )}
//                                         </Draggable>
//                                     );
//                                 })}
//                                 {provided.placeholder}
//                             </ul>
//                         )}
//                     </Droppable>
//                 </DragDropContext>
//             </header>
//             <p>
//                 Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
//             </p>
//         </div>
//     );
// }
//
// export default Projects;
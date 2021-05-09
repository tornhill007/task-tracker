import React from 'react';
import {connect} from "react-redux";
import EditModal from "./EditModal";
import {
    closeModal, createNewColumn
} from "../../../redux/reducers/columnsReducer";
import {createNewProject, editProject} from "../../../redux/reducers/projectsReducer";

let mapStateToProps = (state) => {
    return {
        // tasks: getAllTasks(state),
        columns: state.columnsPage.columns,
        columnsOrder: state.columnsPage.columnOrder,
    }
};


export default connect(mapStateToProps, {closeModal, createNewProject, editProject, createNewColumn})(EditModal);
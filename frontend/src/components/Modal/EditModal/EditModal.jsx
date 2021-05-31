import React from "react";
import {createNewProject} from "../../../redux/reducers/projectsReducer";

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        };

        this.changeText = this.changeText.bind(this);
    }

    close() {
        this.props.closeModal();
    }

    newRef = React.createRef();

    changeText(event) {
        this.setState({
            text: event.target.value
        });
    }

    createProject() {
        const {text} = this.state;
        this.props.createNewProject(text, this.props.userId);
        this.close();
    }

    save(id, event) {
        const {text} = this.state;
        const text1 = this.newRef.current.value;
        this.props.editProject(id, text1, this.props.userId);
        this.close();
    }

    createNewColumn(projectListId) {
        const {text} = this.state;

        let position;
        if(this.props.columnsOrder.length === 0) {
            position = 1;
        }
        else {
            position = this.props.columns[this.props.columnsOrder[this.props.columnsOrder.length-1]].position + 1;
        }

        this.props.createNewColumn(text, projectListId, position);
        this.close();
    }

    render() {

        return (
            <div>
                <div className="modal-body">
                    <textarea maxlength="30" ref={this.newRef} onChange={this.changeText} value={this.state.text} cols="40"/>
                </div>
                <div className="modal-footer">
                    {<button type="button" className="btn btn-primary" onClick={(e) => this.props.title === 'Edit project' ? this.save(this.props.id, e) : this.props.title === 'Add new column' ? this.createNewColumn(this.props.parameters.projectListId) : this.createProject()}>{this.props.parameters.buttonName}</button>}
                    <button type="button" className="btn btn-secondary" onClick={() => this.close()}>Close</button>
                </div>
            </div>
        )
    }
}

export default EditModal;
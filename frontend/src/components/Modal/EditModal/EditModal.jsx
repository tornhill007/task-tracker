import React from "react";
import {createNewProject} from "../../../redux/reducers/projectsReducer";

class EditModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // id: this.props.id,
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
        // const text1 = this.newRef.current.value;
        this.props.createNewProject(text, this.props.userId);
        this.close();
    }

    save(id, event) {
        const {text} = this.state;
        // this.setState({text: text});

        const text1 = this.newRef.current.value;
        console.log("event.target.value", text1);
        this.props.editProject(id, text1);
        this.close();
    }

    createNewColumn(projectListId) {
        // const projectId =
        const {text} = this.state;
        console.log("this.props.columns", this.props.columns)
        console.log("this.props.columnsOrder", this.props.columnsOrder)

        let position;
        if(this.props.columnsOrder.length === 0) {
            position = 1;
        }
        else {
            position = this.props.columns[this.props.columnsOrder[this.props.columnsOrder.length-1]].position + 1;
        }

        console.log("position", position)

        // this.setState({text: text});
        this.props.createNewColumn(text, projectListId, position);
        // const text1 = this.newRef.current.value;
        // console.log("event.target.value", text1);
        // this.props.editProject(id, text1);
        this.close();
    }


    render() {
console.log("[EDITMODAL]",this.props);
console.log("[text]",this.state.text);
        return (

            <div>
                <div className="modal-body">
                    {console.log("[2223232322]",this.props)}
                    <textarea maxlength="30" ref={this.newRef} onChange={this.changeText} value={this.state.text} cols="40"/>
                </div>
                <div className="modal-footer">
                    {/*{this.props.title === 'Edit project' ? <button type="button" className="btn btn-primary" onClick={(e) => this.save(this.props.id, e)}>Save changes</button> : <button type="button" className="btn btn-primary" onClick={() => this.createProject()}>Create new project</button>}*/}
                    {<button type="button" className="btn btn-primary" onClick={(e) => this.props.title === 'Edit project' ? this.save(this.props.id, e) : this.props.title === 'Add new column' ? this.createNewColumn(this.props.parameters.projectListId) : this.createProject()}>{this.props.parameters.buttonName}</button>}
                    <button type="button" className="btn btn-secondary" onClick={() => this.close()}>Close</button>
                </div>
            </div>
        )
    }
}

export default EditModal;
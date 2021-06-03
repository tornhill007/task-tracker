import React from "react";
import {createNewProject} from "../../../redux/reducers/projectsReducer";
import background1 from '../../../assets/image/background/background1.jpg';
import background2 from '../../../assets/image/background/background2.jpg';
import background3 from '../../../assets/image/background/background3.jpg';
import background4 from '../../../assets/image/background/background4.jpg';
import background5 from '../../../assets/image/background/background5.jpg';
import background6 from '../../../assets/image/background/background6.jpg';
import background7 from '../../../assets/image/background/background7.jpg';
import background8 from '../../../assets/image/background/background8.jpg';
import background9 from '../../../assets/image/background/background9.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import backgrounds from "../../../common/backgrounds/backgrounds";

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            selectedBackground: {
                background: background1,
                title: 'background1'
            },
            backgrounds: backgrounds
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
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
        if(!text) {
            return
        }
        this.props.createNewProject(text, this.props.userId, this.state.selectedBackground.title);
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
        if (this.props.columnsOrder.length === 0) {
            position = 1;
        } else {
            position = this.props.columns[this.props.columnsOrder[this.props.columnsOrder.length - 1]].position + 1;
        }

        this.props.createNewColumn(text, projectListId, position);
        this.close();
    }

    changeBackground(background) {
        this.setState({
            selectedBackground: background
        })
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.close();
        }
    }

    render() {

        return (
            <div  className={'mainWrap'}>
                <div ref={this.setWrapperRef} className='containerModal'>
                    <div  className={'wrapperModal'}>
                        <div
                            style={{background: `url(${this.state.selectedBackground.background})`}}
                            className={'wrapLeftModal'}>
                            <div className={'wrapBlockInput'}>
                                <input className={"inputModal"} placeholder={"Add header of task"} maxLength="30"
                                       ref={this.newRef} onChange={this.changeText} value={this.state.text}
                                       cols="40"/>
                                <FontAwesomeIcon onClick={() => this.close()} className={`cursorIcon fa-cm`}
                                                 icon={faTimes}/>
                            </div>
                            <div className="teamTitle">
                                <span>Me-Team</span>
                            </div>
                        </div>
                        <div className={'grid'}>
                            {this.state.backgrounds.map(background => <div onClick={() => {
                                this.changeBackground(background)
                            }} className={'imgPosition'}
                                                                           style={{background: `url(${background.background})`}}>{background.title === this.state.selectedBackground.title &&
                            <FontAwesomeIcon className={`colorCheck fa-cm`}
                                             icon={faCheck}/>}</div>)}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div>
                            {<button disabled={!this.state.text} type="button" className={`${!this.state.text && 'disabledItem'} btn btn-primary`}
                                     onClick={(e) => this.props.title === 'Edit project' ? this.save(this.props.id, e) : this.props.title === 'Add new column' ? this.createNewColumn(this.props.parameters.projectListId) : this.createProject()}>{this.props.parameters.buttonName}</button>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditModal;
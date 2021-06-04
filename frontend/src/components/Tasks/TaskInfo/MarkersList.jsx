import classes from "./ParticipantsList.module.css";
import React from "react";
import {connect} from "react-redux";
import {addNewParticipant, removeParticipant} from "../../../redux/reducers/usersReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {addNewMarker} from "../../../redux/reducers/columnsReducer";
import markers from '../../../common/markers'

class MarkersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHoveredMarker: [{isHover: false},{isHover: false},{isHover: false},{isHover: false}],
        }
    }

    checkMarkerInList(markers, marker) {
        if (markers === null) {
            return false;
        }
        let index = markers.indexOf(marker);
        if (index === -1) {
            return false
        } else {
            return true
        }
    }

    onAddNewMarker(newMarker, markers) {
        if (markers) {
            markers.push(newMarker);
        } else {
            markers = [newMarker];
        }
        this.props.addNewMarker(markers, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
    }

    onRemoveMarker(newMarker, markers) {
        let index = markers.indexOf(newMarker);
        if (index !== -1) {
            markers.splice(index, 1);
        }
        this.props.addNewMarker(markers, this.props.taskInfo.projectid, this.props.taskInfo.taskid);
    }


    render() {
        return (
            <div className={classes.itemWrap}>
                {markers.map((marker,index) => {
                    return <div key={index} onMouseOver={() => {
                        let newObj = Object.assign({}, this.state.isHoveredMarker);
                        newObj[index].isHover = true
                        this.setState({
                            isHoveredMarker: newObj
                        })
                    }} onMouseLeave={() => {
                        let newObj = Object.assign({}, this.state.isHoveredMarker);
                        newObj[index].isHover = false
                        this.setState({
                            isHoveredMarker: newObj
                        })
                    }}  style={{backgroundColor: marker.style, boxShadow: this.state.isHoveredMarker[index].isHover && `-8px 0 ${marker.shadow}`}} onClick={() => {
                        !this.checkMarkerInList(this.props.tasks[this.props.taskInfo.id].markers, marker.name) ? this.onAddNewMarker(marker.name, this.props.tasks[this.props.taskInfo.id].markers) : this.onRemoveMarker(marker.name, this.props.tasks[this.props.taskInfo.id].markers)
                    }} className={`${classes.itemNameMarker} ${classes.itemName}`}>
                        <div
                            className={`${classes.itemGroupLeftMarkers} ${classes.itemGroupLeft}`}>
                            <div>{marker.name}</div>
                        </div>
                        <div>
                            {this.checkMarkerInList(this.props.tasks[this.props.taskInfo.id].markers, marker.name) ?
                                <FontAwesomeIcon icon={faCheck}/> : ''}
                        </div>
                    </div>
                })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: state.columnsPage.tasks,
    taskInfo: state.columnsPage.taskInfo,
    participantOnTask: state.usersPage.participantOnTask,
})

export default connect(mapStateToProps, {addNewMarker})(MarkersList);

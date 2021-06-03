import React from "react";
import './style.css'

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {isOpen, content} = this.props.columnsPage;
        if (!isOpen) return null;

        return (
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close">
                                <span>&times;</span>
                            </button>
                        </div>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;
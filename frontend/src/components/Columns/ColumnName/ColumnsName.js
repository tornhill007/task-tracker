import React from "react";

class ColumnName extends React.Component {

    state = {
        isInput: false
    };

    onEditColumn() {
        this.setState({
            isInput: !this.state.isInput
        })
    }

    render() {
        return (
            <div>
                <input onBlur={() => this.onEditColumn()} autoFocus={true} value={this.props.column.name}/>
            </div>
        );
    }
}

export default ColumnName;
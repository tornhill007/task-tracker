import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    userName: state.auth.userName,
    userId: state.auth.userId
});


export default connect(mapStateToProps, {})(HeaderContainer);
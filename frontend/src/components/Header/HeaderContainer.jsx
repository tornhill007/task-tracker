import React from 'react';
import Header from "./Header";
// import {logout} from "../../redux/authReducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {

    render() {

        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    // login: state.auth.login,
    // isAuth: state.auth.isAuth
    token: state.auth.token,
    userName: state.auth.userName,
    userId: state.auth.userId
});


export default connect(mapStateToProps, {})(HeaderContainer);
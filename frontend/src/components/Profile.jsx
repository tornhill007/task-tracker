import React from 'react';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {connect} from "react-redux";

const Profile = (props) => {
    return <div className="App">
        <div>My Profile</div>
        <div>{props.userName}</div>
    </div>
}
let AuthRedirectComponent = withAuthRedirect(Profile);

const mapStateToProps = (state) => ({
    userName: state.auth.userName
})

export default connect(mapStateToProps, {})(AuthRedirectComponent);
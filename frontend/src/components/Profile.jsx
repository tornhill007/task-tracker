import React from 'react';
import {withAuthRedirect} from "../hoc/withAuthRedirect";

const Profile = (props) => {
    return <div className="App">
        Profile
    </div>
}
let AuthRedirectComponent = withAuthRedirect(Profile);

export default AuthRedirectComponent;
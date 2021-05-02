import React from 'react';
import {withAuthRedirect} from "../hoc/withAuthRedirect";

const Projects = (props) => {
    return <div className="App">
        Projects
    </div>
}

let AuthRedirectComponent = withAuthRedirect(Projects);

export default AuthRedirectComponent;
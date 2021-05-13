import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../utils/validator";
import classes from "./Login.module.css";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons'
import {login} from "../../redux/reducers/authReducer";

const LoginForm = (props) => {
    console.log(props)
    return <div className={classes.container}>

        <div className={classes.wrap}>
            <div>
                <h1 className={classes.title}>
                    Enter the Kanban
                </h1>
            </div>
            <form onSubmit={props.handleSubmit}>

                <Field placeholder={"Email"} name={"userName"} validate={[required]}
                       component={Input}/>


                <Field placeholder={"Password"} name={"password"}
                       type={"password"}
                       validate={[required]}
                       component={Input}/>

                <div>

                    <input value="Sign in" type="submit" className={`${classes.padding} ${classes.marginButton}`}/>

                </div>
                <div className={classes.topBorderItem}>
                <NavLink to={"/register"} className={classes.itemText}>
                    <span>
                        Sign up your account
                    </span>
                </NavLink>
                </div>
                {/*<a href="#">Forgot password?</a>*/}

            </form>
        </div>
    </div>
}


// const LoginForm = (props) => {
//     console.log(props)
//     return <div className={classes.container}>
//         <div className={classes.wrap}>
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxd34nv00X_fav1iySEezHQCEqRgYDM16tyCM96R2am7AxHknV&s" alt="men"/>
//             <form onSubmit={props.handleSubmit}>
//                 <div className={classes.wrapperInput}>
//
//                     <div className={classes.iconContainer}>
//                         <div className={classes.iconWrapper}>
//                             <FontAwesomeIcon icon={faUser} className={classes.icon}/>
//                         </div>
//                         <Field placeholder={"Email"} className={classes.input} name={"userName"} validate={[required]}
//                                component={Input}/>
//                     </div>
//                     <div className={classes.iconContainer}>
//                         <div className={classes.iconWrapper}>
//                             <FontAwesomeIcon icon={faLock} className={classes.icon}/>
//                         </div>
//                         <Field placeholder={"Password"} className={classes.input} name={"password"}
//                                type={"password"}
//                                validate={[required]}
//                                component={Input}/>
//                     </div>
//                     <div>
//                         <button className={classes.submit}>Log in</button>
//                     </div>
//                     {/*<a href="#">Forgot password?</a>*/}
//                 </div>
//             </form>
//         </div>
//     </div>
// }

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    console.log("props", props)
    const onSubmit = async (formData) => {
        console.log("formData", formData);
        props.login(formData.password, formData.userName)
        // props.login(formData.email, formData.password, formData.rememberMe);
        // props.register(formData.password, formData.userName, formData.repeatPassword);
    }

    if (props.userData.token) {
        return <Redirect to={"/profile"}/>
    }
    return <div className={classes.wrapMain}>
        <div className={classes.wrapper}>
            <div className={classes.wrapImg}>
                <img className={classes.img}
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNUxN5rgp6-XjJAdTAL7SIGuRQ_kUn_Er26bpuHbDktZAeplukGmP7rTUlf7PKAE1TTlA&usqp=CAU"
                     alt=""/>
            </div>
            <div className={classes.wrapTitle}><h1>Kanban Board</h1></div>

        </div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>

    // const register = async (password, userName) => {
    //     try {
    //         let response = await authAPI.register(password, userName);
    //         console.log("123", response);
    //         if (response.statusText === 'OK') {
    //             alert('you have registered')
    //         }
    //         else {
    //             alert(2)
    //             let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
    //             alert(message);
    //             // dispatch(stopSubmit("login", {_error: message}))
    //         }
    //     }
    //     catch (err) {
    //         alert(err.response.data.message);
    //     }

}

const mapStateToProps = (state) => ({
    userData: state.auth
})

export default connect(mapStateToProps, {login})(Login);
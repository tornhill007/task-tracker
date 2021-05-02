import React from 'react';
import {authAPI} from "../../api/api";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../utils/validator";
import classes from "./Register.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {reset} from 'redux-form';
import {connect} from "react-redux";
import {register} from "../../redux/reducers/authReducer";
import {Redirect} from "react-router-dom";

const RegisterForm = (props) => {
    console.log(props)
    return <div className={classes.container}>
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxd34nv00X_fav1iySEezHQCEqRgYDM16tyCM96R2am7AxHknV&s"
            alt="men"/>
        <form onSubmit={props.handleSubmit}>
            <div className={classes.wrapperInput}>

                <div className={classes.iconContainer}>
                    <div className={classes.iconWrapper}>
                        <FontAwesomeIcon icon={faUser} className={classes.icon}/>
                    </div>
                    <Field placeholder={"User name"} className={classes.input} name={"userName"} validate={[required]}
                           component={Input}/>
                </div>

                <div className={classes.iconContainer}>
                    <div className={classes.iconWrapper}>
                        <FontAwesomeIcon icon={faLock} className={classes.icon}/>
                    </div>
                    <Field placeholder={"Password"} className={classes.input} name={"password"} type={"password"}
                           validate={[required]}
                           component={Input}/>
                </div>
                <div className={classes.iconContainer}>
                    <div className={classes.iconWrapper}>
                        <FontAwesomeIcon icon={faLock} className={classes.icon}/>
                    </div>
                    <Field placeholder={"Repeat password"} className={classes.input} name={"repeatPassword"}
                           type={"password"}
                           validate={[required]}
                           component={Input}/>
                </div>
                {props.error && <div className={classes.formError}>{props.error}</div>}
                <div>
                    <button className={classes.submit}>Sign up</button>
                </div>
            </div>
        </form>
    </div>
}

const RegisterReduxForm = reduxForm({form: 'register'})(RegisterForm)

const Register = (props) => {
    console.log(props)
    const onSubmit = async (formData) => {
        console.log(formData);
        props.register(formData.password, formData.userName, formData.repeatPassword);
    }

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
    if(props.userData.token) {
        return <Redirect to={"/profile"}/>
    }
    return <RegisterReduxForm onSubmit={onSubmit}/>
}

const mapStateToProps = (state) => ({
    userData: state.auth
})

export default connect(mapStateToProps, {register})(Register);
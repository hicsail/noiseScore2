// react
import React, { Component } from "react";
// local
import CustomInput from './CustomInput'

export default class CustomPasswordInput extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <CustomInput {...this.props} secureTextEntry={true}/>
        )
    }
}

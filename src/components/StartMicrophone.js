import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
IconFA.loadFont().then();

import { constants } from "../constants";

const startMicrophone = (props) => (

    <TouchableOpacity style={[styles.button, startStyle.buttonColor, props.customStyle]} onPress={() => props.startMeasurement()}>

        <IconFA
            name={'circle'}
            size={constants.width /5}
            color={constants.colors.brightGreen}
            backgroundColor='transparent'
        >
        </IconFA>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: constants.width / 2,
        width: constants.width / 2,  //The Width must be the same as the height
        borderRadius: constants.width /2, //Then Make the Border Radius twice the size of width or Height
        borderWidth: 8,
        borderColor: constants.colors.brightGreen

    },
    text: {
        color: 'white',
        fontSize: 30,
    },
});

const startStyle = StyleSheet.create({
    buttonColor: {
        backgroundColor: 'white',
    }
});

export default startMicrophone;

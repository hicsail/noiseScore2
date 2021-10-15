/* * * * *
  IMPORTS
* * * * * */
//react
import React from "react";
import { Image, Platform, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//node
import axios from "axios";

// local
import { constants } from "../constants";


// export let authStatus = false;
/* * * * *
  RENDER
* * * * * */
const assetsPath = '../../assets';
export default class Splashscreen extends React.Component {
    static authStatus = false;

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    resolve(this.AuthenticateUser());
                },
                1000
            )
        )
    };


    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    async AuthenticateUser() {
        return (
            AsyncStorage.getItem("userData", null).then(async function (ret) {
                let response = JSON.parse(ret);
                console.log(ret);

                if (ret) {
                    if (response['authHeader'] != null) {
                        // Verify user with sessions
                        var authHeader = response['authHeader'];
                        const header = {
                            'Content-Type': 'application/json',
                            'Authorization': authHeader
                        };


                        return axios.get('http://'+constants.IP_ADDRESS+'/api/sessions/my', { headers: header })
                            .then(function () {
                                return true;
                            })
                            .catch(function () {
                                return false;
                            })
                    }

                }
                return false;
            })

        )
    };

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const loadTime = this.performTimeConsumingTask();
        Splashscreen.authStatus = await this.AuthenticateUser();
        console.log(Splashscreen.authStatus);
        await loadTime;


        this.props.navigation.navigate(Splashscreen.authStatus ? 'Home' : 'UserLogin');


    }

    render() {
        return (
                <View style={styles.viewStyles}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Image
                            source={require(`${assetsPath}/splash-logo-transp.png`)}
                            style={{
                                flex: 1,
                                alignSelf: 'center',
                                resizeMode: 'contain',
                                width: constants.width - 40,
                            }}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Image
                            source={require(`${assetsPath}/splash-image-transparent.png`)}
                            style={{
                                flex: 1,
                                alignSelf: 'center',
                                resizeMode: 'contain',
                                width: constants.width - 40,
                            }}
                        />
                    </View>
                </View>
            // Platform.OS === 'ios' ?
            //     <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
            //         <Image
            //             source={require(`${assetsPath}/ajax-loader.gif`)}/>
            //     </View>
            //
            //     :
            //     <View style={styles.viewStyles}>
            //         <View style={{flex: 1, justifyContent: 'center'}}>
            //             <Image
            //                 source={require(`${assetsPath}/splash-logo-transp.png`)}
            //                 style={{
            //                     flex: 1,
            //                     alignSelf: 'center',
            //                     resizeMode: 'contain',
            //                     width: constants.width - 40,
            //                     // backgroundColor:'red'
            //                     // height: undefined,
            //                 }}
            //             />
            //         </View>
            //         <View style={{flex: 1, justifyContent: 'flex-end'}}>
            //             <Image
            //                 source={require(`${assetsPath}/splash-image-transparent.png`)}
            //                 style={{
            //                     flex: 1,
            //                     alignSelf: 'center',
            //                     resizeMode: 'contain',
            //                     width: constants.width - 40,
            //                     // backgroundColor:'red'
            //                     // height: undefined,
            //                 }}
            //             />
            //         </View>
            //     </View>
        );
    }
}

/* * * * *
  STYLES
* * * * * */
const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        // backgroundColor: 'orange'
    },
    textStyles: {
        // color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
};

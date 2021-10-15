/* * * * *
  IMPORTS
* * * * * */
// react
import React from 'react';
import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements/dist/input/Input";
import { CommonActions } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

// node
import axios from 'axios';

// local
import { constants } from "../constants";
import CustomButton from "../components/CustomButton";

/* * * * *
  RENDER
* * * * * */

const assetsPath = '../../assets';

export default class LoginScreen extends React.Component {

    // ------------ Initialise props and state with required fields ------------
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            checked: '',
        };
    }

    // ------------ Keychain methods for storing, retrieving and resetting user credentials,... ------------
    // ------------ used to implement remember password feature, more secure than AsyncStorage ------------
    save = async (accessControl) => {
        console.log(this.state);

        try {
            if (this.state.checked === 'checked') {
                await Keychain.setGenericPassword(
                    this.state.username,
                    this.state.password,
                );

            } else {
                this.reset().then(function () {
                }).done();
            }
        } catch (err) {
            console.log('Could not save credentials, ' + err);
        }
        // store "Remember password" checked status in async storage
        await AsyncStorage.setItem("checkBtn", this.state.checked).then(function () {
        }).done();

    };

    async load() {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                this.setState({...credentials});
            } else {
                console.log('No credentials stored.');
            }
        } catch (err) {
            console.log('Could not load credentials. ' + err);
        }
    }

    async reset() {
        try {
            await Keychain.resetGenericPassword();
            this.setState({
                username: '',
                password: '',
            });
        } catch (err) {
            console.log('Could not reset credentials, ' + err);
        }
    }

    componentDidMount() {
        // retrieve user credentials from keychain storage
        this.load().done();

        // retrieve "Remember password" checked status in async storage
        AsyncStorage.getItem('checkBtn', null).then(function (ret) {
            console.log(ret);
            this.setState({checked: (ret === null || ret === '') ? '' : ret})
        }.bind(this))
    }


    // called when login button is pressed
    submit() {

        // get user credentials from screen's state object
        const userCredentials = {
            username: this.state.username.replace(' ', ''),
            password: this.state.password.replace(' ', '')
        };
        const {navigate} = this.props.navigation;

        let thisVar = this; // need this for reference bc "this" changes within POST callback
        // check credentials and if correct redirect to the home screen, else display error message
        axios.post('http://' + constants.IP_ADDRESS + '/api/login', userCredentials)
            .then(function (response) {
                // --- Store User's data in async storage for future use ---
                let ret = response['data'];
                AsyncStorage.setItem("userData", JSON.stringify(ret));

                thisVar.save(userCredentials.username, userCredentials.password).done();
                // --- Navigate to the home screen --- (use a push to force rerender)
                thisVar.props.navigation.push('Home');

            })
            .catch(function (error) {

                Alert.alert("Invalid Credentials", "Your username or your password are incorrect. Try again.");
            });
    }

    render() {
        return (
            <KeyboardAvoidingView ContentContainerStyle={styles.wrapper}>
                <View style={styles.wrapper}>

                    {/* ------ Top main logo ------*/}
                    <View style={styles.imgWrapper}>
                        <Image style={styles.imgStyle}
                               source={require(`${assetsPath}/splash_logo.jpeg`)}
                        />
                    </View>

                    {/* ------ Input fields ------- */}
                    <View style={styles.inputs}>

                        {/* --- Username input box --- */}
                        <Input
                            placeholder='Username'
                            value={this.state.username}
                            rightIcon={{type: 'font-awesome', name: 'user'}}
                            onChangeText={(username) => this.setState({username})}
                        />

                        {/* --- Password input box --- */}
                        <Input
                            secureTextEntry={true}
                            autoCapitalize='none'
                            placeholder='Password'
                            value={this.state.password}
                            rightIcon={{type: 'font-awesome', name: 'lock'}}
                            onChangeText={(password) => this.setState({password})}
                        />

                        <CheckBox
                            style={{paddingHorizontal: 10}}
                            onPress={() => {
                                this.setState({
                                    checked: this.state.checked === 'checked' ? '' : 'checked'
                                })
                            }}
                            checked={this.state.checked === 'checked'}
                            title={"Remember me  "}
                            // leftTextStyle={{textAlign: 'right',}}
                            checkedColor={constants.colors.brightGreen}

                        />

                        {/* ---  Sign in button --- */}
                        <CustomButton
                            text="Sign In"
                            onPress={() => this.submit()}
                        />

                        <Text style={styles.centerTextStyle}>
                            - OR -
                        </Text>

                        {/* ---  Sign Up button --- */}
                        <CustomButton
                            text="Sign Up"
                            onPress={() => this.props.navigation.navigate("SignUp")}
                            customStyle={styles.signUpBtn}
                            customTextStyle={{color: constants.colors.brightGreen}}
                        />

                        {/* --- Forgot password clickable text --- */}
                        <Text
                            style={styles.centerTextStyle}
                            onPress={() => this.props.navigation.navigate("ForgotResetPassword")}
                        >
                            Forgot your password ? Click <Text style={styles.underlined}>here</Text> !
                        </Text>
                    </View>

                    {/* ------ Bottom secondary logo ------*/}
                    <View style={styles.imgWrapper}>
                        <Image style={styles.imgStyle}
                               source={require(`${assetsPath}/Splash-image-mini3.png`)}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}



/* * * * *
  STYLES
* * * * * */
const styles = StyleSheet.create({

    wrapper: {
        flexGrow: 1,
        minHeight: constants.height - 25,
        alignItems: 'stretch',
        alignContent: 'center',
        padding: 30,
        paddingBottom: 0,
        color:'red',
        backgroundColor: 'white'
    },

    imgWrapper: {flexGrow: 2,},

    imgStyle: {
        flexGrow: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    },

    inputs: {
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: 'stretch',
        alignContent: 'center',
    },

    underlined: {textDecorationLine: 'underline'},

    signUpBtn: {backgroundColor: 'white',},

    centerTextStyle: {alignSelf: 'center',},
});

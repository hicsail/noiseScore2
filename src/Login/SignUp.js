/* * * * *
  IMPORTS
* * * * * */
// react
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';

// node
import axios from 'axios';

// local files
import CustomButton from '../components/CustomButton'
import CustomHeader from '../components/CustomHeader'
import CustomInput from '../components/CustomInput'
import CustomPasswordInput from '../components/CustomPasswordInput'
import ProgressCircles from '../components/ProgressCircles'
import { constants } from "../constants";


export default class SignUp extends React.Component {


    constructor(props) {
        super(props);


        // ------ Setup inputs data and error messages ------
        this.inputs = {
            username: {
                label: 'Username',
                placeholder: 'Username',
                errors: {
                    empty: 'Please choose a username',
                    inuse: 'Someone is using that username already',
                }
            },
            password: {
                label: 'Password',
                placeholder: 'kWj3f19L',
                errors: {
                    empty: 'Please provide a password',
                    length: 'Your password must be 8 or more characters',
                    weak: 'Use at least 3 of capital, lower, numbers, symbols'
                }
            },
            confirmPass: {
                label: 'Confirm Password',
                placeholder: 'Retype your password',
                errors: {
                    empty: 'You need to confirm your password',
                    match: 'Your passwords don\'t match',
                }
            },
            email: {
                label: 'Email Address',
                placeholder: 'you@someone.com',
                errors: {
                    empty: 'Please provide your email address',
                    invalid: 'Please provide a valid email address',
                    inuse: 'This email is already registered '
                }
            },
            city: {
                label: 'City ',
                placeholder: 'Allston',
                errors: {
                    empty: 'Please provide your city of residence',
                    invalid: 'City does not match your zip code'
                }
            },
            state: {
                label: 'State',
                placeholder: 'MA',
                errors: {
                    empty: 'Please provide your state',
                    invalid: 'Your state does not match your zip code',
                }
            },
            zip: {
                label: 'Zip Code',
                placeholder: '02134',
                errors: {
                    empty: 'Please provide your zipcode',
                    invalid: 'Your zip code does match your state and city'
                }
            },

        };

        // ----- Instantiate input states and errors ------
        this.state = {
            username: '\t',
            usernameError: '',

            password: '\t',
            passwordError: '',

            confirmPass: '\t',
            confirmError: '\t',

            email: '\t',
            emailError: '',

            city: '\t',
            cityError: '',

            state: '\t',
            stateError: '',

            zip: '\t',
            zipError: '',

        };

        // ------ Bind this to handler methods ------
        this.UsernameHandle = this.UsernameHandle.bind(this);
        this.PasswordHandle = this.PasswordHandle.bind(this);
        this.ConfirmHandle = this.ConfirmHandle.bind(this);
        this.EmailHandle = this.EmailHandle.bind(this);
        this.CityHandle = this.CityHandle.bind(this);
        this.StateHandle = this.StateHandle.bind(this);
        this.ZipHandle = this.ZipHandle.bind(this);
    }

/* * * * * *
  HANDLERS
* * * * * */
    UsernameHandle(e) {
        this.setState({username: e});
        if (e === '')
            this.setState({usernameError: 'empty'});
        else
            this.setState({usernameError: ''});
    }

    PasswordHandle(e) {
        // --- Check password validity ---
        this.setState({password: e});
        if (e === '')
            this.setState({passwordError: 'empty'});
        else {
            this.setState({passwordError: SignUp.passStrength(e)});
        }

        // --- If confirm password has been edited, validate confirm password ---
        if (this.state.confirmPass !== '\t') {
            if (this.state.confirmPass !== e)
                this.setState({confirmError: 'match'});
            else
                this.setState({confirmError: ''});
        }
    }

    ConfirmHandle(e) {
        this.setState({confirmPass: e});
        if (e === '')
            this.setState({confirmError: 'empty'});
        else if (e !== this.state.password)
            this.setState({confirmError: 'match'});
        else
            this.setState({confirmError: ''});
    }

    EmailHandle(e) {
        this.setState({email: e});
        if (e === '')
            this.setState({emailError: 'empty'});
        else if (!this.validateEmail(e))
            this.setState({emailError: 'invalid'});
        else
            this.setState({emailError: ''});
    }

    CityHandle(e) {
        this.setState({city: e});
        if (e === '')
            this.setState({cityError: 'empty'});
        else
            this.setState({cityError: ''});
    }

    StateHandle(e) {
        this.setState({state: e});
        if (e === '')
            this.setState({stateError: 'empty'});
        else
            this.setState({stateError: ''});
    }

    ZipHandle(e) {
        this.setState({zip: e});
        if (e === '')
            this.setState({zipError: 'empty'});
        else
            this.setState({zipError: ''});
    }

/* * * * *
  HELPERS
* * * * * */

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static passStrength(password) {
        let conditions = 0;

        // password length must be at least 8
        if (password.length < 8) {
            return 'length';
        } else {

            // --- Set up password strength condition ---
            let matchedCase = [];
            matchedCase.push("[$@$!%*#?&]");    // special characters
            matchedCase.push("[A-Z]");          // uppercase characters
            matchedCase.push("[a-z]");          // lowercase characters
            matchedCase.push("[0-9]");          // numbers

            // count number of matched conditions
            for (let i = 0; i < matchedCase.length; i++) {
                if (new RegExp(matchedCase[i]).test(password)) {
                    conditions++;
                }
            }
        }

        // password must match at least 3 conditions
        if (conditions < 3)
            return 'weak';
        else
            return ''
    }

    // check form data validity
    async validCheck() {

        let response;

        // check if username/email in use
        let credentials = {
            email: this.state.email,
            username: this.state.username
        };

        // Call to the server
        response = await axios.post('http://' + constants.IP_ADDRESS + '/api/available', credentials)
            .then(async function (response) {
                return response;
            })
            .catch(function (error) {
                return {}
            });

        // If username is in use, set appropriate error
        if (this.state.username !== '' && this.state.username !== '\t') {
            if (!response.data['username']) {
                this.setState({usernameError: 'inuse'});
            }
        }

        // If email is in use, set appropriate error
        if (this.state.email !== '' && this.state.username !== '\t') {
            if (!response.data['email']) {
                this.setState({emailError: 'inuse'});
            }
        }
    };

    // check error field of all inputs
    errorCheck() {
        let errors = this.state.usernameError +
            this.state.passwordError + this.state.confirmError + this.state.emailError +
            this.state.cityError + this.state.stateError + this.state.zipError;
        return errors === '';
    }


    // navigate to next sign up screen
    async next() {
        const {navigate} = this.props.navigation;

        // need untouched fields to be empty to trigger error in handlers
        if (this.state.username === '\t')
            this.UsernameHandle('');
        if (this.state.password === '\t')
            this.PasswordHandle('');
        if (this.state.confirmPass === '\t')
            this.ConfirmHandle('');
        if (this.state.email === '\t')
            this.EmailHandle('');
        if (this.state.city === '\t')
            this.CityHandle('');
        if (this.state.state === '\t')
            this.StateHandle('');
        if (this.state.zip === '\t')
            this.ZipHandle('');

        // validate username/email (handles setting appropriate error messages)
        await this.validCheck();


        // check if any input handlers return with an error, otherwise proceed to next page
        if (this.errorCheck()) {
            // console.log('ready to store');

            // ------ Store user data in async storage for use in the last step of the signup process...
            // ---- ... and navigate to the next step of the signup process ------
            let signUpData = {
                'username': this.state.username.replace(' ', ''),
                'password': this.state.password.replace(' ', ''),
                'email': this.state.email.replace(' ', ''),
                'location': [this.state.city, this.state.state, this.state.zip]
            };
            AsyncStorage.setItem("formData", JSON.stringify(signUpData)).then(function () {
                navigate('SignUp2');
            });

        } else {
            Alert.alert("Invalid inputs", 'Please check the information you provided again.');
        }
    }


/* * * * *
  RENDER
* * * * * */
    render() {

        return (
            <View style={styles.container}>
                <CustomHeader showBack={true} showAccount={false} navigation={this.props.navigation} />
                <ProgressCircles totalSteps={4} currentStep={1}/>

                <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
                    {/*<ScrollView>*/}

                    {/*<View style={styles.wrapper}>*/}
                    <Text style={styles.textHeader}>
                        Set up your account
                    </Text>

                    {/* ------ Username input ------ */}
                    <CustomInput
                        label={this.inputs.username.label}
                        placeholder={this.inputs.username.placeholder}
                        errorMessage={this.inputs.username.errors[this.state.usernameError]}
                        controlFunc={this.UsernameHandle}
                    />

                    {/* ------ Password input ------ */}
                    <CustomPasswordInput
                        label={this.inputs.password.label}
                        placeholder={this.inputs.password.placeholder}
                        errorMessage={this.inputs.password.errors[this.state.passwordError]}
                        controlFunc={this.PasswordHandle}
                    />

                    {/* ------ Confirm password input ------ */}
                    <CustomPasswordInput
                        label={this.inputs.confirmPass.label}
                        placeholder={this.inputs.confirmPass.placeholder}
                        errorMessage={this.inputs.confirmPass.errors[this.state.confirmError]}
                        controlFunc={this.ConfirmHandle}
                    />


                    {/* ------ Email address input ------ */}
                    <CustomInput
                        label={this.inputs.email.label}
                        placeholder={this.inputs.email.placeholder}
                        errorMessage={this.inputs.email.errors[this.state.emailError]}
                        controlFunc={this.EmailHandle}
                    />

                    {/* ------ City input ------ */}
                    <CustomInput
                        label={this.inputs.city.label}
                        placeholder={this.inputs.city.placeholder}
                        errorMessage={this.inputs.city.errors[this.state.cityError]}
                        controlFunc={this.CityHandle}
                    />

                    {/* ------ State input ------ */}
                    <CustomInput
                        autoCapitalize='characters'
                        label={this.inputs.state.label}
                        placeholder={this.inputs.state.placeholder}
                        errorMessage={this.inputs.state.errors[this.state.stateError]}
                        controlFunc={this.StateHandle}
                    />

                    {/* ------ Zip input ------ */}
                    <CustomInput
                        label={this.inputs.zip.label}
                        placeholder={this.inputs.zip.placeholder}
                        errorMessage={this.inputs.zip.errors[this.state.zipError]}
                        controlFunc={this.ZipHandle}
                    />

                    <CustomButton
                        text="Next"
                        onPress={() => this.next()}
                        customStyle={styles.button}
                    />

                    {/*</View>*/}
                    {/* </ScrollView>*/}
                </KeyboardAwareScrollView>
            </View>
        );
    }
}


/* * * * *
  STYLES
* * * * * */
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {
        flexGrow: 1,
        // minHeight: height - 25,
        alignItems: 'stretch',
        paddingLeft: 30,
        paddingRight: 30,
        // alignContent: 'center',
    },

    textHeader: {
        fontFamily: 'Euphemia UCAS',
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10,
        color: constants.colors.darkGray,
        justifyContent: 'center',
        textAlignVertical: "center",
        textAlign: "center",
    },

    button: {
        marginBottom: 30,
        marginTop: 20,
    },
});

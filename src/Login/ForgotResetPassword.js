/* * * * *
  IMPORTS
* * * * * */
//react
import React from 'react';
import { Alert, View, ScrollView, StyleSheet } from 'react-native';
import { Input, Text } from 'react-native-elements';
import {KeyboardAwareScrollView} from "@codler/react-native-keyboard-aware-scroll-view";

// node
import axios from 'axios';

// local
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import { constants } from "../constants";

/* * * * *
  RENDER
* * * * * */
export default class ForgotResetPassword extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            key: '',
            email: '',
            password: '',
            confirmPassword: '',
            providedMail: false
        }
    }

    forgotPassword() {
        const data = { email: this.state.email };
        const { navigate } = this.props.navigation;
        // If mail exists, send verification token and return true, else return false;

        axios.post('http://' + constants.IP_ADDRESS + '/api/login/forgot', data)
            .then(function () {
                navigate('ResetPassword');
            })
            .catch(function () {
                Alert.alert("Verification Failed", "Invalid email. Please check and retry.")
            });

    }


    render() {
        return (

            <>
                <CustomHeader showAccount={false} showBack={true} navigation={this.props.navigation} />
                <KeyboardAwareScrollView contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <View style={{ marginHorizontal: 30, marginVertical: 'auto' }}>
                        <Input
                            autoCapitalize='none'
                            placeholder='Email'
                            rightIcon={{ type: 'font-awesome', name: 'envelope' }}
                            onChangeText={(email) => {
                                this.setState({ email });
                            }}
                        />

                        <CustomButton
                            text="Get token and reset password"
                            onPress={() => {
                                this.forgotPassword();
                            }}
                            customStyle={{ padding: 2, marginVertical: 10 }}
                        />


                        <Text style={{
                            textAlign: 'center', fontSize: constants.width / 24
                        }}>- OR -</Text>


                        <Text
                            style={{
                                textAlign: 'center', padding: 10, fontSize: constants.width / 25
                            }}>
                            Already have a retrieval token, click here
                        </Text>
                        <CustomButton
                            text="Reset password"
                            customStyle={{ padding: 2 }}
                            onPress={() => this.props.navigation.navigate('ResetPassword')}
                        />


                    </View>
                </KeyboardAwareScrollView>

            </>
        )
    }

}

/* * * * *
  STYLES
* * * * * */
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'red',
        flex: 1,
        // minHeight: height - 25,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        alignContent: 'center',
    },
});

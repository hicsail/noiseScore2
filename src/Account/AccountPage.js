/* * * * *
  IMPORTS
* * * * * */
// react
import React from 'react';
import { StyleSheet, Text, View, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import email from 'react-native-email';
// import { useNavigation }

// node
import axios from "axios";

// local
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import { constants } from "../constants";


/* * * * *
  RENDER
* * * * * */
export default class AccountPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userID: -1,
            userData: null
        };

    }


    componentDidMount() {
        // When the component mounts, gather the user data from local storage (AsyncStorage)
        // Store the data as a local variable
        AsyncStorage.getItem('userData', null).then(function (ret) {
            if (ret) {
                var response = JSON.parse(ret);
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                };
                console.log(response['user']['username']);
                this.setState({
                    username: response['user']['username'],
                    userID: response['user']['_id']
                });
                console.log(this.state)
            }
        }.bind(this));
        console.log(this.state)
    }


    // Helper function to remove local storage
    static async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (exception) {
            return false;
        }
    }

    logout() {
        // Function to log out and clear cookies (i.e. AsyncStorage)
        // Moves to LoginScreen.js
        const {navigate} = this.props.navigation;
        AsyncStorage.getItem('userData', null).then(function (ret) {
            if (ret) {
                console.log('in first callback, ret =', ret);
                // Get the auth header from storage
                var response = JSON.parse(ret);
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                };
                // Remove the cookie and make API call to log out
                AccountPage.removeItemValue("userData").then(function (ret) {
                    if (ret) {
                        console.log('in second callback, ret =', ret);
                        axios.delete('http://' + constants.IP_ADDRESS + '/api/logout', {headers : header})
                            .then(function () {
                                navigate("UserLogin");
                            })
                            .catch(function (error) {
                                console.log(error);
                                alert("Something went wrong!");
                                console.log(err);
                            });
                    } else {
                        alert("Error")
                    }
                });
            }
        }.bind(this));
    }

    sendDeleteEmail() {
        const { navigate } = this.props.navigation;
        AsyncStorage.getItem('userData', null).then(function (ret) {
            if(ret){
                var response = JSON.parse(ret);
                var userEmail = response['user']['email'];
                var username = response['user']['username'];
                console.log(username);
                console.log(userEmail);

                const receiver = 'noisescoreapp@gmail.com';
                email(receiver, {
                    subject: 'Requesting email deletion',
                    body: 'User ' + username + ' is withdrawing from the study and requesting their account to be deleted',
                    checkCanOpen: false
                }).catch((error) => {console.log('Failed to send email', error)});

            }
        }.bind(this))

        
    }

    deleteAccount(){
        const { navigate } =  this.props.navigation;
        AsyncStorage.getItem('userData',null).then(function (ret) {
            if(ret){
                //console.log("Received response from callback: ", ret);
                var response = JSON.parse(ret);
                var user = response['user'];
                var authHeader = response['authHeader'];
                var userID = user["_id"];
                console.log("User ID: ", response);
                console.log("Type: ", typeof(userID));
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                    'id' : userID,
                };

                if(userID == "000000000000000000000000"){
                    console.log("Cannot delete root");
                    return;
                } else {
                    axios.delete('http://' + constants.IP_ADDRESS + '/api/users/' + userID, {headers:header})
                    .then(function () {
                        console.log("Account deleted");
                        navigate("UserLogin");
                    })
                    .catch(function (err) {
                        Alert.alert("Something went wrong");
                        console.log(err);
                        return;
                    });
                }
                
            }else{
                console.log("No response from callback");
            }
        }); 
    }

    render() {
        AsyncStorage.getItem('userData', null).then(function (data) {
            console.log(data);
        });

        return (
            <>
                <CustomHeader showAccount={false} showBack={true} navigation={this.props.navigation}/>
                <View style={styles.container}>
                    <CustomButton
                        customStyle={styles.button}
                        text="Sign Out"
                        onPress={() => this.logout()}
                    />
                </View>
                <View styles={styles.container}>
                    <CustomButton
                        customStyle={styles.deleteButton}
                        text="Delete Account"
                        onPress={() => 
                            Alert.alert("Delete your account?", "You will be redirected to your mail app. After sending the email to us, it will take 1-2 business days to delete your account. Thank you for participating in the study!", 
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                },
                                {
                                    text: "Proceed",
                                    onPress: () => this.sendDeleteEmail()
                                },
                            ],
                            {cancelable: true}
                        )}
                    />
                </View>
            </>

        )
    }
}

/* * * * *
  STYLES
* * * * * */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30
    },

    textStyle: {
        textAlign: 'center',
        fontSize: constants.width / 17,
        marginVertical: 15,
    },

    button: {
        backgroundColor: '#4E5255',
        borderColor: '#4E5255'
    },
    deleteButton: {
        backgroundColor: 'red',
        borderColor: 'black',
        alignSelf: 'center',
        marginBottom: 10,
        
    },

});

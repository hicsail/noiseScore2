/* * * * *
  IMPORTS
* * * * * */
// react
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
                        axios.delete('http://' + constants.IP_ADDRESS + '/api/logout', {headers: header})
                            .then(function () {
                                navigate("UserLogin");
                            })
                            .catch(function (error) {
                                console.log(error);
                                alert("Something went wrong!");
                            });
                    } else {
                        alert("Error")
                    }
                });
            }
        }.bind(this));
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

});

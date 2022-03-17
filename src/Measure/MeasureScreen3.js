/* * * * *
  IMPORTS
* * * * * */
// react
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, StackActions } from '@react-navigation/native';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import IconFA from "react-native-vector-icons/FontAwesome";
IconFA.loadFont().then();

// node
import axios from "axios";

// local
import CustomHeader from '../components/CustomHeader';
import { constants } from "../constants";

/* * * * *
  RENDER
* * * * * */
export default class MeasureScreen3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            started: false
        };
    }

    clear = () => {
        this.setState({
            comment: '',
            started: false
        });
    };

    submit() {
        // Function to handle submitting a measurement
        // Get all needed data from local storage (AsyncStorage)
        // Make API call to input the measurement ('/api/inputMeasurement')
        console.log('in submit function');
        const { navigate } = this.props.navigation;
        var success = true;
        const thisRef = this;

        AsyncStorage.getItem('formData', null).then(function (ret) {
            var response = JSON.parse(ret);
            console.log('\nresponse data is :\n');
            console.log(response);
            if (this.state.comment.length > 0) {
                response["words"] = this.state.comment;
            } else {
                response["words"] = " ";
            }
            response['date'] = new Date();
            AsyncStorage.getItem('userData').then(function (ret2) {
                var userData = JSON.parse(ret2);
                response["username"] = userData['user']['username'];
                response["userID"] = userData['user']['_id'];

                constants.getCoordinates().then(position => {
                    // response['location'] = [position.coords.latitude+','+position.coords.longitude;
                    // Alert.alert(coordinates)
                    response['location'] = [position.coords.longitude, position.coords.latitude];
                    axios.post('http://' + constants.IP_ADDRESS + '/api/inputMeasurement', response)
                        .then(function (response1) {
                            AsyncStorage.setItem('refreshAccount', 'true');
                            // Done!
                            Alert.alert(
                                'Submitted Measurement',
                                'Thanks for contributing to the project!',
                                [
                                    { text: 'Continue' },
                                ],
                                { cancelable: false },
                            );
                            thisRef.props.navigation.navigate('Measure0', {fromSubmit: true});
                        })
                        .catch(function (error) {
                            success = false;
                        });
                }).catch(error => {
                    success = false;
                    Alert.alert('','Failed to record measurement. Please allow NoiseScore to access your location.');
                    thisRef.props.navigation.navigate('Measure0', {fromSubmit: true});
                });

            });
        }.bind(this)).then(function () {}.bind(this));
    }



    render() {
        return (
            <>
                <CustomHeader navigation={this.props.navigation} showBack={true} showAccount={false}/>
                <KeyboardAwareScrollView>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Add a comment.</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>(up to 140 characters)</Text>
                    </View>
                    <TextInput
                        multiline={true}
                        style={styles.textInput}
                        onChangeText={(comment) => {
                            this.setState({ comment });
                            this.state.started = true; }}
                        value={this.state.comment}
                        maxLength={140}
                        blurOnSubmit={true}
                    />

                    { this.state.started ?
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'stretch'
                        }}>

                            <TouchableOpacity
                                style={[styles.clearButton, this.state.started ? styles.darkButton : styles.disabledButton]}
                                onPress={() => this.clear()}>
                                <IconFA
                                    name={'trash'}
                                    color="white"
                                    style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        textAlign: 'left',
                                        fontSize: constants.width / 15
                                    }}/>
                                <Text style={{
                                    fontSize: constants.width / 15,
                                    color: 'white'
                                }}>Clear Comment</Text>
                            </TouchableOpacity>
                        </View> : null }



                    <View style={{ alignItems: 'flex-end' }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'stretch'
                            }}>
                            <TouchableOpacity
                                style={[styles.button, styles.darkButton]}
                                onPress={() => this.props.navigation.navigate('Measure2')}
                            >

                                <IconFA
                                    name={'arrow-left'}
                                    // size={width / 15}
                                    color="white"
                                    style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        textAlign: 'left',
                                        fontSize: constants.width / 15,
                                        // backgroundColor:'white'
                                    }}
                                />
                                <View style={{
                                    flex: 1,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        // flex: 3,
                                        // position: 'absolute',
                                        fontSize: constants.width / 15,
                                        // alignSelf: 'stretch',
                                        // textAlign: 'left',
                                        color: 'white',
                                        // backgroundColor:'red'
                                    }}>Back</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                // disabled={this.state.started}
                                onPress={() => this.submit()}
                            >

                                <View style={{
                                    flex: 1,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        // flex: 3,
                                        // position: 'absolute',
                                        fontSize: constants.width / 15,
                                        // alignSelf: 'stretch',
                                        // textAlign: 'left',
                                        color: 'white',
                                        // backgroundColor:'red'
                                    }}>Submit</Text></View>

                                <IconFA
                                    name={'paper-plane'}
                                    size={constants.width / 15}
                                    color="white"
                                    style={{flex: 1, alignSelf: 'center', textAlign: 'right'}}
                                />

                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </>

        );
    }
}

/* * * * *
  STYLES
* * * * * */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 26,
        color: "black"
    },
    textInput: {
        height: 200,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 26,
        marginLeft: 5,
        marginRight: 5,
    },

    button: {
        flex: 1,
        minHeight: 40,
        flexDirection: 'row',
        // justifyContent: 'center',

        alignSelf: 'stretch',
        // borderWidth: 2,
        borderRadius: 10,

        // borderColor: '#31BD4B',

        margin: 5,
        padding: 10,
    },

    submitButton: {
        backgroundColor: constants.colors.brightGreen,
        borderColor: constants.colors.brightGreen
    },

    darkButton: {
        backgroundColor: '#4E5255',
        borderColor: '#4E5255'
    },
    clearButton: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        minHeight: 40,
        minWidth: 120,
        marginLeft: 80,
        marginRight: 80,
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
    },
    disabledButton: {
        backgroundColor: '#B7BBBD',
        borderColor: '#B7BBBD'
    }
});

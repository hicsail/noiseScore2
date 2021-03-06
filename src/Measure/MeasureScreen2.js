/* * * * *
  IMPORTS
* * * * * */
// react
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconFA from "react-native-vector-icons/FontAwesome";
IconFA.loadFont().then();

// local
import CustomHeader from '../components/CustomHeader';
import SourceButton from '../components/SourceButton';
import { constants } from "../constants";

/* * * * *
  RENDER
* * * * * */
export default class MeasureScreen2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sources: [],
        };
    }

    // Helper function to add source
    addSource = (source) => {
        this.setState({
            sources: [...this.state.sources, source]
        });

    };

    // Helper function to remove source
    removeSource = (source) => {
        let sourcesArray = [...this.state.sources];
        const index = sourcesArray.indexOf(source);
        if (index > -1) {
            sourcesArray.splice(index, 1);
            this.setState({
                sources: sourcesArray
            })
        }
    };

    next() {
        // used to move to the next screen (MeasureScreen3.js)
        const { navigate } = this.props.navigation;
        // Need to add information about sources, save to local storage before moving
        if (this.state.sources.length === 0) {
            alert("Please select one source.");
        } else if (this.state.sources.length > 5) {
            alert("Please only select 5 sources.")
        } else {
            AsyncStorage.getItem('formData').then(function (ret) {
                var response = JSON.parse(ret);
                response["sources"] = this.state.sources;
                AsyncStorage.setItem("formData", JSON.stringify(response));
            }.bind(this)).then(function () {
                navigate('Measure3');
            }.bind(this));
        }
    }


    render() {

        // make source buttons
        let buttons = [];
        let count = 0;
        constants.NOISE_SOURCES.forEach((e) => {
            buttons.push(<SourceButton
                    key={count}
                    val={e.val}
                    text={e.text}
                    icon={e.icon}
                    sources={this.state.sources}
                    addSource={this.addSource}
                    removeSource={this.removeSource}
                />
            );
            count += 1;
        });

        return (
            <>
                <CustomHeader navigation={this.props.navigation} showBack={true} showAccount={false}/>
                <ScrollView>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Select all major sound sources: </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        {buttons}
                    </View>

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'stretch'
                        }}>
                        <TouchableOpacity

                            style={[styles.button, styles.clearButton]}
                            // disabled={this.state.started}
                            onPress={() => this.props.navigation.navigate('Measure1')}
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
                            onPress={() => this.next()}
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
                                }}>Next</Text></View>

                            <IconFA
                                name={'arrow-right'}
                                size={constants.width / 15}
                                color="white"
                                style={{ flex: 1, alignSelf: 'center', textAlign: 'right' }}
                            />

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </>

        );
    }
}

/* * * * *
  STYLES
* * * * * */
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    textContainer: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 26,
        color: "black"
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
    clearButton: {
        backgroundColor: '#4E5255',
        borderColor: '#4E5255'
    },
});

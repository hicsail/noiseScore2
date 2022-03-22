/* * * * *
  IMPORTS
* * * * * */
// react
import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { Avatar, Header, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont().then();

// node
import axios from 'axios';

// local
import { constants } from '../constants';
import CustomHeader from '../components/CustomHeader';

/* * * * *
  RENDER
* * * * * */
const assetsPath  = '../../assets';
class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "temp",
            userID: -1,
            userData: null
        };

    }

    componentDidMount() {
        // Add listener to notice when we need to reload data. Whenever we move to this screen
        // Also make API call to get all the users measurements and save it as a local variable

        // this.props.navigation.setParams({ account: this.account });
        // this.subs = [
        //     this.props.navigation.addListener('willFocus', () => this.updateData())
        // ];
        this.focusListener = this.props.navigation.addListener('focus',
            () => this.updateData());
        var self = this; // for 'this' scope change in callback
        // Get the information for the Account Screen
        AsyncStorage.getItem('userData').then(function (ret) {
            if (ret) {
                var response = JSON.parse(ret);
                var authHeader = response['authHeader'];
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                };
                this.setState({
                    username: response['user']['username'],
                    userID: response['user']['_id']
                }, function () {
                    // Now we need to get all their measurement information
                    var params = {
                        userID: this.state.userID,
                        username: this.state.username
                    };
                    axios.get('http://' + constants.IP_ADDRESS+ '/api/userMeasurements', {
                        headers: header,
                        params: params
                    }).then(function (ret) {
                        self.setState({
                            userData: ret['data']
                        });
                        console.log("\n\n\n\n\n\n\n\n");
                        console.log(ret['data'])
                    }).catch(function (error) {
                        // If there is an error sign out
                        alert(error);
                        this.props.navigation("SignedOut");
                    });
                });
            }
        }.bind(this));

        // AsyncStorage.getItem('refreshAccount').then(function (refresh) {
        //     console.log('ACCOUNT refresh', refresh);
        //     if (refresh === 'true') {
        //         self.updateData();
        //         AsyncStorage.setItem('refreshAccount', 'false');
        //     }
        // });
    }

    componentWillUnmount() {
        this.focusListener();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     let thisRef = this; // for 'this' scope change in callback
    //     AsyncStorage.getItem('refreshAccount').then(function (refresh) {
    //         console.log('ACCOUNT SCREEN - refresh account ', refresh);
    //         if (refresh === 'true') {
    //             thisRef.updateData();
    //             AsyncStorage.setItem('refreshAccount', 'false');
    //         }
    //     });
    // }

    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }


    moreInfo(data) {
        // Store the data we already have (the specific measurement)  and move to moreInfo.js
        AsyncStorage.setItem("moreInfo", JSON.stringify(data));
        const { navigate } = this.props.navigation;
        navigate("Account3");
    }

    generateData(data) {
        // Function that creates the iterator used to
        // generate what is displayed for the data. Used in the final render

        var dateFormat = require('dateformat');
        if (data != null) {
            var counter = -1;

            return data.reverse().map((data, i) => {
                if (data['rawData']["average"] < 10) {
                    return (
                        <ListItem key={i} onPress={() => {
                            this.moreInfo(data)
                        }}>
                            <Avatar source={require(`${assetsPath}/soft.png`)}/>
                            <ListItem.Content>
                                <ListItem.Title>{dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}</ListItem.Title>
                                <ListItem.Subtitle>{data['rawData']["average"].toString() + " dB " + "| " + data['sources'][0]}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron size={30} color="black" />
                        </ListItem>
                    )
                } else if (data['rawData']["average"] > 10 && data['rawData']["average"] < 40) {
                    return (
                        <ListItem key={i} onPress={() => {
                            this.moreInfo(data)
                        }}>
                            <Avatar source={require(`${assetsPath}/medium.png`)}/>
                            <ListItem.Content>
                                <ListItem.Title>{dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}</ListItem.Title>
                                <ListItem.Subtitle>{data['rawData']["average"].toString() + " dB " + "| " + data['sources'][0]}</ListItem.Subtitle>
                                {/*<ListItem*/}
                            </ListItem.Content>
                            <ListItem.Chevron color="black" />
                        </ListItem>
                    )
                } else {
                    return (
                        <ListItem key={i} onPress={() => {
                            this.moreInfo(data)
                        }}>
                            <Avatar source={require(`${assetsPath}/loud.png`)}/>
                            <ListItem.Content>
                                <ListItem.Title>{dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}</ListItem.Title>
                                <ListItem.Subtitle>{data['rawData']["average"].toString() + " dB " + "| " + data['sources'][0]}</ListItem.Subtitle>
                                {/*<ListItem*/}
                            </ListItem.Content>
                            <ListItem.Chevron size={5} color="black" />
                        </ListItem>
                    )
                }
            });

            // return data.reverse().map((data) => {
            //     counter += 1;
            //     if (data['rawData']["average"] < 10) {
            //         return (
            //             <ListItem
            //                 key={counter}
            //                 leftAvatar={{ source: require(`${assetsPath}/soft.png`) }}
            //                 title={dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}
            //                 subtitle={data['rawData']["average"].toString() + " dB " + "| " + data['sources'][0]}
            //                 rightIcon={<Icon
            //                     name="arrow-right"
            //                     size={15}
            //                     color="#323232"
            //                 />}
            //                 onPress={() => {
            //                     this.moreInfo(data)
            //                 }}
            //             />
            //         )
            //     } else if (data['rawData']["average"] > 10 && data['rawData']["average"] < 40) {
            //         return (
            //             <ListItem
            //                 key={counter}
            //                 leftAvatar={{ source: require(`${assetsPath}/medium.png`) }}
            //                 title={dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}
            //                 subtitle={data['rawData']["average"].toString() + " dB " + "| " + data['sources'][0]}
            //                 rightIcon={<Icon
            //                     name="arrow-right"
            //                     size={15}
            //                     color="#323232"
            //                 />}
            //                 onPress={() => {
            //                     this.moreInfo(data)
            //                 }}
            //             />
            //         )
            //     } else {
            //         return (
            //             <ListItem
            //                 key={counter}
            //                 leftAvatar={{ source: require(`${assetsPath}/loud.png`) }}
            //                 title={dateFormat(data['date'], "ddd, mmm dS, yyyy, h:MM TT")}
            //                 subtitle={data['rawData']["average"].toString() + " dB " + "| " + data['sources'][0]}
            //                 rightIcon={<Icon
            //                     name="arrow-right"
            //                     size={15}
            //                     color="#323232"
            //                 />}
            //                 onPress={() => {
            //                     this.moreInfo(data)
            //                 }}
            //             />
            //         )
            //     }
            // });
        }
    }

    updateData() {
        // Function to update the data to show to the user
        // Makes API call '/api/userMeasurements' and
        // stores in local storage (AsyncStorage)

        // If we have the data to make the correct API call
        if (this.state.userID !== -1 && this.state.username !== "temp") {
            var self = this;
            var params = {
                userID: this.state.userID,
                username: this.state.username
            };
            // Update the userData by making the call 'api/userMeasurements'
            AsyncStorage.getItem('userData').then(function (ret) {
                if (ret) {
                    var response = JSON.parse(ret);
                    var authHeader = response['authHeader'];
                    const header = {
                        'Content-Type': 'application/json',
                        'Authorization': authHeader
                    };
                    axios.get('http://' + constants.IP_ADDRESS + '/api/userMeasurements', {
                        headers: header,
                        params: params
                    }).then(function (ret) {
                        self.setState({
                            userData: ret['data']
                        });
                        // this.generateData(self);
                    }).catch(function (error) {
                        alert(error);
                        this.props.navigation("SignedOut");
                    });
                }
            });

        }
    }

    render() {
        const { username } = this.state;
        var data = this.state.userData;
        var list = this.generateData(data);
        return (
            <View style={styles.container}>
                <CustomHeader showAccount={true} showBack={false} navigation={this.props.navigation}/>
                <ScrollView>
                    <View style={styles.container}>
                        {data && data.length === 0 ?
                            <Text style={{
                                fontSize: constants.width / 18,
                                textAlign: 'center',
                                color: constants.colors.darkGray,
                                fontWeight: 'bold',
                                margin: 10
                            }}>
                                Go record some measurements!{"\n"} They will appear here when you do.
                            </Text> :

                            list}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

/* * * * *
  STYLES
* * * * * */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: constants.colors.brightGreen,
    },
    button: {
        backgroundColor: '#323232'
    }
});


export default AccountScreen;

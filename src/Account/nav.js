/* * * * *
  IMPORTS
* * * * * */
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native"
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont().then();

import AccountPage from "./AccountPage";
import AccountScreen from "./AccountScreen";
import moreInfo from "./moreInfo";
import { constants } from "../constants";

/* * * * *
  RENDER
* * * * * */
const AccountStack = createNativeStackNavigator();
const assetsPath  = '../../assets';
export default function Account() {
    const navigation = useNavigation();
    // console.log(navigation);
    return (
        <AccountStack.Navigator initialRouteName="Account1" screenOptions={{headerShown: false}}>
            <AccountStack.Screen name="Account1" component={AccountScreen} />
            {/*<AccountStack.Screen name="Account1" component={AccountScreen} options={Account1NavOptions(navigation)}/>*/}
            <AccountStack.Screen name="Account2" component={AccountPage} />
            {/*<AccountStack.Screen name="Account2" component={AccountPage} options={getHeader(true)}/>*/}
            <AccountStack.Screen name="Account3" component={moreInfo} />
            {/*<AccountStack.Screen name="Account3" component={moreInfo} options={getHeader(true)}/>*/}
        </AccountStack.Navigator>
    );
}

function Account1NavOptions(navigation) {
    //return header with Custom View which will replace the original header
    // let values = ['one', 'two', 'three'];
    return {
        headerTitle: () =>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Account2')}
                    style={[styles.button]}
                >
                    <Icon
                        name="user-circle"
                        size={0.09 * constants.width}
                        color="white"
                    />
                </TouchableOpacity>
                <Image style={{ flex: 1, height: constants.height / 10 - 10, resizeMode: 'contain', marginRight: 75 }}
                       source={require(`${assetsPath}/logo-white.png`)}
                />
            </View>,
        headerStyle: {
            backgroundColor: constants.colors.brightGreen,
        }
            // {/*<View style={{flex: 1, flexBasis: 500, justifyContent: 'space-evenly', backgroundColor: constants.colors.brightGreen}}>*/}
            //
            // {/*    <TouchableOpacity style={{*/}
            // {/*        width: 0.15 * constants.width, height: constants.height / 12, marginLeft: '5%', marginTop: '5%',*/}
            // {/*    }}*/}
            // {/*                      onPress={() => navigation.navigate('Account2')}>*/}
            //
            // {/*        <Icon*/}
            // {/*            name="user-circle"*/}
            // {/*            size={0.09 * constants.width}*/}
            // {/*            color="white"*/}
            // {/*        />*/}
            //
            //
            // {/*    </TouchableOpacity>*/}
            //
            // {/*    <Image*/}
            // {/*        source={require(`${assetsPath}/logo-white.png`)}*/}
            // {/*        style={{ height: constants.height / 10 - 10, resizeMode: 'center', marginRight: 75}}*/}
            // {/*    />*/}
            // {/*</View>,*/}

            // height: 100,

    }
    // return {
    //
    //     headerTitleStyle: {
    //         flex: 1,
    //         height: null,
    //
    //         width: 0.7 * constants.width,
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //     },
    //     headerTitle:() => <Image style={{ flex: 1, height: constants.height / 10 - 10, resizeMode: 'contain' }}
    //                         source={require(`${assetsPath}/logo-white.png`)}
    //     />,
    //     headerStyle: {
    //         height: constants.height / 10, backgroundColor: constants.colors.brightGreen
    //     },
    //     headerRightStyle: {
    //         alignSelf: 'center',
    //         textAlign: "center",
    //         justifyContent: 'center',
    //         flex: 1,
    //         fontWeight: 'bold',
    //         textAlignVertical: 'center',
    //         backgroundColor: 'white'
    //     },
    //     headerRight: () =>
    //         <View></View>,
    //     headerLeft: () =>
    //         <TouchableOpacity style={{
    //             width: 0.15 * constants.width, height: constants.height / 12, margin: 5,
    //             justifyContent: 'center', alignItems: 'center',
    //         }}
    //                           onPress={() => navigation.navigate('Account2')}>
    //
    //             <Icon
    //                 name="user-circle"
    //                 size={0.09 * constants.width}
    //                 color="white"
    //             />
    //
    //
    //         </TouchableOpacity>,
    //
    //     headerTintColor: "white",
    // };

    // <div class = "container">
    //   <div class = "flexCol"></div>
    //   <div class = "flexCol" id = "smaller"></div>
    // </div>
    // CSS
    //
    // .container{
    //    display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //   -ms-flex-flow: row nowrap;
    //       flex-flow: row nowrap;
    //       background: #fff;
    //   width: 400px;
    //   height: 200px;
    // }
    //
    // .flexCol{
    //   flex: 1 1 auto;
    //   background: #f00;
    // }
    //
    // #smaller{
    //   flex: 2 1 auto;
    //   background: #0f0;
    //   height: 80%;
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
        backgroundColor: "aliceblue",
    },
    row: {
        // flexBasis: 500,
        // height: 50,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-evenly',
    },
    button: {
        // paddingHorizontal: 8,
        // paddingVertical: 6,
        // borderRadius: 4,
        // backgroundColor: "oldlace",
        // alignSelf: "flex-start",
        // marginHorizontal: "1%",
        // marginBottom: 6,
        // minWidth: "48%",
        // textAlign: "center",
    },
    selected: {
        backgroundColor: "coral",
        borderWidth: 0,
    },
    buttonLabel: {
        fontSize: 12,
        fontWeight: "500",
        color: "coral",
    },
    selectedLabel: {
        color: "white",
    },
});

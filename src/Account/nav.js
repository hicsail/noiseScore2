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
import MoreInfo from "./MoreInfo";
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
            <AccountStack.Screen name="Account3" component={MoreInfo} />
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
            

    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
        backgroundColor: "aliceblue",
    },
    row: {
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

import React from 'react';
import { Image, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MeasureScreen from "./MeasureScreen";
import MeasureScreen1 from "./MeasureScreen1";
import MeasureScreen2 from "./MeasureScreen2";
import { constants } from "../constants";
import MeasureScreen3 from "./MeasureScreen3";

const assetsPath = '../../assets';
const MeasureStack = createNativeStackNavigator();
export default function Measure() {
    return (
        <MeasureStack.Navigator initialRouteName="Measure0" screenOptions={{headerShown: false}}>
            <MeasureStack.Screen name="Measure0" component={MeasureScreen} />
            {/*<MeasureStack.Screen name="Measure0" component={MeasureScreen} options={getHeader(false)}/>*/}
            <MeasureStack.Screen name="Measure1" component={MeasureScreen1} />
            {/*<MeasureStack.Screen name="Measure1" component={MeasureScreen1} options={getHeader(true)}/>*/}
            <MeasureStack.Screen name="Measure2" component={MeasureScreen2} />
            {/*<MeasureStack.Screen name="Measure2" component={MeasureScreen2} options={Measure2NavOptions(false)}/>*/}
            <MeasureStack.Screen name="Measure3" component={MeasureScreen3} />
            {/*<MeasureStack.Screen name="Measure3" component={MeasureScreen3} options={Measure2NavOptions()}/>*/}
        </MeasureStack.Navigator>
    );
}

function Measure2NavOptions(rightComponent) {
    return {
        headerTitleStyle: {
            flex: 1,
            height: null,
            width: 0.7 * constants.width,
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerTitle:() => <Image style={{ flex: 1, width: 0.7 * constants.width, resizeMode: 'contain' }}
                            source={require(`${assetsPath}/logo-white.png`)}
        />,
        headerStyle: {
            height: constants.height / 10, padding: 5, backgroundColor: constants.colors.brightGreen
        },
        headerRightStyle: {
            alignSelf: 'center',
            textAlign: "center",
            justifyContent: 'center',
            flex: 1,
            fontWeight: 'bold',
            textAlignVertical: 'center',
            backgroundColor: 'white'
        },
        headerRight:() => rightComponent ? <View></View> : null,
        headerTintColor: "white",
    }
}


function Measure3NavOptions() {
    return {
        title: 'Comment',
        headerStyle: {
            backgroundColor: constants.colors.brightGreen
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
    }
}

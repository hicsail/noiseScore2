/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* * * * *
  IMPORTS
* * * * * */
// react
import React from 'react';
import { Image, LogBox, View } from 'react-native';
import { NavigationContainer, StackActions, useNavigationState } from '@react-navigation/native';
import { Header } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// font
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
Ionicons.loadFont().then(); // load fonts
Icon.loadFont().then();

// local files
import Account from './src/Account/nav'
import Login from './src/Login/nav'
import Map from './src/Map/nav'
import Measure from './src/Measure/nav'
import Splashscreen from './src/Login/Splashscreen';
import { constants } from './src/constants';

/* * * * *
  RENDER
* * * * * */
LogBox.ignoreLogs(['Warning: ...']);

export function getHeader(rightComponent) {
    return {
        headerTitle: () =>
            <View style={{flex: 1, flexBasis: 500, alignItems: 'center', backgroundColor: constants.colors.brightGreen}}>
                <Image
                    source={require('./assets/logo-white.png')}
                    style={{ height: constants.height / 10 - 10, resizeMode: 'contain', marginRight: 75, marginBottom: 10}}
                />
            </View>,

        headerStyle: {
            backgroundColor: constants.colors.brightGreen,
        },
    }
}

const Tab = createBottomTabNavigator();
function HomeScreen() {

    return (
        <Tab.Navigator
            initialRouteName="Map"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Map') {
                        iconName = focused
                            ? 'navigate'
                            : 'navigate-outline';
                    } else if (route.name === 'Measure') {
                        iconName = focused ? 'mic' : 'mic-outline';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: constants.colors.brightGreen,
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
        >
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Measure" component={Measure} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    )
}

const AppStack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <AppStack.Navigator initialRouteName="Splashscreen">
                <AppStack.Screen name="Splashscreen" component={Splashscreen} options={{ headerShown: false }} />
                <AppStack.Screen name="UserLogin" component={Login} options={{ headerShown: false }} />
                <AppStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}


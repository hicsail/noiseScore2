import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';

import LoginScreen from "./LoginScreen";
import SignUp from "./SignUp";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";
import TermsConditions from "./TermsConditions";
import ForgotResetPassword from "./ForgotResetPassword";
import ResetPassword from "./ResetPassword";


const LoginStack = createNativeStackNavigator();
export default function Login() {
    return (
        <LoginStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false, gestureEnabled: false}}>
            <LoginStack.Screen name="Login" component={LoginScreen}/>
            {/*<LoginStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>*/}
            <LoginStack.Screen name="SignUp" component={SignUp} />
            {/*<LoginStack.Screen name="SignUp" component={SignUp} options={getHeader(true)}/>*/}
            <LoginStack.Screen name="SignUp2" component={SignUp2} />
            {/*<LoginStack.Screen name="SignUp2" component={SignUp2} options={getHeader(true)}/>*/}
            <LoginStack.Screen name="SignUp3" component={SignUp3} />
            {/*<LoginStack.Screen name="SignUp3" component={SignUp3} options={getHeader(true)}/>*/}
            <LoginStack.Screen name="TermsConditions" component={TermsConditions} />
            {/*<LoginStack.Screen name="TermsConditions" component={TermsConditions} options={getHeader(true)}/>*/}
            <LoginStack.Screen name="ForgotResetPassword" component={ForgotResetPassword} />
            {/*<LoginStack.Screen name="ForgotResetPassword" component={ForgotResetPassword} options={getHeader(true)}/>*/}
            <LoginStack.Screen name="ResetPassword" component={ResetPassword} />
            {/*<LoginStack.Screen name="ResetPassword" component={ResetPassword} options={getHeader(true)}/>*/}
        </LoginStack.Navigator>
    );
}

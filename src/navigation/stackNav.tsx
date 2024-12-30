// navigation/StackNav.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Step1 from '../screens/step1';
import Step2 from '../screens/step2';
import Step3 from '../screens/step3';
import OrderSummary from '../screens/orderSummary';

const Stack = createStackNavigator();

const StackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="OrderSummary">
                <Stack.Screen options={{ headerShown: false }} name="OrderSummary" component={OrderSummary} />
                <Stack.Screen name="Step1" component={Step1} />
                <Stack.Screen name="Step2" component={Step2} />
                <Stack.Screen name="Step3" component={Step3} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNav;

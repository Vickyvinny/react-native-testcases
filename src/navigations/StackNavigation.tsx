import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import SampleFlatlist from '../screens/SampleFlatlist';
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="flatlist" component={SampleFlatlist} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import StackNavigation from './src/navigations/StackNavigation';
import {navigationRef} from './src/utils/NavigationConfig';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

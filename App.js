import React from 'react';
import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './src/HomeScreen';
import BuildAircraft from './src/BuildAircraft';
import TailNumbersList from './src/TailNumbersList';
import StationsConfigurationsList from './src/StationsConfigurationsList';
import StationConfigurationForm from './src/StationConfigurationForm';
import StationsConfigurationSpecificList from './src/StationsConfigurationSpecificList';

export default aviationwb = StackNavigator({
  Home: {screen:HomeScreen},
  BuildAircraft : {screen:BuildAircraft},
  TailNumbers : {screen:TailNumbersList},
  StationsConfigurationsList : {screen: StationsConfigurationsList},
  StationConfigurationForm : {screen: StationConfigurationForm},
  StationsConfigurationSpecificList : {screen: StationsConfigurationSpecificList},
});

AppRegistry.registerComponent('aviationwb',() => aviationwb);

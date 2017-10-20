import React from 'react';
import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './src/HomeScreen';
import BuildAircraft from './src/BuildAircraft';
import TailNumbersList from './src/TailNumbersList';
import StationsConfigurationsList from './src/StationsConfigurationsList';
import SCStationForm from './src/SCStationForm';
import StationsConfigurationSpecificList from './src/StationsConfigurationSpecificList';
import SCProfileForm from './src/SCProfileForm';

export default aviationwb = StackNavigator({
  Home: {screen:HomeScreen},
  BuildAircraft : {screen:BuildAircraft},
  TailNumbers : {screen:TailNumbersList},
  StationsConfigurationsList : {screen: StationsConfigurationsList},
  SCStationForm : {screen: SCStationForm},
  StationsConfigurationSpecificList : {screen: StationsConfigurationSpecificList},
  SCProfileForm : {screen: SCProfileForm},
});

AppRegistry.registerComponent('aviationwb',() => aviationwb);

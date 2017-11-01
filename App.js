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
import AirplaneSetupScreen from './src/AirplaneSetupScreen';
import TailNumberForm from './src/TailNumberForm';
import EnvelopeForm from './src/EnvelopeForm';
import EnvelopeProfilesList from './src/EnvelopeProfilesList';



export default aviationwb = StackNavigator({
  Home: {screen:HomeScreen},
  BuildAircraft : {screen:BuildAircraft},
  TailNumbers : {screen:TailNumbersList},
  StationsConfigurationsList : {screen: StationsConfigurationsList},
  SCStationForm : {screen: SCStationForm},
  StationsConfigurationSpecificList : {screen: StationsConfigurationSpecificList},
  SCProfileForm : {screen: SCProfileForm},
  AirplaneSetupScreen : {screen:AirplaneSetupScreen},
  TailNumberForm : {screen:TailNumberForm},
  EnvelopeForm : {screen:EnvelopeForm},
  EnvelopeProfilesList: {screen:EnvelopeProfilesList},
});

AppRegistry.registerComponent('aviationwb',() => aviationwb);

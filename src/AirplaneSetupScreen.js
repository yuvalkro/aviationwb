import React from 'react';
import {Text,View,Picker} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,SliderComp,PickerComp} from './components/common';
import realm from './RealmStationsConfiguration';

class AirplaneSetupScreen extends React.Component{

  static navigationOptions = ({ navigation }) => ({
    title: ` ${navigation.state.params.AirplaneModel}`,
    headerTitleStyle: {alignSelf: 'center'},
  });

  constructor(props) {
     super(props)
  }


  render(){

    const { navigate } = this.props.navigation;

    return(
      <View style={{alignItems:'stretch',justifyContent:'center',padding:45}}>

        <Button onPress={() => navigate('BuildAircraft')}>
          <Text>General Info</Text>
        </Button>

        <Button onPress={() => navigate('StationsConfigurationsList')}>
          <Text>Envelope Profiles</Text>
        </Button>

        <Button onPress={() => navigate('StationsConfigurationsList')}>
          <Text>Stations Configurations</Text>
        </Button>

      </View>
    )
  }
}

export default AirplaneSetupScreen;

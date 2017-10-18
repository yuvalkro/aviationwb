import React from 'react';
import {Text,View,Picker} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,SliderComp,PickerComp} from './components/common';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import realm from './RealmStationsConfiguration';

class StationConfigurationForm extends React.Component{

  static navigationOptions  = {title : 'Station',};

  constructor(props) {
     super(props)
     const { params } = this.props.navigation.state;

    //  if(params!=null)
    //     this.state = params.stationData;
    //   else
        this.state = {
          stationName:'',
          stationType:'',
          maxWeight:'',
          stationWeightUnit:'',
          stationArm:'',
          txt:''
        }
  }


  formSubmit(){

    //get next id
    let StationsConfigurations = realm.objects('StationsConfiguration');
    let ScSpecificProfile = StationsConfigurations.filtered('profileName = "'+this.props.navigation.state.ScProfileName+'"');
    //this.setState ({txt:JSON.stringify(ScSpecificProfile)});
    // let id = ScSpecific.max("id") ;
    // let nextId = id + 1;
   let ScSpecificProfileStations = ScSpecificProfile.stations;
   this.setState ({txt:JSON.stringify(ScSpecificProfile)});
      // realm.write(() => {
      //   ScSpecificProfileStations.push(this.state);
      //   this.props.navigation.navigate(navigate('StationsConfigurationSpecificList',{profileName :this.props.navigation.state.ScProfileName}));
      // });
  }

  render(){
    return(
      <View style={{padding:2}}>
      <Text>X{this.state.txt}X</Text>
      <Card>
        <CardSection>
          <Input
          label="Station Name"
          description="e.g. Pilot seat"
          onChangeText={(text) => this.setState({stationName: text})}
          value={this.state.stationName}
          />
        </CardSection>
        <CardSection>
          <PickerComp
          label="Station Type"
          itemsData={[ 'Crew', 'Passengers', 'Baggage' ,'Fluids' ,'Other' ,'Moving','Fuel']}
          onChangeText={(text) => this.setState({stationType: text})}
          value={this.state.stationType}
          />
        </CardSection>
        <CardSection>
          <PickerComp
          label="Station Unit"
          itemsData={[ 'US pound', 'Kilogram']}
          onChangeText={(text) => this.setState({stationWeightUnit: text})}
          value={this.state.stationWeightUnit}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Max Weight"
            onChangeText={(text) => this.setState({maxWeight: text})}
            value={this.state.maxWeight}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Station Arm (in)"
            onChangeText={(text) => this.setState({stationArm: text})}
            value={this.state.stationArm}
          />
        </CardSection>
        <CardSection>
          <Button
              onPress={this.formSubmit.bind(this)}
          >Save</Button>
        </CardSection>

      </Card>
      </View>
    )
  }
}

export default StationConfigurationForm;

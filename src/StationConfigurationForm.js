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
          stationTypes: [],
          stationWeightUnits:[]
        }
  }

 componentWillMount(){
    //loading station types
   let stationTypes = realm.objects('StationType');
   this.setState({stationTypes :  Object.values(stationTypes).map((element)=>element.typeName)});

   //loading station weights units
   let stationWeightUnits = realm.objects('StationWeightUnit');
   this.setState({stationWeightUnits :  Object.values(stationWeightUnits).map((element)=>element.stationWeightUnit)});

 }


  formSubmit(){

   let ScSpecificProfileStations = this.props.navigation.state.params.stations

   let nextId =  1;

   if(ScSpecificProfileStations!={})
   {
     let id = ScSpecificProfileStations.max("id") ;
     nextId = id + 1;
   }

   let newStation = {
     id:1,
     stationName:this.state.stationName,
     stationType:'Crew',
     maxWeight:this.state.maxWeight,
     stationWeightUnit:'Kilogram',
     stationArm:this.state.stationArm,
   }
      realm.write(() => {
        ScSpecificProfileStations.push(newStation);
        this.props.navigation.navigate(navigate('StationsConfigurationSpecificList',{profileName :this.props.navigation.state.params.ScProfileName}));
      });
  }

  render(){
    return(
      <View style={{padding:2}}>
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
          itemsData = {this.state.stationTypes}
          onChangeText={(text) => this.setState({stationType: text})}
          value={this.state.stationType}
          />
        </CardSection>
        <CardSection>
          <PickerComp
          label="Station Unit"
          itemsData={this.state.stationWeightUnits}
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

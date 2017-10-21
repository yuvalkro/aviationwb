import React from 'react';
import {Text,View,Picker} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,SliderComp,PickerComp} from './components/common';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import realm from './RealmStationsConfiguration';

class SCStationForm extends React.Component{

  static navigationOptions  = {title : 'Station',};

  constructor(props) {
     super(props)

     const { params } = this.props.navigation.state;

     if(params!=null)
        this.state = params.stationData;
      else
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
   this.setState({stationWeightUnits : Object.values(stationWeightUnits).map((element)=>element.weightUnit)});

 }


  formSubmit(){

    let ScSpecificProfileStations = this.props.navigation.state.params.stations


    // stationType:{id: 2 , typeName: 'Passengers'},
    // stationWeightUnit: {id: 1 , weightUnit: 'Kilogram'},
    // maxWeight:this.state.maxWeight,
    // stationArm:this.state.stationArm,


    let station = realm.objects('Station');

    let nextId = 1;
    if(station.length>0){
    let id = station.max("id") ;
    nextId = id + 1;
    }

    let newStation = {
     id:nextId,
     stationName:this.state.stationName,
     maxWeight:67,
     stationArm:43,
    }
    realm.write(() => {
        ScSpecificProfileStations.push(newStation);
        this.props.navigation.navigate('StationsConfigurationSpecificList',{profileName :this.props.navigation.state.params.ScProfileName,stations:ScSpecificProfileStations});
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
            value={this.state.maxWeight+''}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Station Arm (in)"
            onChangeText={(text) => this.setState({stationArm: text})}
            value={this.state.stationArm+''}
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

export default SCStationForm;

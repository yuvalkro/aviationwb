import React from 'react';
import {Text,View,Picker} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,SliderComp,PickerComp} from './components/common';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import Realm  from 'realm';


class StationType{}

StationType.schema = {
  name: 'StationType',
  primaryKey: 'id',
  properties:{
      id:    'int',    // primary key
      typeName : {type: 'string'},
  }
}
let realm = new Realm({schema: [StationType]});
let StationTypes = realm.objects('StationType'); 

var myJSON = JSON.stringify(StationTypes);


class StationConfigurationForm extends React.Component{
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
        stationArm:''
      }         
          
  }

  formSubmit(){
    

    //save station to local storage
    var storage = new Storage({
    	// maximum capacity, default 1000
    	size: 1000,
    	storageBackend: AsyncStorage,
    	defaultExpires: null,
    	enableCache: true
    })


  // load

  var ScKey = this.props.navigation.state.params.stationConfigurationName;
  ScKey = 'Main Profile';

  storage.load({
     key: 'stationsConfiguration',
     id: ScKey
      }).then(ret => {
         // found data goes to then()       
        stationConfiguration = ret;

        stationConfiguration.stations.push(this.state);
       
        storage.save({
          key: 'stationsConfiguration', 
          id: ScKey,	  
          data: stationConfiguration,
          expires: null
      });

      const { navigate } = this.props.navigation;      
      navigate('StationsConfigurationSpecificList',{stationConfigurationName :ScKey});


      }).catch(err => {
         console.warn(err.message);
         switch (err.name) {
             case 'NotFoundError':
                 // TODO;
                 break;
             case 'ExpiredError':
                 // TODO
                 break;
         }
      });
  }

  render(){
    return(
      <View style={{padding:2}}>
        <Text>{myJSON}</Text>
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

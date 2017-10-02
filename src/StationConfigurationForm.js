import React from 'react';
import {Text,View,Picker} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,SliderComp,PickerComp} from './components/common';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';



  // var stationConfiguration = {
  //     name: 'Main profile',
  //     stations: [
  //         {
  //         stationName : 'Pilot',
  //         stationType : 'Seat',
  //         stationWeightUnit : 'Kilogram',
  //         maxWeight   : '100',
  //         stationArm  :'43'
  //       },
  //       {
  //       stationName : 'Co-Pilot',
  //       stationType : 'Seat',
  //       stationWeightUnit : 'Kilogram',
  //       maxWeight   : '120',
  //       stationArm  :'65'
  //     }
  //   ]
  // };


class StationConfigurationForm extends React.Component{
  static navigationOptions  = {title : 'Station',};



  constructor(props) {
     super(props)
     this.state = {
       stationName:'',
       stationType:'',
       maxWeight:'',
       stationWeightUnit:'',
       stationArm:''
     }
  }

  formSubmit(){
  var stationConfiguration ;
    //save station to local storage
    var storage = new Storage({
    	// maximum capacity, default 1000
    	size: 1000,
    	storageBackend: AsyncStorage,
    	defaultExpires: null,
    	enableCache: true
    })


  // load
  storage.load({
     key: 'stationsConfiguration',
     id: 'Main Profile'
      }).then(ret => {
         // found data goes to then()
         console.log("ok1111");
         console.log(ret);
    stationConfiguration = ret;
    console.log("ok2222");
    console.log(stationConfiguration);
      }).catch(err => {
         // any exception including data not found
         // goes to catch()
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

    stationConfiguration.stations.push(this.state);

    storage.save({
      key: 'stationsConfiguration',  // Note: Do not use underscore("_") in key!
      id: 'Main Profile',	  // Note: Do not use underscore("_") in id!
      data: stationConfiguration,
      expires: null
  });

  //console.log(stationConfiguration);



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

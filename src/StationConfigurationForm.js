import React from 'react';
import {Text,View,Picker} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,SliderComp,PickerComp} from './components/common';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';



class StationConfigurationForm extends React.Component{
  static navigationOptions  = {title : 'Station',};

  constructor(props) {
     super(props)
     this.state = {
       stationArm:'',
       stationName:'',
       stationType:'',
       maxWeight:'',
       stationWeightUnit:''       ,
     }
  }

  formSubmit(){
    //save station to local storage
    var storage = new Storage({
    	// maximum capacity, default 1000
    	size: 1000,
    	storageBackend: AsyncStorage,
    	defaultExpires: null,
    	enableCache: true,
    	// if data was not found in storage or expired,
    	// the corresponding sync method will be invoked and return
    	// the latest data.
    	sync : {
    		// we'll talk about the details later.
    	}
    })

    // Save something with key only.
    // Something more unique, and constantly being used.
    // They are permanently stored unless you remove.
    storage.save({
    	key: 'stationCnonfiguration',   // Note: Do not use underscore("_") in key!
    	data: {
    		models: [
                  {key:'Cessna 120',tailNumbers :[{key:'N1234'},{key:'N9234'},{key:'N1217'},{key:'N1288'}]},
                  {key:'Cessna 150a',tailNumbers :[{key:'P1234'},{key:'N9234'},{key:'N1217'}]},
                  {key:'Cessna 172P',tailNumbers :[{key:'A1234'},{key:'N9234'}]},
                  {key:'Cessna 180',tailNumbers :[{key:'Z1234'}]},
                ]
    	},

    	// if not specified, the defaultExpires will be applied instead.
    	// if set to null, then it will never expire.
    	expires: 1000 * 3600
    });

    this.setState({...this.state,stationName:'Co-Pilot seat'});

  }

  render(){
    return(
      <View style={{padding:80}}>
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
          itemsData={[ 'Seat', 'Baggage', 'Fuel' ]}
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

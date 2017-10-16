import React from 'react';
import {View,Text,FlatList,Button,TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import Realm  from 'realm';


class StationsConfiguration{}

StationsConfiguration.schema = {
    name:'StationsConfiguration',
    primaryKey: 'id',
    properties: {
        id:    'int',    // primary key
        profileName: {type: 'string'},
        stations:    {type:'list', objectType: 'Station'},
    }
}

class Station{}

Station.schema = {
    name: 'Station',
    primaryKey: 'id',
    properties:{
        id:    'int',    // primary key
        stationName : {type: 'string'},
        stationType : {type:'list', objectType: 'StationType'},
        stationWeightUnit : {type:'list', objectType: 'stationWeightUnit'},
        maxWeight   : {type: 'int'},
        stationArm  : {type: 'float'},
    }
}

class StationType{}

StationType.schema = {
    name: 'StationType',
    primaryKey: 'id',
    properties:{
        id:    'int',    // primary key
        typeName : {type: 'string'},
    }
}

class stationWeightUnit{}

 stationWeightUnit.schema = {
     name: 'stationWeightUnit',
     primaryKey: 'id',
     properties:{
         id:    'int',    // primary key
         weightUnit : {type: 'string'},
     }
 }

let realm = new Realm({schema: [StationsConfiguration,Station,StationType,stationWeightUnit]});
let StationsConfigurations = realm.objects('StationsConfiguration');

var myJSON = JSON.stringify(StationsConfiguration);


class StationsConfigurationsList extends React.Component{

  constructor(props) {
     super(props)
    this.state = {stationsConfigurations : []}

     var storage = new Storage({
       // maximum capacity, default 1000
       size: 1000,
       storageBackend: AsyncStorage,
       defaultExpires: null,
       enableCache: true
     })
     // getIdsForKey
     storage.getIdsForKey('stationsConfiguration').then(ids => {
       this.setState({stationsConfigurations : ids});
       console.log(this.state.stationsConfigurations);
     });


  }
  static navigationOptions = ({ navigation }) => ({
    title: `Stations Configurations `,
    headerTitleStyle: {alignSelf: 'center'},
  });

  render(){
     const { params } = this.props.navigation.state;
     const { navigate } = this.props.navigation;
    return(
      <View>
      <Text>{myJSON}</Text>
      <Button
        onPress={() => navigate('SCAddProfile')}
        title="Add Profile"
        />
          <FlatList
            data={this.state.stationsConfigurations}
            renderItem={ ({item}) =>
                <TouchableOpacity onPress={() => navigate('StationsConfigurationSpecificList',{stationConfigurationName :item})}>
                <Text style={{fontSize:18, padding: 8}}>{item}</Text>
                  </TouchableOpacity>
          }
          keyExtractor={(item, index) => index}
          />
      </View>
    )
  }
}

export default StationsConfigurationsList;

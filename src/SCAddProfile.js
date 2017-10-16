import React from 'react';
import {View,Text,FlatList,Button,TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import {Card,CardSection,Input} from './components/common';
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

class StationsConfigurationsList extends React.Component{

  constructor(props) {
     super(props)
    this.state = {profileName : ''}
  }

  static navigationOptions = ({ navigation }) => ({
    title: `New Profile `,
    headerTitleStyle: {alignSelf: 'center'},
  });

  submit(){
    let realm = new Realm({schema: [StationsConfiguration,Station,StationType,stationWeightUnit]});
    realm.write(() => {
      realm.create('StationsConfiguration', {id: 1,profileName: this.state.profileName});
      this.props.navigation.navigate('StationsConfigurationsList');
    });
  }

  render(){
     const { params } = this.props.navigation.state;
     const { navigate } = this.props.navigation;
    return(
      <View>
        <Card>
          <CardSection>
            <Input
            label="Profile Name"
            description="e.g. Main Profile"
            onChangeText={(text) => this.setState({profileName: text})}
            value={this.state.profileName}
            />
          </CardSection>
          <CardSection>
            <Button
            //onPress={() => navigate('StationsConfigurationsList')}
            onPress={this.submit.bind(this)}
            title="Done"
            />
          </CardSection>
        </Card>
      </View>
    )
  }
}

export default StationsConfigurationsList;

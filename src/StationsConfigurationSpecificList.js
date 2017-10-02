import React from 'react';
import {View,Text,FlatList,Button,TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';





class StationsConfigurationsList extends React.Component{

  constructor(props) {
     super(props)
    this.state = {stations : []}

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
       console.log(this.state.stationsConfigurations)
     });


     // load
    storage.load({
        key: 'stationsConfiguration',
        id: 'Main Profile'
    }).then(ret => {
        // found data goes to then()
       this.setState({stations : ret.stations});
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


  }
  static navigationOptions = ({ navigation }) => ({
    title: ` ${navigation.state.params.stationConfugrationName}`,
    headerRight: (
      <Button
        title={'+'}
        onPress={() => navigation.navigate('BuildTailNumber')}
      />
    ),
  });

  render(){
     const { params } = this.props.navigation.state;
     const { navigate } = this.props.navigation;
    return(
      <View>
      <Button
        onPress={() => navigate('StationConfigurationForm')}
        title="Add Stations Configuration"
        />
          <FlatList
            data={this.state.stations}
            renderItem={ ({item}) =>
                <TouchableOpacity onPress={() => navigate('StationConfigurationForm',{station :item})}>
                <Text style={{fontSize:18, padding: 8}}>{item.stationName}</Text>
                  </TouchableOpacity>
          }
          />
      </View>
    )
  }
}

export default StationsConfigurationsList;

import React from 'react';
import {View,Text,FlatList,Button,TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import realm from './RealmStationsConfiguration';

var myJSON;

class StationsConfigurationsList extends React.Component{

  constructor(props) {
     super(props)
    this.state = {stationsConfigurations : []}

    let StationsConfigurations = realm.objects('StationsConfiguration');

    var arr = Object.keys(StationsConfigurations).map(function(k) { return StationsConfigurations[k] });
      myJSON = JSON.stringify(arr);
     this.setState({stationsConfigurations : arr});
    //  var storage = new Storage({
    //    // maximum capacity, default 1000
    //    size: 1000,
    //    storageBackend: AsyncStorage,
    //    defaultExpires: null,
    //    enableCache: true
    //  })
    //  // getIdsForKey
    //  storage.getIdsForKey('stationsConfiguration').then(ids => {
    //    this.setState({stationsConfigurations : ids});
    //    console.log(this.state.stationsConfigurations);
    //  });


  }

//loading exsiting profiles
  componentWillMount(){
    let StationsConfigurations = realm.objects('StationsConfiguration');
    //json => array
    var arr = Object.keys(StationsConfigurations).map(function(k) { return StationsConfigurations[k] });
    this.setState({stationsConfigurations : arr});
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
      <Button
        onPress={() => navigate('SCAddProfile')}
        title="Add Profile"
        />
          <FlatList
            data={this.state.stationsConfigurations}
            renderItem={ ({item}) =>
              <TouchableOpacity onPress={() => navigate('StationsConfigurationSpecificList',{profileName :item.profileName})}>
              <Text style={{fontSize:18, padding: 8}}>{item.profileName}</Text>
              </TouchableOpacity>
          }
          keyExtractor={(item, index) => item.id}
          />
      </View>
    )
  }
}

export default StationsConfigurationsList;

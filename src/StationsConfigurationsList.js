import React from 'react';
import {View,Text,FlatList,Button,TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';



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
  });

  render(){
     const { params } = this.props.navigation.state;
     const { navigate } = this.props.navigation;
    return(
      <View>
      <Button
        onPress={() => navigate('StationConfigurationForm')}
        title="Add Profile"
        />
          <FlatList
            data={this.state.stationsConfigurations}
            renderItem={ ({item}) =>
                <TouchableOpacity onPress={() => navigate('StationsConfigurationSpecificList',{stationConfigurationName :item})}>
                <Text style={{fontSize:18, padding: 8}}>{item}</Text>
                  </TouchableOpacity>
          }
          />
      </View>
    )
  }
}

export default StationsConfigurationsList;

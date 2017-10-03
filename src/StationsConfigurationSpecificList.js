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
console.log(props.navigation.state.params.stationConfigurationName);
     // load
    storage.load({
        key: 'stationsConfiguration',
        id: props.navigation.state.params.stationConfigurationName
    }).then(ret => {
        // found data goes to then()
        console.log(ret);
       this.setState({stations : ret.stations});
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
  static navigationOptions = ({ navigation }) => ({
    title: ` ${navigation.state.params.stationConfigurationName}`,
    headerTitleStyle: {alignSelf: 'center'},
  });

  render(){
     const { params } = this.props.navigation.state;
     const { navigate } = this.props.navigation;
    return(
      <View>
      <Button
        onPress={() => navigate('StationConfigurationForm',{ ScProfileName : params.stationConfigurationName})}
        title="Add Station"
        />
          <FlatList
            //keyExtractor={item => item.stationName}
            data={this.state.stations}
            renderItem={ ({item}) =>
                <TouchableOpacity onPress={() =>
                  navigate('StationConfigurationForm',
                  {stationData :item , ScProfileName : params.stationConfigurationName})}>
                  <Text style={{padding: 8}}>{item.stationName}</Text>
                </TouchableOpacity>
            }
            keyExtractor={(item, index) => index}
          />
      </View>
    )
  }
}

export default StationsConfigurationsList;

import React from 'react';
import {View,Text,FlatList,Button,TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import realm from './RealmStationsConfiguration';

class StationsConfigurationsList extends React.Component{

  constructor(props) {
     super(props)
     this.state = {stations : []}
  }

  //loading exsiting profile stations
    componentWillMount(){
      let StationsConfigurations = realm.objects('StationsConfiguration');
      let stations = StationsConfigurations.filtered('profileName = "'+this.props.navigation.state.profileName+'"');
      //json => array
      var arr = Object.keys(stations).map(function(k) { return stations[k] });
      this.setState({stations : arr});
    }


  static navigationOptions = ({ navigation }) => ({
    title: ` ${navigation.state.params.profileName}`,
    headerTitleStyle: {alignSelf: 'center'},
  });

  render(){
     const { params } = this.props.navigation.state;
     const { navigate } = this.props.navigation;
    return(
      <View>
      <Text>{this.state.stations}</Text>
      <Button
        onPress={() => navigate('StationConfigurationForm',{ ScProfileName : params.profileName})}
        title="Add Station"
        />
          <FlatList
            //keyExtractor={item => item.stationName}
            data={this.state.stations}
            renderItem={ ({item}) =>
                <TouchableOpacity onPress={() =>
                  navigate('StationConfigurationForm',
                  {stationData :item , ScProfileName : params.profileName})}>
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

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
      //json => array
      var stationsArr = Object.values(this.props.navigation.state.params.stations);
      this.setState({stations : stationsArr});
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
      <Button
        onPress={() => navigate('SCStationForm',{ScProfileName : params.profileName,stations:params.stations})}
        title="Add Station"
        />
          <FlatList
            //keyExtractor={item => item.stationName}
            data={this.state.stations}
            renderItem={ ({item}) =>
                <TouchableOpacity onPress={() =>
                  navigate('SCStationForm',
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

import React from 'react';
import {View,Text,FlatList,Button,TouchableOpacity,ScrollView } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import realm from './RealmStationsConfiguration';

class StationsConfigurationsList extends React.Component{

  constructor(props) {
     super(props)
    this.state = {stationsConfigurations : []}
  }

//loading exsiting profiles
  componentWillMount(){
    let StationsConfigurations = realm.objects('StationsConfiguration');
    var arr = Object.values(StationsConfigurations);
    this.setState({stationsConfigurations : arr});
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Stations Configurations `,
    headerTitleStyle: {alignSelf: 'center'}
  });

  deleteSCProfile(SCProfileId){
    let a = realm.objects('StationsConfiguration');
    let x = a.filtered('id =' + SCProfileId);
    realm.write(() => {
      realm.delete(x);
    });
    this.props.navigation.navigate('StationsConfigurationsList');
  }


  render(){
     const { params } = this.props.navigation.state;
     const { navigate } = this.props.navigation;
    return(
      <View>
      <Button
        onPress={() => navigate('SCProfileForm')}
        title="Add Profile"
        />
        <ScrollView>
          <FlatList
            data={this.state.stationsConfigurations}
            renderItem={ ({item}) =>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                <TouchableOpacity onPress={() => navigate('StationsConfigurationSpecificList',{profileName :item.profileName,stations: item.stations})}>
                  <Text style={{fontSize:18, padding: 8}}>{item.profileName}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.deleteSCProfile.bind(this,item.id)} >
                  <Text style={{fontSize:18, padding: 8}}>(DEL)</Text>
                </TouchableOpacity>
              </View>

          }
          keyExtractor={(item, index) => item.id}
          />
        </ScrollView>
      </View>
    )
  }
}

export default StationsConfigurationsList;

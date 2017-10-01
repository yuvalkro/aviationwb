import React from 'react';
import {View,Text,FlatList,Button} from 'react-native';
import {StackNavigator} from 'react-navigation';

class StationsConfigurationsList extends React.Component{

  static navigationOptions = ({ navigation }) => ({
    title: `Stations Configurations - ${navigation.state.params.airplaneModel}`,
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
            data={params.tailNumbers}
            renderItem={ ({item}) => <Text style={{fontSize:18, padding: 8}}>{item.key}</Text>}
          />
      </View>
    )
  }
}

export default StationsConfigurationsList;

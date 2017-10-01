import React from 'react';
import {View,Text,FlatList,Button} from 'react-native';
import {StackNavigator} from 'react-navigation';

class TailNumbersList extends React.Component{

  static navigationOptions = ({ navigation }) => ({
    title: `Tail Numbers - ${navigation.state.params.airplaneModel}`,
  });

  render(){
     const { params } = this.props.navigation.state;
    return(
      <View>
          <Button
            onPress={() => navigate('BuildTailNumber')}
            title="Add Tail Number"
            />
            <FlatList
              data={params.tailNumbers}
              renderItem={ ({item}) => <Text style={{fontSize:18, padding: 8}}>{item.key}</Text>}

            />
      </View>
    )
  }
}

export default TailNumbersList;

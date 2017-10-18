import React from 'react';
import {View,Text,FlatList,Button,TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import {Card,CardSection,Input} from './components/common';
import realm from './RealmStationsConfiguration';

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
    //get next id

    let StationsConfigurations = realm.objects('StationsConfiguration');

    // if(!(Object.keys(StationsConfigurations).length === 0 && StationsConfigurations.constructor === Object))
    // {
    let nextId = 1;
    let id = StationsConfigurations.max("id") ;
    nextId = id + 1;
    // }

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

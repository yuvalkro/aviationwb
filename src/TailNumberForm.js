import React from 'react';
import {Text,View,ScrollView,Modal,TouchableHighlight,TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,PickerComp} from './components/common';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import realm from './RealmStationsConfiguration';

class SCStationForm extends React.Component{

  static navigationOptions  = {
      title : 'New Tail Number',
      headerTitleStyle: {alignSelf: 'center'},
    };

  constructor(props) {
     super(props)

    //  const { params } = this.props.navigation.state;
     //
    //  if(params!=null)
    //     this.state = params.stationData;
    //   else
        this.state = {
          stationsConfigurations:[]
        }
  }

  setModalVisible(visible,modalTitle) {
    this.setState({modalVisible: visible, modalTitle});
  }

    componentWillMount(){
      //loading exsiting profiles
      let StationsConfigurations = realm.objects('StationsConfiguration');
      this.setState({stationsConfigurations :  Object.values(StationsConfigurations).map((element)=>element.profileName)});

    }


  formSubmit(){

    let ScSpecificProfileStations = this.props.navigation.state.params.stations

    let station = realm.objects('Station');

    let nextId = 1;
    if(station.length>0){
    let id = station.max("id") ;
    nextId = id + 1;
    }

    let newStation = {
     id:nextId,
     stationName:this.state.stationName,
     maxWeight:67,
     stationArm:43,
    }
    realm.write(() => {
        ScSpecificProfileStations.push(newStation);
        this.props.navigation.navigate('StationsConfigurationSpecificList',{profileName :this.props.navigation.state.params.ScProfileName,stations:ScSpecificProfileStations});
    });
  }

  render(){
    return(
      <ScrollView>
      <View style={{padding:2}}>
      <Card>
        <CardSection>
          <Input
          label="Tail Number:"
          description="e.g. N12345"
          onChangeText={(text) => this.setState({stationName: text})}
          value={this.state.stationName}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Remark:"
            description="(Optional)"
            onChangeText={(text) => this.setState({maxWeight: text})}
            value={this.state.maxWeight+''}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Empty Weight:"
            onChangeText={(text) => this.setState({stationArm: text})}
            value={this.state.stationArm+''}
          />
        </CardSection>
        <CardSection>
        <View style={{flex:1,flexDirection:'row'}}>
          <Input
            label="Empty Weight Arm:"
            onChangeText={(text) => this.setState({stationArm: text})}
            value={this.state.stationArm+''}
          />
          <Text>OR</Text>
          <Input
            label="Empty Weight Moment:"
            onChangeText={(text) => this.setState({stationArm: text})}
            value={this.state.stationArm+''}
          />
          </View>
        </CardSection>
        <CardSection>
          <PickerComp
          label="Stations Configuration Profile: "
          itemsData = {this.state.stationsConfigurations}
          onChangeText={(text) => this.setState({stationsConfigurations: text})}
          value={this.state.stationsConfigurations}
          />
          </CardSection>
          <CardSection>
            <PickerComp
            label="Envelope Profile: "
            itemsData = {this.state.stationsConfigurations}
            onChangeText={(text) => this.setState({stationsConfigurations: text})}
            value={this.state.stationsConfigurations}
            />
            </CardSection>
        
        <CardSection>
          <Button
              onPress={this.formSubmit.bind(this)}
          >Save</Button>
        </CardSection>
      </Card>
      </View>
      </ScrollView>
    )
  }
}

export default SCStationForm;

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
          tailNumber: '',
          remark: '',
          emptyWeight: '',
          emptyWeightArm: '',
          emptyWeightMoment: '',
          stationsConfigurations: '',
          envelopeProfile: '',
          stationsConfigurations:[],
          envelopeProfiles:[]
        }
  }

  setModalVisible(visible,modalTitle) {
    this.setState({modalVisible: visible, modalTitle});
  }

    componentWillMount(){
      //loading exsiting profiles
      let StationsConfigurations = realm.objects('StationsConfiguration');
      this.setState({stationsConfigurations :  Object.values(StationsConfigurations).map((element)=>element.profileName)});

    //  let airplaneId = this.props.navigation.state.params.airplaneId

    //  let airplane = realm.objects('Airplane').filtered('id=$0',airplaneId);

    }


  formSubmit(){

    let airplaneId = this.props.navigation.state.params.airplaneId

    let airplane = realm.objects('Airplane').filtered('id=$0',airplaneId);

    let tailNumbersForSpecific = airplane[0].tailNumbers;
    let tailNumbers = realm.objects('TailNumber');

    let nextId = 1;
    if(tailNumbers.length>0){
      let id = tailNumbers.max("id") ;
      nextId = id + 1;
    }

    let newTailNumber = {
     id:nextId,
     tailNumber:this.state.tailNumber,
     remark: this.state.remark,
     emptyWeight: '1200' ,
     emptyWeightArm: '50',
     emptyWeightMoment: '3000',
     scProfile: '1',
     envelopeProfile: '1',
    }
    realm.write(() => {
        tailNumbersForSpecific.push(newTailNumber);
    });
    this.props.navigation.navigate('Home',{airplaneModel :airplane[0].maker+ ' ' + airplane[0].model});
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
          onChangeText={(text) => this.setState({tailNumber: text})}
          value={this.state.tailNumber}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Remark:"
            description="(Optional)"
            onChangeText={(text) => this.setState({remark: text})}
            value={this.state.remark+''}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Empty Weight:"
            onChangeText={(text) => this.setState({emptyWeight: text})}
            value={this.state.emptyWeight+''}
          />
        </CardSection>
        <CardSection>
        <View style={{flex:1,flexDirection:'row'}}>
          <Input
            label="Empty Weight Arm:"
            onChangeText={(text) => this.setState({emptyWeightArm: text})}
            value={this.state.emptyWeightArm+''}
          />
          <Text>OR</Text>
          <Input
            label="Empty Weight Moment:"
            onChangeText={(text) => this.setState({emptyWeightMoment: text})}
            value={this.state.emptyWeightMoment+''}
          />
          </View>
        </CardSection>
        <CardSection>
          <PickerComp
          label="Stations Configuration Profile: "
          itemsData = {this.state.stationsConfigurations}
          onChangeText={(text) => this.setState({stationsConfiguration: text})}
          value={this.state.stationsConfiguration}
          />
          </CardSection>
          <CardSection>
            <PickerComp
            label="Envelope Profile: "
            itemsData = {this.state.envelopeProfiles}
            onChangeText={(text) => this.setState({envelopeProfile: text})}
            value={this.state.envelopeProfile}
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

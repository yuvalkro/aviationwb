import React from 'react';
import {Text,View,ScrollView,Modal,TouchableHighlight,TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,PickerComp} from './components/common';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import realm from './RealmStationsConfiguration';

class EnvelopeForm extends React.Component{

  static navigationOptions  = {
      title : 'New Envelope',
      headerTitleStyle: {alignSelf: 'center'},
      headerLeft:
      <TouchableOpacity style={{paddingRight:5}} onPress={() => navigation.navigate('EnvelopeForm',{})}>
        <Text>Done</Text>
    </TouchableOpacity>
    };

  constructor(props) {
     super(props)

    //  const { params } = this.props.navigation.state;
     //
    //  if(params!=null)
    //     this.state = params.stationData;
    //   else
        this.state = {
          profileName: '',
          maxRampWeight: '',
          weightUnit: '',
          armUnit: '',
          xAxisUseMoment: '',
          envelopeLayers:[],
        }
  }

getNextId(schemaName){
  let tailNumbers = realm.objects(schemaName);
  let nextId = 1;
  if(tailNumbers.length>0){
    let id = tailNumbers.max("id") ;
    nextId = id + 1;
  }
  return nextId;
}

componentWillMount(){}

  formSubmit(){

    let envelopesForSpecific =  this.props.navigation.state.params.envelopes

    let id = this.getNextId("Envelope");

    let newEnvelope = {
     id:id,
     profileName:   this.state.profileName ,
     maxRampWeight: this.state.maxRampWeight,
     weightUnit:    this.state.weightUnit,
     armUnit:       this.state.armUnit,
     xAxisUseMoment:this.state.xAxisUseMoment,
    }
    realm.write(() => {
        envelopesForSpecific.push(newEnvelope);
    });
    this.props.navigation.navigate('EnvelopeProfilesList',{envelopes :envelopesForSpecific});
  }

  render(){
    return(
      <ScrollView>
      <View style={{padding:2}}>
      <Card>
        <CardSection>
          <Input
          label="Profile Name:"
          onChangeText={(text) => this.setState({profileName: text})}
          value={this.state.profileName}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Max Ramp Weight:"
            onChangeText={(text) => this.setState({maxRampWeight: text})}
            value={this.state.maxRampWeight+''}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Weight Unit:"
            onChangeText={(text) => this.setState({weightUnit: text})}
            value={this.state.weightUnit}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Arm Unit:"
            onChangeText={(text) => this.setState({armUnit: text})}
            value={this.state.armUnit}
            />
        </CardSection>

            <CardSection>
          <Button onPress={this.formSubmit.bind(this)}>
            Save
          </Button>
        </CardSection>
      </Card>
      </View>
      </ScrollView>
    )
  }
}

export default EnvelopeForm;

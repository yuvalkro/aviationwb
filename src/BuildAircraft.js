import React from 'react';
import {Text,View,ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,SliderComp,PickerComp} from './components/common';

class BuildAircraft extends React.Component{
  static navigationOptions  = {title : 'Build Aircraft',};

  constructor(props) {
     super(props)

    //  const { params } = this.props.navigation.state;
     //
    //  if(params!=null)
    //     this.state = params.stationData;
    //   else
        this.state = {
          maker:'',
          model:''
        }
  }
  onEmailChange(text){
    this.props.emailChanged(text);
  }

  onPasswordChange(text){
    this.props.passwordChanged(text);
  }


  formSubmit(){

  }

  render(){
    return(
      <ScrollView>
      <View style={{flex:1,padding:5}}>
      <Card>
      <CardSection>
        <PickerComp
        label="Maker: "
        itemsData = {["Cessna","Piper","Boeing"]}
        onChangeText={(text) => this.setState({stationsConfigurations: text})}
        value={this.state.maker}
        />
        </CardSection>
        <CardSection>
          <PickerComp
          label="Model: "
          itemsData = {["172P","180","190"]}
          onChangeText={(text) => this.setState({stationsConfigurations: text})}
          value={this.state.model}
          />
          </CardSection>
        <CardSection>
          <Input
            label="Airplane Model"
            description="e.g. Cessna 172P"
            onChangeText={this.onEmailChange.bind(this)}
            value = {this.props.email}
          />
        </CardSection>
        <CardSection>
          <SliderComp
            label="Number of Seats/Paxs/Custom Stations"
            maximumValue={12}
            step={1}
          />
          </CardSection>
        <CardSection>
          <SliderComp
            label="Number of Baggage Stations"
            maximumValue={12}
            step={1}
          />
            </CardSection>
        <CardSection>
          <SliderComp
            label="Number of Fuel Stations"
            maximumValue={6}
            step={1}
          />
        </CardSection>

      <CardSection>
        <Input
          label="Maneuvering Speed (Va)"
          description="Va at Max Gross Weight"
          onChangeText={this.onEmailChange.bind(this)}
          value = {this.props.email}
        />
      </CardSection>
      <CardSection>
        <Input
          label="Weight of Fuel in 1 Gallon(lbs)"
          description="e.g. xxxx xxxxx xxxx xxx xxx "
          onChangeText={this.onEmailChange.bind(this)}
          value = {this.props.email}
        />
      </CardSection>
      <CardSection>
        <Button onPress={this.formSubmit.bind(this)}
        >Save</Button>
      </CardSection>
      </Card>
      </View>
      </ScrollView>
    )
  }
}

export default BuildAircraft;

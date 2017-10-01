import React from 'react';
import {Text,View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,SliderComp} from './components/common';

class BuildAircraft extends React.Component{
  static navigationOptions  = {title : 'Build Aircraft',};

  onEmailChange(text){
    this.props.emailChanged(text);
  }

  onPasswordChange(text){
    this.props.passwordChanged(text);
  }


  render(){
    return(
      <View style={{padding:5}}>
      <Card>
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
      </Card>
      </View>
    )
  }
}

export default BuildAircraft;

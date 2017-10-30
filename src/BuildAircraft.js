import React from 'react';
import {Text,View,ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Card,CardSection,Button,Input,SliderComp,PickerComp} from './components/common';
import realm from './RealmStationsConfiguration';

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
        aircraftMaker:'',
        aircraftModel:'',
        aircraftMakers:[],
        aircraftModels:[]
      }
  }
  onEmailChange(text){
    this.props.emailChanged(text);
  }

  onPasswordChange(text){
    this.props.passwordChanged(text);
  }

  componentWillMount(){
    //loading aircrafts makers and models
    let AircraftMaker = realm.objects('AircraftMaker');
    this.setState({aircraftMakers :  Object.values(AircraftMaker).map((element)=>element.makerName)});

    let AircraftModel = realm.objects('AircraftModel');
    this.setState({aircraftModels :  Object.values(AircraftModel).map((element)=>element.modelName)});
  }

  setAircraftModels(makerCode){
    let AircraftModel = realm.objects('AircraftModel').filtered('makerCode = "'+makerCode+'"' );
    this.setState({aircraftModels :  Object.values(AircraftModel).map((element)=>element.modelName)});
  }

  formSubmit(){
    //get next id

    let Airplanes = realm.objects('Airplane');

    let nextId = 1;
    if(Airplanes.length>0){
      let id = Airplanes.max("id") ;
      nextId = id + 1;
    }

      realm.write(() => {
        realm.create('Airplane', {
                                    id: nextId,
                                    maker: this.state.aircraftMaker,
                                    model: this.state.aircraftModel,
                                    tailNumbers :[]
                                  }
        );
      });
      this.props.navigation.navigate('Home');
  }

  render(){
    return(
      <ScrollView>
      <Text>{this.state.aircraftModels}</Text>
      <View style={{flex:1,padding:5}}>
      <Card>
      <CardSection>
        <PickerComp
        label="Maker: "
        itemsData = {this.state.aircraftMakers}
        onValueChange={(item) =>
          {
          this.setAircraftModels('CES');
          this.setState({aircraftMaker:item});
          }
        }
        selectedItem={this.state.aircraftMaker}
      />
        </CardSection>
        <CardSection>
          <PickerComp
          label="Model: "
          itemsData = {this.state.aircraftModels}
          onValueChange={(item) =>
            {
            // this.setAircraftModels('CES');
            // //this.setState({aircraftModels :  ["A","B"]});
           this.setState({aircraftModel:item});
            }
          }
          selectedItem={this.state.aircraftModel}
          />
          </CardSection>
        <CardSection>
          <Input
            label="Airplane Model"
            description="e.g. Cessna 172P"
            onChangeText={this.onEmailChange.bind(this)}
            value = {this.state.aircraftMaker +' ' + this.state.aircraftModel}
          />
        </CardSection>

      <CardSection>
        <Button
          onPress={this.formSubmit.bind(this)}
          >
          Save
        </Button>
      </CardSection>
      </Card>
      </View>
      </ScrollView>
    )
  }
}

export default BuildAircraft;

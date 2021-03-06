import React from 'react';
import {TouchableHighlight,Modal,View,Text,FlatList, TouchableOpacity,Image} from 'react-native';
import {Button} from './components/common';
import {StackNavigator} from 'react-navigation';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import realm from './RealmStationsConfiguration';


			// realm.write(() => {
			// 	//creating stations types
			// 	realm.create('StationType', {id: 1 , typeName: 'Crew'});
			// 	realm.create('StationType', {id: 2 , typeName: 'Passengers'});
			// 	realm.create('StationType', {id: 3 , typeName: 'Baggage'});
			// 	realm.create('StationType', {id: 4 , typeName: 'Moving'});
			// 	realm.create('StationType', {id: 5 , typeName: 'Fuel'});
			// 	realm.create('StationType', {id: 6 , typeName: 'Fluids'});
			// 	realm.create('StationType', {id: 7 , typeName: 'Other'});
			// 	//creating station weight units
			// 	realm.create('StationWeightUnit', {id: 1 , weightUnit: 'Kilogram'});
			// 	realm.create('StationWeightUnit', {id: 2 , weightUnit: 'Pounds'});
      //   //creating aircraft makers
      //   realm.create('AircraftMaker', {id: 1 , makerName: 'CESSNA', makerCode:'CES'});
			// 	realm.create('AircraftMaker', {id: 2 , makerName: 'PIPER', makerCode:'PIP'});
      //   realm.create('AircraftMaker', {id: 3 , makerName: 'BEECHCRAFT', makerCode:'BEE'});
      //   //creating aircraft models
      //   realm.create('AircraftModel', {id: 1 , modelName: '160', makerCode:'CES'});
      //   realm.create('AircraftModel', {id: 2 , modelName: '172', makerCode:'CES'});
      //   realm.create('AircraftModel', {id: 3 , modelName: '172P', makerCode:'CES'});
      //   realm.create('AircraftModel', {id: 4 , modelName: '180', makerCode:'CES'});
      //   realm.create('AircraftModel', {id: 5 , modelName: 'PA-16', makerCode:'PIP'});
      //   realm.create('AircraftModel', {id: 6 , modelName: 'PA-17', makerCode:'PIP'});
      //   realm.create('AircraftModel', {id: 7 , modelName: 'Bonanza', makerCode:'BEE'});
      //   realm.create('AircraftModel', {id: 8 , modelName: 'Baron', makerCode:'BEE'});
			// });


import Reactotron from 'reactotron-react-native'

class HomeScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      airplanesModels: [],
      modalVisible: false,
      modalTitle : '',
      airplaneId:'',
      airplane:{}
    };
  }

  static navigationOptions  = {
		title : 'Aviation W&B Calculator',
 		headerTitleStyle: {alignSelf: 'center'},
	};

	setModalVisible(visible,modalTitle,airplaneId) {
    this.setState({modalVisible: visible, modalTitle,airplaneId});
  }

  deleteAirplane(){
    realm.write(() => {
      let AirplaneToDelete = realm.objects('Airplane').filtered('id=$0', this.state.airplaneId);
      realm.delete(AirplaneToDelete);
    });
  //this.setState({modalVisible: false, modalTitle:''});
  }

  componentWillMount(){
      let Airplanes = realm.objects('Airplane').sorted(['maker','model']);
      this.setState({airplanesModels : Object.values(Airplanes)});
  }

  render(){
		Reactotron.log('hello rendering world');
    const { navigate } = this.props.navigation;
    return(
      <View style={{flex:1,  justifyContent: 'flex-start'}}>
      {/* <Text>{JSON.stringify(this.state.airplane)}</Text> */}
			<Modal
				 animationType="fade"
				 transparent={true}
				 visible={this.state.modalVisible}
				 onRequestClose={() => {alert("Modal has been closed.")}}
				 >
				<View style={{backgroundColor: '#00000080',flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
				 <View style={{
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 10,
 					  width: 280,
 					  height: 320,
            alignItems: 'center'
         }} >
           <Text style={styles.textStyle}>{this.state.modalTitle}</Text>
           <Button onPress={() => navigate('BuildAircraft')}>
             <Text>General Info</Text>
           </Button>
           <Button onPress={() => {
              this.setState({modalVisible:false});
              navigate('EnvelopeProfilesList',{envelopes:this.state.airplane.envelopes})
              }
             }>
             <Text>Envelope Profiles</Text>
           </Button>
           <Button onPress={() => {
               this.setState({modalVisible:false});
              navigate('StationsConfigurationsList',{envelopes:this.state.airplane.envelopes})
              }
            }>
             <Text>Stations Configurations</Text>
           </Button>
          <Button onPress={() => {
              this.setState({modalVisible:false});
              navigate('TailNumberForm',{airplaneId:this.state.airplaneId});
            }
          }>
            <Text>Add Tail Number</Text>
          </Button>
          {/*<Button onPress={() => {
              this.setModalVisible(!this.state.modalVisible,'');
              navigate('AirplaneSetupScreen',{AirplaneModel:this.state.modalTitle});
            }}>
            <Text>Setup</Text>
          </Button>
          */}
          <Button onPress={ this.deleteAirplane }>
            <Text>Delete</Text>
          </Button>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible,'')
              }}>
              <Text>[ Close ]</Text>
            </TouchableHighlight>

				 </View>
				</View>
			 </Modal>
       <View style={{ flexDirection:'row',justifyContent: 'space-between',padding:25}}>
        <TouchableHighlight onPress={() => navigate('BuildAircraft')}>
          <View>
            <Image style={styles.bigIconStyle} source={require('../img/icons/build_aircraft.png')} />
            <Text>Build Your {"\n"}Airplane</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigate('BuildAircraft')}>
          <View>
          <Image style={styles.bigIconStyle} source={require('../img/icons/template_library.png')} />
            <Text>Templates {"\n"}Library</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigate('BuildAircraft')}>
          <View>
          <Image style={styles.bigIconStyle} source={require('../img/icons/help.png')} />
            <Text>Help</Text>
            </View>
        </TouchableHighlight>
      </View>

          <FlatList
            //data={[{key:'Cessna 120'},{key:'Cessna 150a'},{key:'Cessna 172P'},{key:'Cessna 180'}]}
            ItemSeparatorComponent={ () => <View style={ { height: 1 } } /> }
            data={this.state.airplanesModels}
            renderItem={ ({item}) =>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',backgroundColor:'#616160',padding:10,paddingRight: 2}}>
                <TouchableOpacity onPress={() => navigate('TailNumbers',{airplaneModel :item.maker+ ' ' + item.model,tailNumbers:item.tailNumbers})}>
                  <Text style={{fontSize:16,  fontWeight:'500', color :'#fff'}}>{item.maker + ' ' + item.model}</Text>
                </TouchableOpacity>
                <Button onPress={() => {
                    this.setModalVisible(true,item.maker + ' ' + item.model,item.id)
                    this.setState({airplane:item})
                    }
                  }>
                  <Text>Actions</Text>
               </Button>
               </View>
               <View>
               <FlatList
                 data={item.tailNumbers}
                 renderItem={ ({item}) =>
                   <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',padding:8}}>
                      <Image style={styles.iconStyle} source={require('../img/icons/tail_number.png')} />
                      <Text style={{fontSize:16, padding: 2}}>{item.tailNumber}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',padding:8}}>
                      <Image style={styles.iconStyle} source={require('../img/icons/empty_star.png')} />
                      <Image style={styles.iconStyle} source={require('../img/icons/setup.png')} />
                      <Image style={styles.iconStyle} source={require('../img/icons/trash.png')} />
                    </View>
                  </View>
                }
                 keyExtractor={(item, index) => index}
               />
               </View>
              </View>
            }
						keyExtractor={(item, index) => index}
          />
      </View>
    )
  }
}

const styles = {
  textStyle:{
    alignSelf :'center',
    color :'#000',
    fontSize :16,
    fontWeight:'600',
    paddingTop:10,
    paddingBottom:10,
    paddingRight:14,
    paddingLeft:14
  },
  iconStyle:{
    width:25,
    height:25
  },
  bigIconStyle:{
    width:50,
    height:50
  }
}

export default HomeScreen;

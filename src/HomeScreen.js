import React from 'react';
import {TouchableHighlight,Modal,View,Text,FlatList, TouchableOpacity} from 'react-native';
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
			// });





import Reactotron from 'reactotron-react-native'



var storage = new Storage({
	// maximum capacity, default 1000
	size: 1000,

	// Use AsyncStorage for RN, or window.localStorage for web.
	// If not set, data would be lost after reload.
	storageBackend: AsyncStorage,

	// expire time, default 1 day(1000 * 3600 * 24 milliseconds).
	// can be null, which means never expire.
	defaultExpires: 1000 * 3600 * 24,

	// cache data in the memory. default is true.
	enableCache: true,

	// if data was not found in storage or expired,
	// the corresponding sync method will be invoked and return
	// the latest data.
	sync : {
		// we'll talk about the details later.
	}
})


// Save something with key only.
// Something more unique, and constantly being used.
// They are permanently stored unless you remove.
storage.save({
	key: 'aircrafts',   // Note: Do not use underscore("_") in key!
	data: {
		models: [
              {key:'Cessna 120',tailNumbers :[{key:'N1234'},{key:'N9234'},{key:'N1217'},{key:'N1288'}]},
              {key:'Cessna 150a',tailNumbers :[{key:'P1234'},{key:'N9234'},{key:'N1217'}]},
              {key:'Cessna 172P',tailNumbers :[{key:'A1234'},{key:'N9234'}]},
              {key:'Cessna 180',tailNumbers :[{key:'Z1234'}]},
                {key:'Cessna 2180',tailNumbers :[{key:'Z1234'}]},
                  {key:'Cessna 4180',tailNumbers :[{key:'Z1234'}]},
            ]
	},

	// if not specified, the defaultExpires will be applied instead.
	// if set to null, then it will never expire.
	expires: 1000 * 3600
});


class HomeScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      airplanesModels: [],
      modalVisible: false,
      modalTitle : ''
    };
  }

  static navigationOptions  = {
		title : 'Aviation W&B Calculator',
 		headerTitleStyle: {alignSelf: 'center'},
	};

	setModalVisible(visible,modalTitle) {
    this.setState({modalVisible: visible, modalTitle});
  }
  componentWillMount(){

    // load
    storage.load({
    	key: 'aircrafts',

    	// autoSync(default true) means if data not found or expired,
    	// then invoke the corresponding sync method
    	autoSync: true,

    	// syncInBackground(default true) means if data expired,
    	// return the outdated data first while invoke the sync method.
    	// It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
    	syncInBackground: true,

    	// you can pass extra params to sync method
    	// see sync example below for example
    	syncParams: {
    	  extraFetchOptions: {
    	    // blahblah
    	  },
    	  someFlag: true,
    	},
    }).then(ret => {
    	// found data go to then()
      this.setState({airplanesModels:ret.models});
      console.log(this.state.airplanesModels);
    }).catch(err => {
    	// any exception including data not found
    	// goes to catch()
    	console.warn(err.message);
    	switch (err.name) {
    	    case 'NotFoundError':
    	        // TODO;
    	        break;
            case 'ExpiredError':
                // TODO
                break;
    	}
    })

  }

  render(){
		Reactotron.log('hello rendering world');
    const { navigate } = this.props.navigation;
    return(
      <View style={{flex:1,  justifyContent: 'flex-start'}}>
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

           <Button onPress={() => navigate('StationsConfigurationsList')}>
             <Text>Envelope Profiles</Text>
           </Button>

           <Button onPress={() => navigate('StationsConfigurationsList')}>
             <Text>Stations Configurations</Text>
           </Button>
          <Button onPress={() => navigate('BuildAircraft')}>
            <Text>Add Tail Number</Text>
          </Button>
          <Button onPress={() => {
              this.setModalVisible(!this.state.modalVisible,'');
              navigate('AirplaneSetupScreen',{AirplaneModel:this.state.modalTitle});
            }}>
            <Text>Setup</Text>
          </Button>
          <Button onPress={() => navigate('BuildAircraft')}>
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

          <Button onPress={() => navigate('BuildAircraft')}>
            <Text>Build Your Airplane</Text>
          </Button>

          <FlatList
            //data={[{key:'Cessna 120'},{key:'Cessna 150a'},{key:'Cessna 172P'},{key:'Cessna 180'}]}
            ItemSeparatorComponent={ () => <View style={ { height: 1 } } /> }
            data={this.state.airplanesModels}
            renderItem={ ({item}) =>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',backgroundColor:'#616160',padding:10,paddingRight: 2}}>
                <TouchableOpacity onPress={() => navigate('TailNumbers',{airplaneModel :item.key,tailNumbers:item.tailNumbers})}>
                  <Text style={{fontSize:16,  fontWeight:'500', color :'#fff'}}>{item.key}</Text>
                </TouchableOpacity>
                <Button onPress={() => {this.setModalVisible(true,item.key)}}>
                  <Text>Actions</Text>
               </Button>
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
}

export default HomeScreen;

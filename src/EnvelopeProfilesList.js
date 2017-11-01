import React from 'react';
import {View,Text,FlatList,Button,TouchableOpacity,ScrollView,Image} from 'react-native';
import {StackNavigator} from 'react-navigation';
import realm from './RealmStationsConfiguration';

class EnvelopeProfilesList extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      envelopes :this.props.navigation.state.params.envelopes
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Envelope Profiles `,
    headerTitleStyle: {alignSelf: 'center'},
    headerRight:
      <TouchableOpacity style={{paddingRight:5}} onPress={() => navigation.navigate('EnvelopeForm',{envelopes:navigation.state.params.envelopes})}>
        <Image style={styles.iconStyle} source={require('../img/icons/plus.png')} />
      </TouchableOpacity>
  });

  deleteSCProfile(SCProfileId){
    let a = realm.objects('StationsConfiguration');
    let x = a.filtered('id =' + SCProfileId);
    realm.write(() => {
      realm.delete(x);
    });
    this.props.navigation.navigate('StationsConfigurationsList');
  }


  render(){
     const { params } = this.props.navigation.state;
     const { navigate } = this.props.navigation;
    return(
      <View>
<Text>{JSON.stringify(this.state.envelopes)}</Text>
        <ScrollView>
          <FlatList
            data={this.state.envelopes}
            renderItem={ ({item}) =>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>

                <TouchableOpacity onPress={() => navigate('StationsConfigurationSpecificList',{profileName :item.profileName,stations: item.stations})}>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',padding:8}}>
                    <Image style={styles.iconStyle} source={require('../img/icons/envelope.png')} />
                    <Text style={{fontSize:18, padding: 2}}>{item.profileName}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.deleteSCProfile.bind(this,item.id)} >
                  <Text style={{fontSize:18, padding: 8}}>(DEL)</Text>
                </TouchableOpacity>
              </View>

          }
          keyExtractor={(item, index) => item.id}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = {

  iconStyle:{
    width:25,
    height:25
  }
}

export default EnvelopeProfilesList;

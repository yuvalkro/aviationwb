import React from 'react';
import {TextInput,View,Text,Picker} from 'react-native';

class PickerComp extends React.Component{

  //const {inputStyle,labelStyle,containerStyle} = styles;
  //const {label,value,maximumValue,step} = this.props;
  constructor(props) {
     super(props)
     this.state = { pickerItems: this.props.itemsData , selectedItem :''}
  }

  getVal(val){
    //console.warn(val);
  }

  render(){

    let pickerItems = this.state.pickerItems.map( (s, i) => {
          return <Picker.Item key={i} value={s} label={s} />
      });

    return(
      <View style={styles.containerStyle} >
        <Text style={styles.labelStyle} >{this.props.label}</Text>
        <Picker
          style={styles.inputStyle}
           selectedValue={this.state.selectedItem}
          onValueChange={ (item) => ( this.setState({selectedItem:item}) ) }
          >

         {pickerItems}
        </Picker>
      </View>
    )
  }
}

const styles = {
  inputStyle : {
    paddingRight :5,
    paddingLeft: 5,
    flex:1
  },
  labelStyle : {
    fontSize:18,
    fontWeight:'bold',
    paddingLeft:20,
    flex:1
  },
  containerStyle : {
    height:70,
    flex:1,
    flexDirection:'row',
    alignItems:'stretch'
  }
};

export  {PickerComp};

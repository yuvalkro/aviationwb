import React from 'react';
import {TextInput,View,Text,Picker} from 'react-native';

class PickerComp extends React.Component{

  //const {inputStyle,labelStyle,containerStyle} = styles;
  //const {label,value,maximumValue,step} = this.props;
  constructor(props) {
     super(props)
     this.state = {
       pickerItems:   this.props.itemsData ,
       selectedValue:this.props.selectedItem,
       onValueChange: this.props.onValueChange
     }
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
           selectedValue={this.props.selectedItem}
           onValueChange={this.props.onValueChange}
          //  onValueChange={ (item) => {
          //    if (item !== 0) this.setState({selectedItem:item})
          //   }
          // }
          >
          <Picker.Item label='Click to choose' value='0' />
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
    paddingLeft:5,
    flex:1
  },
  containerStyle : {
    height:70,
    flex:1,
    flexDirection:'column',
    alignItems:'stretch'
  }
};

export  {PickerComp};

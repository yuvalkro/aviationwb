import React from 'react';
import {TextInput,View,Text} from 'react-native';

const Input = ({label,value,onChangeText,placeholder,secureTextEntry,description}) =>{
const {inputStyle,labelStyle,descriptionStyle,containerStyle} = styles;
  return(
    <View style={containerStyle}>
      <View>
      <Text   numberOfLines={1} style={labelStyle}>{label}</Text>
      <Text style={descriptionStyle}> {description}</Text>
      </View>
      <TextInput
        placeholder = {placeholder}
        autoCorrect= {false}
        secureTextEntry ={secureTextEntry}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )

}

const styles = {
  inputStyle : {
    color:'#000',
    paddingRight :5,
    paddingLeft: 5,
    fontSize:18,
    lineHeight:23,
    flex:1,
    height:50,
    width:200
  },
  labelStyle : {
    fontSize:18,
    fontWeight:'bold',
    paddingLeft:20,
    flex:1
  },
  descriptionStyle : {
    fontSize:12,
    paddingLeft:20,
    flex:1
  },
  containerStyle : {
    height:50,
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  }
};

export  {Input};

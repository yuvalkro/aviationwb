import React from 'react';
import {TextInput,View,Text} from 'react-native';

const Input = ({label,value,onChangeText,placeholder,secureTextEntry,description}) =>{
const {labelStyle,descriptionStyle,containerStyle} = styles;
  return(
    <View style={containerStyle}>
      <View style={{flex: 1,flexDirection:'row',justifyContent:'flex-start'}}>
        <Text numberOfLines={1} style={labelStyle}>{label}</Text>
        <Text style={descriptionStyle}>{description}</Text>
      </View>
      <View style={styles.MainContainer}>
        <TextInput
          autoCorrect= {false}
          secureTextEntry ={secureTextEntry}
          // Adding hint in Text Input using Place holder.
          placeholder={placeholder}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          // Calling the custom TextInputStyleClass.
          style={styles.TextInputStyleClass}
          value={value}
          onChangeText={onChangeText}
          />
        </View>
    </View>
  )
}

const styles = {
  MainContainer :{
    flexDirection:'row',
  // Setting up View inside content in Vertically center.
  justifyContent: 'center',
  flex:1,
  margin: 10
  },

TextInputStyleClass:{
  flex:1,
  textAlign: 'left',
  height: 50,
  borderWidth: 2,
  borderColor: '#EAEAEB',
  borderRadius: 5 ,
  backgroundColor : "#FFFFFF",
  fontSize:18,

},
  labelStyle : {
    fontSize:16,
    fontWeight:'bold',
    paddingLeft:5,
    flex:1
  },
  descriptionStyle : {
    fontSize:12,
    paddingLeft:5
  },
  containerStyle : {
    flex:1,
    flexDirection:'column',
    alignItems:'flex-start'
  }
};

export  {Input};

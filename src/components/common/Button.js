import React from 'react';
import {Text,TouchableOpacity} from 'react-native';

const Button =(props) =>{

  const {buttonStyle,textStyle} = styles

  return(
    <TouchableOpacity onPress={props.onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle:{
    alignSelf :'center',
    color :'#fff',
    fontSize :14,
    fontWeight:'600',
    paddingTop:8,
    paddingBottom:8,
    paddingRight:14,
    paddingLeft:14
  },
  buttonStyle:{
    alignSelf:'stretch',
    backgroundColor: '#37A0EC',
    borderRadius:6,
    borderWidth:1,
    borderColor:'#fff',
    marginLeft:5,
    marginRight:5
  }
}

export { Button };

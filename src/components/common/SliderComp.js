import React from 'react';
import {TextInput,View,Text,Slider} from 'react-native';

class SliderComp extends React.Component{

  //const {inputStyle,labelStyle,containerStyle} = styles;
  //const {label,value,maximumValue,step} = this.props;
  constructor(props) {
     super(props)
     this.state = { NumberOfSeats: 0 }
  }

  getVal(val){
    //console.warn(val);
  }

  render(){
    return(
      <View style={styles.containerStyle} >
        <Text style={styles.labelStyle} >{this.props.label}: {this.state.NumberOfSeats}</Text>
        <Slider
          style={styles.inputStyle}
          value={this.props.value}
          onValueChange={val => this.setState({ NumberOfSeats: val })}
          onSlidingComplete={ val => this.getVal(val)}
          maximumValue={Number(this.props.maximumValue)}
          step={Number(this.props.step)}
        />
      </View>
    )
  }
}

const styles = {
  inputStyle : {
    paddingRight :5,
    paddingLeft: 5,
    flex:2
  },
  labelStyle : {
    fontSize:16,
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

export  {SliderComp};

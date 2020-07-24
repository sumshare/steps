import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, ViewStyle} from 'react-native';

import variables from '../variables';
import styles from './styles';
const stepperStyles = StyleSheet.create(styles);

export const Stepper = ({value: initvalue, min = 1, max = 5, step = 1, editable = false, operatorIconColor = variables.mtdGrayDarker, onChange, style, operatorStyle}) => {

  let str = String(initvalue)

  const [increasable, setincreasable] = useState(true);
  const [decreasable, setdecreasable] = useState(true);
  const isEmpty = function(value) {
    return value == null || value === '';
  };


  const setData=(v,value,action)=>{
    if (isEmpty(v)) {
      setincreasable(true);
      setdecreasable(true);
    } else {
      let value = Number(v);
      if (isNaN(value)) {
        value = 0;
      }
      setincreasable(Boolean(value < max));
      setdecreasable(Boolean(value > min));
    }
    onChange && onChange(v, value, action);

  }

  const changeValue = (value, step = 1, action) => {
    let newValue;
    if (value === '') {
      newValue = '';
    } else {
      if (action === 'input') {
        newValue = value;
      } else {
        newValue = value + step;
      }

      if (newValue > max) {
        newValue = max;
      }

      if (newValue < min) {
        newValue = min;
      }
    }
    setData(newValue,value,action)



  };

  const onDecrease = () => {
    const newValue = isEmpty(initvalue) ? min + step : initvalue;
    changeValue(newValue, -step, 'decrease');
  };
  const onIncrease = () => {
    const newValue = isEmpty(initvalue) ? min - 1 : initvalue;
    changeValue(newValue, step, 'increase');
  };

  const onChangeText = value => {
    let newValue;
    if (!value) {
      newValue = '';
    } else {
      newValue = Number(value);
      if (isNaN(newValue)) {
        newValue = '';
      }
    }
    changeValue(newValue, step, 'input');
  };

  return (
    <View style={[stepperStyles.container, style]}>
      <TouchableOpacity activeOpacity={variables.mtdOpacity} onPress={onDecrease} disabled={!decreasable}>
        <View style={[stepperStyles.ctrl, operatorStyle, !decreasable ? stepperStyles.disabled : null]}>
          <View style={[stepperStyles.ctrlSymbolHor, {backgroundColor: operatorIconColor}]} />
        </View>
      </TouchableOpacity>

      <TextInput style={[stepperStyles.input]} value={str} onChangeText={onChangeText} editable={editable} keyboardType="numeric" />
      <TouchableOpacity activeOpacity={variables.mtdOpacity} onPress={onIncrease} disabled={!increasable}>
        <View style={[stepperStyles.ctrl, operatorStyle, !increasable ? stepperStyles.disabled : null]}>
          <View
            style={[
              stepperStyles.ctrlSymbolHor,
              {
                backgroundColor: operatorIconColor,
              },
            ]}
          />
          <View
            style={[
              stepperStyles.ctrlSymboVer,
              {
                backgroundColor: operatorIconColor,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

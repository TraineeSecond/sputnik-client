import React from 'react';
import {TextInput} from 'react-native';

import {Colors, TextStyles} from '../../libs/helpers';
import {InputStyles as styles} from './Input.styles';

type InputType = {
  value: string;
  placeholder: string;
  isPassword?: boolean;
  isEmail?: boolean;
  setValue: (text: string) => void;
};

export const Input = ({
  value,
  setValue,
  placeholder,
  isPassword = false,
  isEmail = false,
}: InputType) => {
  const handleChangeText = (value: string) => {
    setValue(value);
  };

  return (
    <TextInput
      value={value}
      secureTextEntry={isPassword}
      placeholder={placeholder}
      keyboardType={isEmail ? 'email-address' : 'default'}
      autoCapitalize="none"
      placeholderTextColor={Colors.Gray100}
      onChangeText={handleChangeText}
      style={[styles.input, TextStyles.p1.changeColor(Colors.Gray200)]}
    />
  );
};

import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors} from '../libs/helpers/colors';
import {TextStyles} from '../libs/helpers/textStyles';

type InputType = {
  value: string;
  placeholder: string;
  isPassword?: boolean;
  isEmail?: boolean;
  setValue: (text: string) => void;
};

const Input: React.FC<InputType> = ({
  value,
  setValue,
  placeholder,
  isPassword = false,
  isEmail = false,
}) => {
  return (
    <TextInput
      value={value}
      secureTextEntry={isPassword}
      placeholder={placeholder}
      keyboardType={isEmail ? 'email-address' : 'default'}
      autoCapitalize="none"
      placeholderTextColor={Colors.Gray100}
      onChangeText={text => setValue(text)}
      style={[styles.input, TextStyles.p1.changeColor(Colors.Gray200)]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.Gray300,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    width: 275,
    height: 48,
    marginBottom: 20,
  },
});

export default Input;

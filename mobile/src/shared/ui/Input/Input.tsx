import React from 'react';
import {
  KeyboardTypeOptions,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {CloseIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';

import {InputStyles as styles} from './Input.styles';

type InputType = {
  value: string;
  style?: object;
  placeholder: string;
  numberOfLines?: number;
  multiline?: boolean;
  showClear?: boolean;
  isPassword?: boolean;
  containerStyle?: object;
  keyboardType?: KeyboardTypeOptions;
  onClear?: () => void;
  setValue: (text: string) => void;
  disabled?: boolean;
};

export const Input = ({
  style,
  value,
  onClear,
  setValue,
  placeholder,
  numberOfLines,
  containerStyle,
  multiline = false,
  keyboardType = 'default',
  showClear = false,
  isPassword = false,
  disabled = false,
}: InputType) => {
  const handleChangeText = (value: string) => {
    if (!disabled) setValue(value);
  };

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        value={value}
        secureTextEntry={isPassword}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize="none"
        placeholderTextColor={Colors.Gray500}
        onChangeText={handleChangeText}
        editable={!disabled}
        style={[
          styles.input,
          TextStyles.p1.changeColor(
            disabled ? Colors.Gray500 : Colors.Black100,
          ),
          style,
          disabled && styles.disabledInput,
        ]}
      />
      {value && showClear && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <CloseIcon
            fill={IconStyles.medium.changeColor(Colors.Gray500).color}
            width={IconStyles.medium.width}
            height={IconStyles.medium.height}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

import React from 'react';

import {Dropdown} from 'react-native-element-dropdown';

import {DropdownStyles as styles} from './Dropdown.styles';

type CustomDropdownProps = {
  data: string[];
  disabled?: boolean;
  value: string | null;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const CustomDropdown = ({
  data,
  value,
  onChange,
  placeholder,
  disabled = false,
}: CustomDropdownProps) => {
  const formattedData = data.map(item => ({
    label: item,
    value: item,
  }));

  return (
    <Dropdown
      style={[styles.dropdown, disabled && styles.disabledDropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={[
        styles.selectedTextStyle,
        disabled && styles.disabledSelectedText,
      ]}
      iconStyle={styles.iconStyle}
      data={formattedData}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={item => {
        onChange(item.value);
      }}
      disable={disabled}
    />
  );
};

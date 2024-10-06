import React from 'react';

import {Dropdown} from 'react-native-element-dropdown';

import {DropdownStyles as styles} from './Dropdown.styles';

type CustomDropdownProps = {
  data: string[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const CustomDropdown = ({
  data,
  value,
  onChange,
  placeholder,
}: CustomDropdownProps) => {
  const formattedData = data.map(item => ({
    label: item,
    value: item,
  }));

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
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
    />
  );
};

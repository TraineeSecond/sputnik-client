import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const DropdownStyles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  disabledDropdown: {
    backgroundColor: Colors.Gray200,
  },
  disabledSelectedText: {
    color: Colors.Gray500,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#aaa',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

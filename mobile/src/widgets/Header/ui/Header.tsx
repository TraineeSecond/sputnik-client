import {NavigationProp} from '@react-navigation/native';
import {Screens, Stacks} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {CartIcon} from 'shared/icons/Icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';

type HeaderProps = {
  navigation: NavigationProp<RootStackParamsList>;
};

export const Header = ({navigation}: HeaderProps) => {
  const handleNavigateToHome = () => {
    navigation.navigate(Stacks.HOME_TAB);
  };

  const handleNavigateToCart = () => {
    navigation.navigate(Screens.CART);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateToHome}>
        <Text style={TextStyles.p3.changeColor(Colors.Green500)}>GOZON</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToCart}>
        <CartIcon
          fill={IconStyles.medium.changeColor(Colors.Gray500).color}
          width={IconStyles.medium.width}
          height={IconStyles.medium.height}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Colors.White100,
    borderBottomWidth: 2,
    borderBottomColor: Colors.Gray100,
  },
});

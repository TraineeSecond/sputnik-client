import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Screens, Stacks} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {ArrowBack, CartIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';

import {HeaderStyles as styles} from './Header.styles';

type HeaderProps = {
  navigation: NavigationProp<RootStackParamsList>;
  routeName: string;
};

export const Header = ({navigation, routeName}: HeaderProps) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigateToHome = () => {
    navigation.navigate(Stacks.HOME_TAB);
  };

  const handleNavigateToCart = () => {
    navigation.navigate(Screens.CART);
  };

  return (
    <View style={styles.container}>
      {routeName === Screens.PRODUCT ? (
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowBack
            fill={IconStyles.medium.changeColor(Colors.Gray500).color}
            width={IconStyles.medium.width}
            height={IconStyles.medium.height}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleNavigateToHome}>
          <Text style={TextStyles.p3.changeColor(Colors.Green500)}>GOZON</Text>
        </TouchableOpacity>
      )}
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

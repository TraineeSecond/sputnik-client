import {NavigationProp} from '@react-navigation/native';
import {Screens, Stacks} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {ArrowBack, CartIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {HeaderStyles as styles} from './Header.styles';
import {navigationRef} from 'app/navigation/navigation';

type HeaderProps = {
  navigation: NavigationProp<RootStackParamsList>;
  routeName: string;
};

export const Header = ({navigation, routeName}: HeaderProps) => {
  const handleGoBack = () => {
    navigationRef.goBack();
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

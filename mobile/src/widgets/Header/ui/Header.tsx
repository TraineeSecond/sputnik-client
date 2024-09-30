import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';

import {Screens, Stacks} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {useSearchCatalogStore} from 'features';
import {ArrowBack, CartIcon, SearchIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {Input} from 'shared/ui';

import {HeaderStyles as styles} from './Header.styles';

type HeaderProps = {
  navigation: NavigationProp<RootStackParamsList>;
  routeName: string;
};

export const Header = ({navigation, routeName}: HeaderProps) => {
  const {t} = useTranslation();
  const {searchText, setSearchText, fetchProducts} = useSearchCatalogStore();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigateToHome = () => {
    navigation.navigate(Stacks.HOME_TAB);
  };

  const handleNavigateToCart = () => {
    navigation.navigate(Screens.CART);
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleClearInput = () => {
    setSearchText('');
  };

  const renderContent = () => {
    switch (routeName) {
      case Screens.HOME:
        return (
          <View style={styles.homeContainer}>
            <TouchableOpacity
              onPress={handleNavigateToHome}
              style={styles.logo}>
              <Text style={TextStyles.p3.changeColor(Colors.Green500)}>
                GOZON
              </Text>
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

      case Screens.PRODUCT:
        return (
          <View style={styles.productContainer}>
            <TouchableOpacity onPress={handleGoBack}>
              <ArrowBack
                fill={IconStyles.medium.changeColor(Colors.Gray500).color}
                width={IconStyles.medium.width}
                height={IconStyles.medium.height}
              />
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

      case Screens.CATALOG:
        return (
          <View style={styles.searchContainer}>
            <View style={styles.topControls}>
              <Input
                showClear={true}
                value={searchText}
                style={styles.input}
                placeholder={t('Поиск...')}
                setValue={setSearchText}
                onClear={handleClearInput}
                containerStyle={styles.inputContainer}
              />
              <TouchableOpacity onPress={handleSearch}>
                <SearchIcon
                  fill={IconStyles.medium.changeColor(Colors.Gray500).color}
                  width={IconStyles.medium.width}
                  height={IconStyles.medium.height}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNavigateToCart}>
                <CartIcon
                  fill={IconStyles.medium.changeColor(Colors.Gray500).color}
                  width={IconStyles.medium.width}
                  height={IconStyles.medium.height}
                />
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return <View style={[styles.container]}>{renderContent()}</View>;
};

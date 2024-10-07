import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';

import {ArrowBack, CartIcon, SearchIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {Input} from 'shared/ui';

import {HeaderStyles as styles} from './Header.styles';

type HeaderProps = {
  showTitle?: boolean;
  showBackButton?: boolean;
  showCartButton?: boolean;
  showSearchInput?: boolean;
  searchText?: string;
  setSearchText?: (text: string) => void;
  onBackPress?: () => void;
  onCartPress?: () => void;
  onSearch?: () => void;
  onClearSearch?: () => void;
};

export const Header = ({
  showTitle,
  showBackButton = false,
  showCartButton = false,
  showSearchInput = false,
  searchText = '',
  setSearchText,
  onBackPress,
  onCartPress,
  onSearch,
  onClearSearch,
}: HeaderProps) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container, !showCartButton && styles.border]}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress}>
          <ArrowBack
            fill={IconStyles.medium.changeColor(Colors.Gray500).color}
            width={IconStyles.medium.width}
            height={IconStyles.medium.height}
          />
        </TouchableOpacity>
      )}

      {showTitle && (
        <Text style={TextStyles.p3.changeColor(Colors.Green500)}>GOZON</Text>
      )}

      {showSearchInput && setSearchText && (
        <>
          <Input
            showClear={true}
            value={searchText}
            style={styles.input}
            placeholder={t('Поиск...')}
            setValue={setSearchText}
            onClear={onClearSearch}
          />
          <TouchableOpacity onPress={onSearch}>
            <SearchIcon
              fill={IconStyles.medium.changeColor(Colors.Gray500).color}
              width={IconStyles.medium.width}
              height={IconStyles.medium.height}
            />
          </TouchableOpacity>
        </>
      )}

      {showCartButton && (
        <TouchableOpacity onPress={onCartPress}>
          <CartIcon
            fill={IconStyles.medium.changeColor(Colors.Gray500).color}
            width={IconStyles.medium.width}
            height={IconStyles.medium.height}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';

import {ArrowBack, CartIcon, PlusIcon, SearchIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {Input} from 'shared/ui';

import {HeaderStyles as styles} from './Header.styles';

type HeaderProps = {
  showTitle?: boolean;
  searchText?: string;
  hideBorder?: boolean;
  showAddButton?: boolean;
  showBackButton?: boolean;
  showCartButton?: boolean;
  showSearchInput?: boolean;
  productName?: string;
  sellerName?: string;
  onSearch?: () => void;
  onAddPress?: () => void;
  onBackPress?: () => void;
  onCartPress?: () => void;
  onClearSearch?: () => void;
  setSearchText?: (text: string) => void;
};

export const Header = ({
  showTitle,
  hideBorder,
  sellerName,
  productName,
  showBackButton = false,
  showCartButton = false,
  showSearchInput = false,
  showAddButton = false,
  searchText = '',
  setSearchText,
  onBackPress,
  onCartPress,
  onAddPress,
  onSearch,
  onClearSearch,
}: HeaderProps) => {
  const {t} = useTranslation();
  // console.log(sellerName, productName);
  return (
    <View style={[styles.container, !hideBorder && styles.border]}>
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

      {showAddButton && (
        <TouchableOpacity onPress={onAddPress}>
          <PlusIcon
            fill={IconStyles.medium.changeColor(Colors.Gray500).color}
            width={IconStyles.medium.width}
            height={IconStyles.medium.height}
          />
        </TouchableOpacity>
      )}

      {sellerName && productName && (
        <View style={styles.chatTitle}>
          <Text style={TextStyles.p3.changeColor(Colors.Green500)}>
            {sellerName}
          </Text>
          <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
            {productName}
          </Text>
        </View>
      )}
    </View>
  );
};

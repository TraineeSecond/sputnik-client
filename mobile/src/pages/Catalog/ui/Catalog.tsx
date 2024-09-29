import React from 'react';
import {ScrollView} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Product} from 'entities/product';
import {useProductListStore} from 'entities/productList';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {ProductItem} from 'shared/ui';

import {CatalogPageStyles as styles} from './Catalog.styles';

export const Catalog = () => {
  const {productList} = useProductListStore();
  const navigation = useAppNavigation();

  const handleProductPress = (product: Product) => {
    navigation.navigate(Screens.PRODUCT, {
      product,
    });
  };

  const renderProductItem = (item: Product) => {
    const {id, name, price, new_price, user} = item;
    const handlePress = () => handleProductPress(item);

    return (
      <ProductItem
        id={`${id}`}
        key={id}
        name={name}
        price={price}
        newPrice={new_price}
        sellerName={user.name}
        sellerSurname={user.surname}
        onPress={handlePress}
        style={styles.productItem}
      />
    );
  };

  //Flatlist пока выдает ошибку

  return (
    <ScrollView contentContainerStyle={styles.flatList}>
      {productList.map(renderProductItem)}
    </ScrollView>
  );
};

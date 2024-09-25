import React from 'react';
import {ScrollView} from 'react-native';
import {CatalogPageStyles as styles} from './Catalog.styles';
import {useProductListStore} from 'entities/productList';
import {Product} from 'entities/product';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {Screens} from 'app/navigation/navigationEnums';
import {ProductItem} from 'shared/ui';

export const Catalog = () => {
  const {productList} = useProductListStore();
  const navigation = useAppNavigation();

  const handleProductPress = (productId: number) => {
    const product = productList.find(p => p.id === productId);
    if (product) {
      navigation.navigate(Screens.PRODUCT, {
        product,
      });
    }
  };

  const renderProductItem = (item: Product) => {
    const {id, name, price, new_price, user} = item;
    const handlePress = () => handleProductPress(id);

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

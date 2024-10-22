import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {useProductStore} from 'entities/product';
import {useUserStore} from 'entities/user';
import {
  ListingProduct,
  useProductListingStore,
  useSellerProductsStore,
} from 'features';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {ProductForm} from 'widgets';

import {NewProductStyles as styles} from './NewProduct.styles';

type NewProductProps = {
  route?: RouteProp<RootStackParamsList, Screens.NEWPRODUCT>;
};

export const NewProduct = ({route}: NewProductProps) => {
  const {product} = route?.params || {};
  const {loading, addProduct, clearProduct, updateProduct} =
    useProductListingStore();

  const {fetchProduct} = useProductStore();

  const {fetchSellerProducts} = useSellerProductsStore();

  const {user} = useUserStore();

  const navigation = useAppNavigation();
  const {t} = useTranslation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async (formProduct: ListingProduct) => {
    const productWithUserId = {
      ...formProduct,
      userId: formProduct.userId || user.id,
    };

    if (product) {
      await updateProduct(product.id, productWithUserId);
      await fetchProduct(product.id);
      Alert.alert(t('Продукт успешно обновлен'));
    } else {
      await addProduct(productWithUserId);
      Alert.alert(t('Продукт успешно добавлен'));
    }
    await fetchSellerProducts();

    handleGoBack();
    clearProduct();
  };

  return (
    <View style={styles.container}>
      <ProductForm
        initialProduct={product}
        onSubmit={handleSubmit}
        loading={loading}
        mode={product ? 'edit' : 'create'}
      />
    </View>
  );
};

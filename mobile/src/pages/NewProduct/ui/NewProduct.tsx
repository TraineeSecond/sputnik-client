import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, View} from 'react-native';

import {useUserStore} from 'entities/user';
import {useProductListingStore} from 'features/ProductListing';
import {Input} from 'shared/ui';

import {NewProductStyles as styles} from './NewProduct.styles';

export const NewProduct = () => {
  const {currentProduct, setCurrentProductField, addProduct, loading} =
    useProductListingStore();
  const {user} = useUserStore();
  const {t} = useTranslation();

  const handleAddProduct = async () => {
    const productWithUserId = {
      ...currentProduct,
      userId: user.id,
    };
    await addProduct(productWithUserId);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder={t('Название продукта')}
        value={currentProduct.name}
        setValue={text => setCurrentProductField('name', text)}
      />
      <Input
        placeholder={t('Описание продукта')}
        value={currentProduct.description}
        setValue={text => setCurrentProductField('description', text)}
      />
      <Input
        placeholder={t('Цена')}
        value={currentProduct.price.toString()}
        setValue={text => setCurrentProductField('price', parseFloat(text))}
        keyboardType="numeric"
      />
      {/* TODO: получать из стейта */}
      <Input
        placeholder={t('Категория')}
        value={currentProduct.category}
        setValue={text => setCurrentProductField('category', text)}
      />
      <Button
        title={t('Добавить продукт')}
        onPress={handleAddProduct}
        disabled={loading}
      />
    </View>
  );
};

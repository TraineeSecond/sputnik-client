import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useUserStore} from 'entities/user';
import {useProductListingStore} from 'features/ProductListing';
import {useSearchCatalogStore} from 'features/Search';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {Input} from 'shared/ui';
import {CustomDropdown} from 'shared/ui/Dropdown/Dropdown';

import {NewProductStyles as styles} from './NewProduct.styles';

export const NewProduct = () => {
  const {
    loading,
    currentProduct,
    addProduct,
    clearProduct,
    setCurrentProductField,
  } = useProductListingStore();
  const {categories} = useSearchCatalogStore();
  const navigation = useAppNavigation();
  const {user} = useUserStore();
  const {t} = useTranslation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddProduct = async () => {
    if (
      !currentProduct.name ||
      !currentProduct.description ||
      !currentProduct.price ||
      !currentProduct.category
    ) {
      Alert.alert(t('Заполните все поля'));
      return;
    }
    const productWithUserId = {
      ...currentProduct,
      userId: user.id,
    };
    await addProduct(productWithUserId);
    handleGoBack();
    clearProduct();
    Alert.alert(t('Продукт успешно добавлен'));
  };

  const handleNameChange = (value: string) => {
    setCurrentProductField('name', value);
  };

  const handleDescriptionChange = (value: string) => {
    setCurrentProductField('description', value);
  };

  const handlePriceChange = (value: string) => {
    const price = parseFloat(value) || 0;
    setCurrentProductField('price', price);
  };

  const handleCategoryChange = (value: string) => {
    setCurrentProductField('category', value);
  };

  // TODO: Добавление изображения

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
            {t('Добавить изображение')}
          </Text>
        </View>
        <View style={styles.inputs}>
          <CustomDropdown
            data={categories}
            value={currentProduct.category}
            onChange={handleCategoryChange}
            placeholder={t('Категория')}
          />
          <Input
            placeholder={t('Название продукта')}
            value={currentProduct.name}
            setValue={handleNameChange}
            containerStyle={styles.input}
          />
          <Input
            placeholder={t('Описание продукта')}
            value={currentProduct.description}
            setValue={handleDescriptionChange}
            style={styles.textarea}
            containerStyle={styles.input}
            multiline={true}
            numberOfLines={5}
          />
          <Input
            placeholder={t('Цена')}
            value={currentProduct.price.toString()}
            setValue={handlePriceChange}
            keyboardType="numeric"
            containerStyle={styles.input}
          />
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={handleAddProduct}
            style={[styles.button, styles.filled]}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={Colors.White100}
                style={styles.loader}
              />
            ) : (
              <Text style={TextStyles.button1}>{t('Добавить продукт')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
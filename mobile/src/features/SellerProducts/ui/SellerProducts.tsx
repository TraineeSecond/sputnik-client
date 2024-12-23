import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Product} from 'entities/product';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useOrientation} from 'shared/hooks';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {ProductItem} from 'shared/ui';

import {useSellerProductsStore} from '..';
import {SellerProductsStyles as styles} from './styles';

export const SellerProducts = () => {
  const {products, loading, error, fetchSellerProducts} =
    useSellerProductsStore();
  const navigation = useAppNavigation();
  const [isRefresh, setIsRefresh] = useState(false);
  const isLandscape = useOrientation();
  const {width} = Dimensions.get('window');
  const itemWidth = isLandscape ? width / 4 - 16 : width / 2 - 16;

  const onRefresh = useCallback(async () => {
    setIsRefresh(true);
    fetchSellerProducts();
    setIsRefresh(false);
  }, [fetchSellerProducts]);

  const handleProductPress = (product: Product) => {
    if (product) {
      navigation.navigate(Screens.PRODUCT, {
        product,
      });
    }
  };

  const renderItem = ({item}: {item: Product}) => {
    const {
      id,
      name,
      price,
      images,
      new_price: newPrice,
      rating,
      reviewerscount,
      user: {name: sellerName, surname: sellerSurname},
    } = item;
    const handlePress = () => handleProductPress(item);

    return (
      <ProductItem
        id={id.toString()}
        name={name}
        price={price}
        images={images}
        newPrice={newPrice}
        rating={rating}
        reviewerscount={reviewerscount}
        sellerName={sellerName}
        sellerSurname={sellerSurname}
        onPress={handlePress}
        style={[styles.productItem, {width: itemWidth}]}
      />
    );
  };

  if (loading && !isRefresh && !error) {
    return <ActivityIndicator size="large" color={Colors.Primary} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={`flatList-${isLandscape ? 4 : 2}`}
        numColumns={isLandscape ? 4 : 2}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.scrollView}
        initialNumToRender={8}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

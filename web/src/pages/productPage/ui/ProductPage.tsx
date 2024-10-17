import { useCallback, useEffect } from 'react';

import { useProductStore } from 'entities/product/model/productStore';
import { useCartStore } from 'features/cart/model/cartStore';
import { useParams } from 'react-router-dom';
import { useAuthStore } from 'shared/auth/model/authStore';
import { MainLayout, ProductView } from 'widgets';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loadProductById } = useProductStore();
  const { token, user } = useAuthStore();
  const { getCartItemQuantity, incrementCartItem, decrementCartItem, loading } =
    useCartStore();

  const isBuyer = user?.role === 'buyer';

  useEffect(() => {
    if (id) {
      void loadProductById(Number(id));
    }
  }, [id, loadProductById]);

  const handleIncrement = useCallback(() => {
    if (product && token && user?.id) {
      void incrementCartItem(token, user.id, product.id);
    }
  }, [product, token, user?.id, incrementCartItem]);

  const handleDecrement = useCallback(() => {
    if (product && token && user?.id) {
      void decrementCartItem(token, user.id, product.id);
    }
  }, [product, token, user?.id, decrementCartItem]);

  if (!product) {
    return null;
  }

  const quantity = isBuyer ? getCartItemQuantity(product.id) : 0;

  return (
    <MainLayout>
      <ProductView
        product={product}
        quantity={quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        userId={user?.id}
        isBuyer={isBuyer}
        loading={loading}
      />
    </MainLayout>
  );
};

export default ProductPage;

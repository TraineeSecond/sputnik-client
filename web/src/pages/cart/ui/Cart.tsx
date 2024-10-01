import { useCartStore } from 'features/cart/model/cartStore';
import { MainLayout } from 'widgets';

const Cart = () => {
  const { items, loading, error } = useCartStore();

  if (loading) {
    return (
      <MainLayout>
        <p>Загрузка корзины...</p>
      </MainLayout>
    );
  }
  if (error) {
    return (
      <MainLayout>
        <p>{error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1>Корзина</h1>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.productid}>
              Продукт ID: {item.productid}, Количество: {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Ваша корзина пуста</p>
      )}
    </MainLayout>
  );
};

export default Cart;

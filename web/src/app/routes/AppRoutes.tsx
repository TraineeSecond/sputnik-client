import PrivateRoute from 'app/routes/PrivateRoute';
import PublicRoute from 'app/routes/PublicRoute';
import RoleBasedRoute from 'app/routes/RoleBasedRoute';
import {
  Cart,
  ChatListPage,
  ChatPage,
  CreateListing,
  Delivery,
  Home,
  Login,
  NotFound,
  ProductPage,
  Profile,
  Register,
} from 'pages';
import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route element={<PublicRoute />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      {/* Приватные маршруты */}
      <Route element={<PrivateRoute />}>
        {/* Общие маршруты для всех авторизованных пользователей */}
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/chat' element={<ChatListPage />} />
        <Route path='/chat/:chatId' element={<ChatPage />} />
        <Route path='*' element={<NotFound />} />

        {/* Маршруты для покупателей */}
        <Route element={<RoleBasedRoute allowedRoles={['buyer']} />}>
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route element={<RoleBasedRoute allowedRoles={['buyer']} />}>
          <Route path='/delivery' element={<Delivery />} />
        </Route>

        {/* Маршруты для продавцов */}
        <Route element={<RoleBasedRoute allowedRoles={['seller']} />}>
          <Route path='/create-listing' element={<CreateListing />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

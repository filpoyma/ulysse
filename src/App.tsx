import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import AdminPanel from './pages/AdminPanel/AdminPanel';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Loader } from './components/Loader/Loader';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { authService } from './services';
import { authActions } from './store/reducers/auth';
import { useDispatch } from 'react-redux';
import { countriesService } from './services/countries.service.ts';
import { getErrorMessage } from './utils/helpers.ts';

dayjs.locale('ru');
dayjs.extend(customParseFormat);

const TravelProgram = React.lazy(() => import('./pages/TravelProgram/TravelProgram.tsx'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin/AdminSignIn.tsx'));
const AdminRegister = React.lazy(() => import('./pages/AdminLogin/AdminSighUp.tsx'));
const SingleHotel = React.lazy(() => import('./pages/Hotels/SingleHotel/SingleHotel.tsx'));
const HotelsList = React.lazy(() => import('./pages/Hotels/HotelsList/HotelsList.tsx'));
const SingleRestaurant = React.lazy(
  () => import('./pages/Restaurants/SingleRestaurant/SingleRestaurant.tsx'),
);
const RestaurantsList = React.lazy(
  () => import('./pages/Restaurants/RestaurantsList/RestaurantsList.tsx'),
);

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(authActions.setIsLoading(true));
    (async () => {
      try {
        const user = await authService.validateSession();
        if (user) await countriesService.getAll();
      } catch (err) {
        console.error(getErrorMessage(err));
      } finally {
        dispatch(authActions.setIsLoading(false));
      }
    })();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/travel-programm/:programName" element={<TravelProgram />} />
        <Route path="/hotel/:id" element={<SingleHotel />} />
        <Route path="/hotels/:id" element={<HotelsList />} />
        <Route path="/restaurant/:id" element={<SingleRestaurant />} />
        <Route path="/restaurants/:id" element={<RestaurantsList />} />
        <Route path="/ulyseadmin" element={<AdminLogin />} />
        <Route path="/ulyseadmin/register" element={<AdminRegister />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<AdminPanel />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

//todo
// продумать порядок катинок при выборе в галерее

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Loader } from './components/Loader/Loader';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { authService } from './services';
import { authActions } from './store/reducers/auth';
import { useDispatch } from 'react-redux';
import { countriesService } from './services/countries.service.ts';
import { getErrorMessage } from './utils/helpers.ts';
import ProgramsSection from './pages/AdminPanel/components/ProgramsSection.tsx';
import AdminLayout from './pages/AdminPanel/AdminLayout.tsx';
import HotelsCollectSection from './pages/AdminPanel/components/HotelsCollectSection.tsx';
import HotelsListSection from './pages/AdminPanel/components/HotelsListSection.tsx';
import RestaurantsCollectSection from './pages/AdminPanel/components/RestarauntsCollectSection.tsx';
import RestaurantsListSection from './pages/AdminPanel/components/RestaurantsListSection.tsx';
import InfoSection from './pages/AdminPanel/components/InfoSection.tsx';
import ReferencesSection from './pages/AdminPanel/components/ReferencesSection.tsx';
import HotelEditPage from './pages/AdminPanel/components/HotelEditPage.tsx';
import RestaurantEditPage from './pages/AdminPanel/components/RestaurantEditPage.tsx';
import HotelsListEditPage from './pages/AdminPanel/components/HotelsListEditPage.tsx';
import RestaurantsListEditPage from './pages/AdminPanel/components/RestaurantsListEditPage.tsx';

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
        <Route path="/hotel/:name" element={<SingleHotel />} />
        <Route path="/hotels/:id" element={<HotelsList />} />
        <Route path="/restaurant/:name" element={<SingleRestaurant />} />
        <Route path="/restaurants/:id" element={<RestaurantsList />} />
        <Route path="/ulyseadmin" element={<AdminLogin />} />
        <Route path="/ulyseadmin/register" element={<AdminRegister />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProgramsSection />} />
          <Route path="hotels">
            <Route index element={<HotelsCollectSection />} />
            <Route path="lists" element={<HotelsListSection />} />
            <Route path="hotel/edit/:id" element={<HotelEditPage />} />
            <Route path="list/edit/:id" element={<HotelsListEditPage />} />
          </Route>
          <Route path="restaurants">
            <Route index element={<RestaurantsCollectSection />} />
            <Route path="lists" element={<RestaurantsListSection />} />
            <Route path="restaurant/edit/:id" element={<RestaurantEditPage />} />
            <Route path="list/edit/:id" element={<RestaurantsListEditPage />} />
          </Route>
          <Route path="info" element={<InfoSection />} />
          <Route path="references" element={<ReferencesSection />} />
        </Route>
        {/*<Route path="*" element={<AdminPanel />} />*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

//todo
// продумать порядок катинок при выборе в галерее

//оставить в галлереях только 2 поля

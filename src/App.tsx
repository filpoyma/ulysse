import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { Loader } from "./components/Loader/Loader";
import { authService } from "./services/auth.service.ts";
import { useDispatch } from "react-redux";
import { authActions } from "./store/reducers/auth/index.ts";

const TravelProgram = React.lazy(() => import("./pages/TravelProgram"));
const AdminLogin = React.lazy(
  () => import("./pages/AdminLogin/AdminSignIn.tsx")
);
const AdminRegister = React.lazy(
  () => import("./pages/AdminLogin/AdminSighUp.tsx")
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.setIsLoading(true));
    const validateSession = async () => {
      try {
        await authService.validateSession();
      } catch (err) {
        console.error("Session validation error:", err);
      } finally {
        dispatch(authActions.setIsLoading(false));
      }
    };

    validateSession();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/travel-programm/:programName"
          element={<TravelProgram />}
        />
        <Route path="/ulyseadmin" element={<AdminLogin />} />
        <Route path="/ulyseadmin/register" element={<AdminRegister />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

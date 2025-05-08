import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { Loader } from "./components/Loader/Loader";

const TravelProgram = React.lazy(() => import("./pages/TravelProgram"));
const AdminLogin = React.lazy(
  () => import("./pages/AdminLogin/AdminSignIn.tsx")
);
const AdminRegister = React.lazy(
  () => import("./pages/AdminLogin/AdminSighUp.tsx")
);

const App = () => {
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

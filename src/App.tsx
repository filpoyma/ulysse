import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { authService } from "./services";
import AdminPanel from './pages/AdminPanel/AdminPanel';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const TravelProgram = React.lazy(() => import("./pages/TravelProgram"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin/AdminLogin"));
const AdminRegister = React.lazy(
  () => import("./pages/AdminLogin/AdminRegister")
);

const App = () => {
  useEffect(() => {
    // Validate session on app load
    authService.validateSession().catch(() => {
      // Error handling is done in the service
      console.log("Session validation failed");
    });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/travel-programm/:programName" element={<TravelProgram />} />
        <Route path="/ulyseadmin" element={<AdminLogin />} />
        <Route path="/ulyseadmin/register" element={<AdminRegister />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

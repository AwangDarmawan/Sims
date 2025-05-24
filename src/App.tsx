
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from './pages/Auth/RegisterPage';
import MainLayout from './layouts/MainLayout';
import NavbarOnlyLayout from './layouts/NavbarLayout';
import HomePage from './pages/Dashboards/HomePage';
import TopupPage from './pages/Dashboards/TopupPage';
import ProfilPage from './pages/Dashboards/ProfilPage';
import HistoryPage from './pages/Dashboards/HistoryPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PembayaranPage from './pages/Dashboards/PembayaranPage';

function App() {
  return (
    <>
      <BrowserRouter>
     <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<MainLayout/>}>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/topup" element={<TopupPage />} />
        <Route path="/transaksi" element={<HistoryPage />} />
        <Route path="/pembayaran/:service_name" element={<PembayaranPage />} />
      </Route>

      <Route element={<NavbarOnlyLayout/>}>
        <Route path="/profil" element={<ProfilPage/>} />
      </Route>
    </Routes>
     <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
    </>
  );
}

export default App;

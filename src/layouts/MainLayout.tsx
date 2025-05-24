import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import Saldo from '../components/Alltransaksi/Saldo'
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Saldo />
      <main>
        <Outlet/>
      </main>
    </>
  );
};
export default MainLayout;
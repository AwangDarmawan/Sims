import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
const NavbarOnlyLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet/>
      </main>
    </>
  );
};

export default NavbarOnlyLayout;

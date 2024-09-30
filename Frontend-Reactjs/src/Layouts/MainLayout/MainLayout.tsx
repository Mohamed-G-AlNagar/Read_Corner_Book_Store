import { Outlet } from 'react-router-dom';

import { Navbar } from '../NavbarAndFooter/Navbar';
import { Footer } from '../NavbarAndFooter/Footer';

function MainLayOut() {
  return (
     <div className="d-flex flex-column min-vh-100 w-100">
      <Navbar />
     <div className="flex-grow-1 text-center my-0 w-100">
        <Outlet />
     </div>
      <Footer />
     </div>
  );
}

export default MainLayOut;

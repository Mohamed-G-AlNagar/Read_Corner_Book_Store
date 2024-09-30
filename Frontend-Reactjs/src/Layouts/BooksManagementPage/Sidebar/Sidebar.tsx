import React from 'react';
import { FaBook, FaFileInvoice, FaList, FaUser } from 'react-icons/fa';
import './Sidebar.css';
import { IUser } from '../../../models/IUser';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user:IUser;
}

const Sidebar: React.FC<SidebarProps> = ({user, activeTab, setActiveTab }) => {
 let isAdminUser = false;
 if(user) isAdminUser = user?.role === 'ADMIN';
 
  return (
    <nav className="bg-white glass-effect h-100">
      <ul className="nav">
        {isAdminUser && 
        <>
        <li className="nav-item  mt-2">
          <button
            className={`d-flex justify-content-center nav-link ${activeTab === 'addBook' ? 'active' : ''}`}
            onClick={() => setActiveTab('addBook')}
          >
            <FaBook className='text-primary fs-5'/>
            <span>Add Book</span>
          </button>
        </li>
        <li className="nav-item mt-2">
          <button
            className={`d-flex justify-content-center nav-link ${activeTab === 'allBooks' ? 'active' : ''}`}
            onClick={() => setActiveTab('allBooks')}
          >
            <FaList className='text-primary fs-5'/>
            <span>All Books</span>
          </button>
        </li>
        <li className="nav-item mt-2">
          <button
            className={`d-flex justify-content-center nav-link ${activeTab === 'ordersManage' ? 'active' : ''}`}
            onClick={() => setActiveTab('ordersManage')}
          >
            <FaFileInvoice className='text-primary fs-5' />
            <span>All Orders</span>
          </button>
        </li>
        </>
        }
        <li className="nav-item  mt-2">
          <button
            className={`d-flex justify-content-center nav-link ${activeTab === 'myOrders' ? 'active' : ''}`}
            onClick={() => setActiveTab('myOrders')}
          >
            <FaFileInvoice className='text-primary fs-5'/>
            <span>My Orders</span>
          </button>
        </li>
        <li className="nav-item  mt-2">
          <button
            className={`d-flex justify-content-center nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className='text-primary fs-5'/>
            <span>My Profile</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
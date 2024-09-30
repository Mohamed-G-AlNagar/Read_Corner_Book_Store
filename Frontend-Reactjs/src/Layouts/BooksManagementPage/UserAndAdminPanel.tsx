import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import AddBookForm from './AddBookForm/AddBookForm';
import AllBooksTable from './AllBooksTable/AllBooksTable';
import OrderStatus from './OrderStatus/OrderStatus';
import { IUser } from '../../models/IUser';
import ProfileInformation from '../UserProfilePage/ProfileInformation/ProfileInformation';
import UserOrderHistory from '../UserProfilePage/UserOrderHistory/UserOrderHistory';
import Spinner from '../../Components/spinner/Spinner';
import { useUpdateMyAccount } from '../../Hooks/userHooks';

const UserAndAdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [user, setUser] = useState<IUser | null>(null);
  const [updatedBookId, setUpdatedBookId] = useState<number | null>(null);

  const {mutate: updateMyAccount} = useUpdateMyAccount();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (updatedUser: IUser) => {
    updateMyAccount(updatedUser);
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  if (!user) return <Spinner/>

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar ">
          <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <main className="col-md-9 col-lg-10 px-md-4 content">
          <div className="w-100 d-flex justify-content-center">
            {activeTab === 'addBook' && <AddBookForm updatedBookId={updatedBookId} />}
            {activeTab === 'allBooks' && <AllBooksTable setActiveTab={setActiveTab} setUpdatedBookId={setUpdatedBookId}/>}
            {activeTab === 'ordersManage' && <OrderStatus />}
            {activeTab === 'myOrders' && <UserOrderHistory />}
            {activeTab === 'profile' && <ProfileInformation user={user} updateUser={updateUser} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserAndAdminPanel;
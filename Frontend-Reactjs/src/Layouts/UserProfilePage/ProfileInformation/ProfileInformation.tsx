import React, {  useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../../Components/spinner/Spinner';
import { IUser } from '../../../models/IUser';

interface ProfileInformationProps {
  user: IUser;
  updateUser: (user: IUser) => void;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({ user, updateUser }) => {
    const [editedUser, setEditedUser] = useState<IUser | null>(user);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (editedUser) {
        setEditedUser({
          ...editedUser,
          [name]: value,
        });
      }
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (editedUser) {
        updateUser(editedUser);
        toast.success('Profile updated successfully!');
      }
    };
  
    if (!user || !editedUser) return <Spinner />;
  
    return (
      <div className="mt-4 w-100">
        <h2>Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex justify-content-center gap-3 align-items-center">
            <label htmlFor="email" className="form-label fs-5" style={{ width: '150px' }}>Email</label>
            <input
              type="email"
              className="form-control w-75"
              id="email"
              name="email"
              disabled={true}
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 d-flex justify-content-center gap-3 align-items-center">
            <label htmlFor="firstName" className="form-label fs-5" style={{ width: '150px' }}>First Name</label>
            <input
              type="text"
              className="form-control w-75"
              id="firstName"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 d-flex justify-content-center gap-3 align-items-center">
            <label htmlFor="lastName" className="form-label fs-5" style={{ width: '150px' }}>Last Name</label>
            <input
              type="text"
              className="form-control w-75"
              id="lastName"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 d-flex justify-content-center gap-3 align-items-center">
            <label htmlFor="phone" className="form-label fs-5" style={{ width: '150px' }}>Phone</label>
            <input
              type="tel"
              className="form-control w-75"
              id="phone"
              name="phone"
              value={editedUser.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 d-flex justify-content-center gap-3 align-items-center">
            <label htmlFor="address" className="form-label fs-5" style={{ width: '150px' }}>Address</label>
            <input
              type="text"
              className="form-control w-75"
              id="address"
              name="address"
              value={editedUser.address}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-25">Update Profile</button>
        </form>
      </div>
    );
  };
  
export default ProfileInformation;

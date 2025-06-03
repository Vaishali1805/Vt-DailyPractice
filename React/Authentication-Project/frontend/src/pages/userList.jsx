import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { deleteUser, editUser, getUsersData } from "../api/apiHandlers.js";
import { getLocalStorageData } from "../utils/utils.js";
import showToastMessage from "../components/showToastMessage.jsx";
import Popup from "../components/Popup.jsx";
import Button from "../components/Button.jsx";
import formStyles from "../styles/formStyles.js";
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
  const navigate = useNavigate();
  const { users, setUsers, currentUser, setCurrentUser, setIsAuthenticated } = useAuth();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);

  // request to fetch userList
  useEffect(() => {
    async function fetchData() {
      const res = await getUsersData();
      console.log("res: ", res);
      if (res?.success) {
        setUsers(res?.userData || []);   // update the state
        setCurrentUser(getLocalStorageData("currentUser") || {});
      } else {
        if (res.error.status === 401 || res.error.status === 403)
          setIsAuthenticated(false);
      }
    }
    fetchData();
  }, []);

  const handleEdit = async (id) => {
    navigate('/profileform');
  };

  const confirmDelete = async (id) => {
    const res = await deleteUser([selectedUserId]);
    console.log("res: ", res);
    showToastMessage(res?.success, res?.message);
    if (res?.success) {
      console.log("am in")
      setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUserId));
    }
    setShowDeletePopup(false);
    setSelectedUserId(null);
  };

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowDeletePopup(true);
  };

  const confirmLogout = () => {
    console.log("in logout");
    localStorage.clear();
    setIsAuthenticated(false);
  }

  const handleLogout = () => {
    setShowLogoutPopup(true);
  }

  const showInput = () => {
    console.log("am in showInput")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button
            className={formStyles.buttonSecondary}
            value={"Log out"}
            onClick={handleLogout}
          />
        </div>
        <div className="mb-6 p-4 bg-white rounded shadow">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Details</h2>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleEdit(currentUser.id)}
              title="Edit My Details">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
          <p>
            <strong>Name:</strong> {currentUser.name}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Role:</strong> {currentUser.role}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                {currentUser.role === "Admin" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users
                .filter((user) => user.id !== currentUser.id)
                .map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    {currentUser.role === "Admin" && (
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => showInput(user.id)}
                        title="Edit">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(user.id)}
                        title="Delete">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Show popup for delete */}
      {showDeletePopup && (
        <Popup
          text="Are you sure you want to delete this user?"
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeletePopup(false);
            setSelectedUserId(null);
          }}
        />
      )}

      {/* Show popup for edit */}
      {showLogoutPopup && (
        <Popup
          text="Are you sure you want to Log out?"
          onConfirm={confirmLogout}
          onCancel={() => {
            setShowLogoutPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default UserTable;
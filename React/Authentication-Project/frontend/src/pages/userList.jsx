import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { deleteUser, editUser, getUsersData } from "../api/apiHandlers.js";
import { getLocalStorageData, getSource } from "../utils/utils.js";
import showToastMessage from "../components/showToastMessage.jsx";
import Popup from "../components/Popup.jsx";
import Button from "../components/Button.jsx";
import formStyles from "../styles/formStyles.js";
import { useNavigate } from "react-router-dom";
import ImageModal from "../components/ImageModal.jsx";
import Image from "../components/Image.jsx";

const UserTable = () => {
  const navigate = useNavigate();
  const {
    users,
    setUsers,
    currentUserId,
    setCurrentUserId,
    setIsAuthenticated,
  } = useAuth();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [userIdViewImage, setUserIdViewImage] = useState(null);
  const currentUser = users.find((user) => user.id === currentUserId) || {};

  // request to fetch userList
  useEffect(() => {
    async function fetchData() {
      const res = await getUsersData();
      // showToastMessage(res?.success,res?.message);
      if (res?.success) {
        setUsers(res?.userData || []); // update the state
      }
    }
    fetchData();
  }, []);

  const handleEdit = async (id) => {
    navigate("/profileform");
  };

  const confirmDelete = async (id) => {
    const res = await deleteUser([selectedUserId]);
    showToastMessage(res?.success, res?.message);
    if (res?.success) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUserId)
      );
    }
    setShowDeletePopup(false);
    setSelectedUserId(null);
  };

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowDeletePopup(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const showInput = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setEditingUserId(userId);
      setEditedData({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    const originalUser = users.find((user) => user.id === id);

    const hasChanges =
      editedData.name !== originalUser.name ||
      editedData.email !== originalUser.email ||
      editedData.role !== originalUser.role;

    if (!hasChanges) {
      showToastMessage(false, "No changes to update.");
      setEditingUserId(null);
      return;
    }
    const res = await editUser({ id, ...editedData });
    showToastMessage(res?.success, res?.message);
    if (res?.success) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, ...res.userData } : user
        )
      );
      setEditingUserId(null);
    }
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditedData({ name: "", email: "", role: "" });
  };

  const handleViewImages = (userId) => {
    setUserIdViewImage(userId);
    setShowImageModal(true);
  };

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
          <div className="flext justify-items-end">
            <Button
              className="bg-gray-500 text-white px-4 py-2 cursor-pointer rounded-lg"
              value="Create Post"
              onClick={() => navigate("/createPost")}
            />
          </div>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile picture
                </th>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posts
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users
                .filter((user) => user.id !== currentUser.id)
                .map((user) => (
                  <tr key={user.id}>
                    {editingUserId === user.id ? (
                      <>
                        <td className="px-6 py-4">
                          <Image
                            className="w-14 h-14 rounded-full object-cover"
                            src={getSource(user?.profilePath)}
                            alt="Profile Picture"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            name="name"
                            value={editedData.name}
                            onChange={handleChange}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            name="email"
                            value={editedData.email}
                            onChange={handleChange}
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            name="role"
                            value={editedData.role}
                            onChange={handleChange}
                            className="border rounded p-1">
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                          <button
                            onClick={() => saveEdit(user.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Save">
                            ✅
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 hover:text-gray-800"
                            title="Cancel">
                            ❌
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleViewImages(user.id)}
                            className="text-blue-600 hover:underline cursor-pointer">
                            View Posts
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <Image
                            className="w-14 h-14 rounded-full object-cover"
                            src={getSource(user?.profilePath)}
                            alt="Profile Picture"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.role}
                        </td>
                        {currentUser.role === "Admin" && (
                          <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => showInput(user.id)}
                              title="Edit">
                              ✏️
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDelete(user.id)}
                              title="Delete">
                              ❌
                            </button>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleViewImages(user.id)}
                            className="text-blue-600 hover:underline cursor-pointer">
                            View Posts
                          </button>
                        </td>
                      </>
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

      {/* Image Modal */}
      {showImageModal && (
        <ImageModal
          userId={userIdViewImage}
          setShowImageModal={setShowImageModal}
        />
      )}
    </div>
  );
};

export default UserTable;

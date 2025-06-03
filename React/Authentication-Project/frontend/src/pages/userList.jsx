import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const UserTable = () => {
  const { users, currentUser } = useAuth();
  console.log("currentUser: ",currentUser);
  const loggedInUser = users[0];

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete user with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="mb-6 p-4 bg-white rounded shadow">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Details</h2>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleEdit(loggedInUser.id)}
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
            <strong>Name:</strong> {loggedInUser.name}
          </p>
          <p>
            <strong>Email:</strong> {loggedInUser.email}
          </p>
          <p>
            <strong>Role:</strong> {loggedInUser.role}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(user.id)}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;

// [
//     {
//         "name": "Vaishali",
//         "email": "vishu@gmail.com",
//         "id": 1745476237864,
//         "role": "User"
//     },
//     {
//         "name": "xyz",
//         "email": "xyz@gmail.com",
//         "id": 1747909412939,
//         "role": "Admin"
//     },
//     {
//         "name": "Ram",
//         "email": "ram@gmail.com",
//         "id": 1747909609223,
//         "role": "Admin"
//     },
//     {
//         "name": "girl",
//         "email": "girl@gmail.com",
//         "id": 1747982582540,
//         "role": "Admin"
//     },
//     {
//         "name": "abc",
//         "email": "abc@gmail.com",
//         "id": 1748352028544,
//         "role": "User"
//     }
// ]

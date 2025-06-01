import React from 'react'

function userList() {
  const users = {
  "1745476237864": {
    name: "Vaishali",
    email: "vishu@gmail.com",
    role: "User"
  },
  "1747909412939": {
    name: "xyz",
    email: "xyz@gmail.com",
    role: "Admin"
  },
  "1747909609223": {
    name: "Ram",
    email: "ram@gmail.com",
    role: "Admin"
  },
  "1747982582540": {
    name: "girl",
    email: "girl@gmail.com",
    role: "Admin"
  },
  "1748352028544": {
    name: "abc",
    email: "abc@gmail.com",
    role: "User"
  }
};

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
      <div className="grid grid-cols-1 gap-4">
        {Object.values(users).map((user, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <p className="text-lg font-semibold text-gray-800">👤 {user.name}</p>
            <p className="text-gray-600">📧 {user.email}</p>
            <p className="text-sm text-blue-500 font-medium">🎓 Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default userList
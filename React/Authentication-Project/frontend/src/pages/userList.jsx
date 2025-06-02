import { useAuth } from '../context/AuthContext.jsx';

function UserList() {
  console.log(" in userlist")
  const { users } = useAuth();
  console.log("users: ",users);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user, index) => (
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

export default UserList;

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
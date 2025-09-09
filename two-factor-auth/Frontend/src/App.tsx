import { useState } from "react";
import "./App.css";
import axios from 'axios';

function App() {
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target || "";
    setEmail(value);
  };

  const handleSubmit = async () => {
    console.log("am in handle Submit");
    const response = await axios.post('http://localhost:2500/auth/verifyEmail',{email})
    console.log("response: ",response);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="d-flex flex-column gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={email}
          className="form-control"
        />
        <button className="btn btn-secondary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;

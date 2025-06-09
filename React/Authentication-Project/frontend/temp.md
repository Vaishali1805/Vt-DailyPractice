multiple request prevention

1. Disable button while processing
const [isProcessing, setIsProcessing] = useState(false);

const handleClick = async () => {
  if (isProcessing) return; // Prevent double click

  setIsProcessing(true); // Disable button
  const res = await someAsyncRequest();
  setIsProcessing(false); // Enable button again

  // handle response...
};

<Button 
  onClick={handleClick} 
  disabled={isProcessing}
  className={isProcessing ? "opacity-50 cursor-not-allowed" : ""}
  value={isProcessing ? "Please wait..." : "Submit"} 
/>

2. Debounce the button click

npm install lodash
import { debounce } from "lodash";

const handleClick = debounce(async () => {
  const res = await someAsyncRequest();
}, 1000); // executes only once per 1 second


import jwtDecode from "jwt-decode";

// Get token from localStorage
const token = localStorage.getItem("token");

// Decode token
if (token) {
  const decoded = jwtDecode(token);
  console.log("User ID from token:", decoded.id);
}


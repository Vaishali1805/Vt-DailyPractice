import AuthProvider from "./context/AuthContext.jsx";
import AppContent from './navigation/AppContent.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <ToastContainer position="top-right" autoClose={1500} />
    </AuthProvider>
  );
}

export default App
import { RouterProvider } from "react-router-dom";
import router from "./Routes.jsx";

function AppContent() {
  return <RouterProvider router={router} />
}

export default AppContent;
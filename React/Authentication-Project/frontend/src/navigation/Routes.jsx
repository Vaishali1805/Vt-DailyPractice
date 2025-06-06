import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Forgotpass from "../pages/Forgotpass";
import UserList from "../pages/userList";
import { Outlet,createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import ProfileForm from "../pages/ProfileForm";
import CreatePost from "../pages/CreatePost";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Outlet />}>
            <Route element={<ProtectedRoutes />}>
                <Route index element={<HomePage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="userlist" element={<UserList />} />
                <Route path="profileform" element={<ProfileForm />} />
                <Route path="createpost" element={<CreatePost />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgotpassword" element={<Forgotpass />} />
            <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
    )
)

export default router;
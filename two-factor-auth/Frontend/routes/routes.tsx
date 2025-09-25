import { Outlet,createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Otp from '../'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Outlet />}>
            <Route path="forgotpassword" element={<Otp />} />
            <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
    )
)

export default router;
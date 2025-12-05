import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login/Login";
import BeARider from "../Pages/BeARider/BeARider";
import Pricing from "../Pages/Pricing/Pricing";
import AboutUs from "../Pages/AboutUs/AboutUs";
import TrackOrder from "../Pages/TrackOrder/TrackOrder";
import Error from "../Pages/Error/Error";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import AuthLayout from "../Layouts/AuthLayout";
import Registration from "../Pages/Authentication/Registration/Registration";
import ForgetPassword from "../Pages/Authentication/ForgetPassword/ForgetPassword";
import EnterCode from "../Pages/Authentication/ForgetPassword/EnterCode";
import ResetPassword from "../Pages/Authentication/ForgetPassword/ResetPassword";
import PrivateRoute from "../Route/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [

            { index: true, Component: Home },
            { path: "beARider", Component: BeARider },
            { path: "pricing", Component: Pricing },
            { path: "about", Component: AboutUs },
            { path: "trackOrder", element: <PrivateRoute><TrackOrder /></PrivateRoute> },
            { path: "coverage", Component: Coverage },
            { path: "sendParcel", Component: SendParcel },
            { path: "*", Component: Error }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            { path: "login", Component: Login },
            { path: "registration", Component: Registration },
            { path: "forgetPassword", Component: ForgetPassword },
            { path: "enterCode", Component: EnterCode },
            { path: "resetPassword", Component: ResetPassword }
        ]
    }
]);
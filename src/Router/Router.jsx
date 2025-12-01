import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import BeARider from "../Pages/BeARider/BeARider";
import Pricing from "../Pages/Pricing/Pricing";
import AboutUs from "../Pages/AboutUs/AboutUs";
import TrackOrder from "../Pages/TrackOrder/TrackOrder";
import Error from "../Pages/Error/Error";
import Coverage from "../Pages/Coverage/Coverage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [

            { index: true, Component: Home },
            { path: "beARider", Component: BeARider },
            { path: "pricing", Component: Pricing },
            { path: "about", Component: AboutUs },
            { path: "trackOrder", Component: TrackOrder },
            { path: "coverage", Component: Coverage },
            { path: "*", Component: Error },
            { path: "signIn", Component: Login }

        ]
    },
]);
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [

            { index: true, Component: Home },
            { path: "signIn", Component: Login }

        ]
    },
]);
import { createBrowserRouter } from "react-router-dom"
import { Desktops } from "./pages/desktops"
import { Users } from "./pages/users"
import { SignIn } from "./pages/sign-in"
import { PrivateRoute } from "./components/common/private-route"
import { AppLayout } from "./components/common/app-layout"
import Forbidden from "./pages/forbidden"
import { CanAccessRoute } from "./components/common/can-access-route"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><AppLayout/></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Desktops />,
            },
            {
                path: "forbidden",
                element: <Forbidden />,
            },
            {
                path: "desktops",
                element: <Desktops />,
            },
            {
                path: "users",
                element: <CanAccessRoute permission="VIEW_USERS"><Users /></CanAccessRoute>,
            }
        ]
    },
    {
        path: "/sign-in",
        element: <SignIn />
    }
])
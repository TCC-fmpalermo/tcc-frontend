import { createBrowserRouter } from "react-router-dom"
import { Desktops } from "./pages/desktops"
import { Users } from "./pages/users"
import { SignIn } from "./pages/sign-in"
import { ProtectedRoute } from "./components/common/protected-route"
import { AppLayout } from "./components/common/app-layout"
import Forbidden from "./pages/forbidden"
import { CanAccessRoute } from "./components/common/can-access-route"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><AppLayout/></ProtectedRoute>,
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
                element: <CanAccessRoute permission="create_user"><Users /></CanAccessRoute>,
            }
        ]
    },
    {
        path: "/sign-in",
        element: <SignIn />
    }
])
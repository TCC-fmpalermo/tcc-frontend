import { createBrowserRouter } from "react-router-dom"
import { Desktops } from "./pages/desktops"
import { Users } from "./pages/users"
import { SignIn } from "./pages/sign-in"
import { ProtectedRoute } from "./components/common/protected-route"
import { AppLayout } from "./components/common/app-layout"

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
                path: "desktops",
                element: <Desktops />,
            },
            {
                path: "users",
                element: <Users />,
            }
        ]
    },
    {
        path: "/sign-in",
        element: <SignIn />
    }
])
import { createBrowserRouter } from "react-router-dom"
import { Desktops } from "./pages/desktops"
import { Users } from "./pages/users"
import { SignIn } from "./pages/sign-in"
import { ProtectedRoute } from "./components/protected-route"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><Desktops /></ProtectedRoute>,
        children: [
            {
                path: "/desktops",
                element: <Desktops />,
            },
            {
                path: "/users",
                element: <Users />,
            }
        ]
    },
    {
        path: "/sign-in",
        element: <SignIn />
    }
])
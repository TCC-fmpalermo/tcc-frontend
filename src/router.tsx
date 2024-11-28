import { createBrowserRouter } from "react-router-dom"
import { Desktops } from "./pages/desktops"
import { ManageUsers } from "./pages/manage-users"
import { SignIn } from "./pages/sign-in"
import { PrivateRoute } from "./components/common/private-route"
import { AppLayout } from "./components/common/app-layout"
import Forbidden from "./pages/forbidden"
import { CanAccessRoute } from "./components/common/can-access-route"
import { NewDesktop } from "./pages/new-desktop"
import { DesktopOptions } from "./pages/desktop-options"

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
                path: "my-desktops",
                element: <Desktops />,
            },
            {
                path: "new-desktop",
                element: <NewDesktop />,
            },
            {
                path: "desktop-options",
                element: <DesktopOptions />
            },
            {
                path: "users",
                element: <CanAccessRoute permission="VIEW_USERS"><ManageUsers /></CanAccessRoute>,
            },
            {
                path: "forbidden",
                element: <Forbidden />,
            },
        ]
    },
    {
        path: "/sign-in",
        element: <SignIn />
    }
])
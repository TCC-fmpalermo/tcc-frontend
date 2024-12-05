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
import { MyDesktops } from "./pages/my-desktops"
import { AccessDesktop } from "./pages/access-desktop"
import { DesktopRequests } from "./pages/desktop-requests"
import { MyRequests } from "./pages/my-requests"
import { SignUp } from "./pages/sign-up"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><AppLayout/></PrivateRoute>,
        children: [
            {
                index: true,
                element: <MyDesktops />,
            },
            {
                path: "my-desktops",
                element: <MyDesktops />,
            },
            {
                'path': "my-requests",
                element: <MyRequests />
            },
            {
                path: "new-desktop",
                element: <NewDesktop />,
            },
            {
                path: "desktop-options",
                element: <CanAccessRoute permission="MANAGE_DESKTOP_OPTIONS"><DesktopOptions /></CanAccessRoute>
            },
            {
                path: "desktops",
                element: <CanAccessRoute permission="MANAGE_DESKTOPS"><Desktops /></CanAccessRoute>,
            },
            {
                path: "users",
                element: <CanAccessRoute permission="MANAGE_USERS"><ManageUsers /></CanAccessRoute>,
            },
            {
                path: 'desktop-requests',
                element: <CanAccessRoute permission="MANAGE_DESKTOP_REQUESTS"><DesktopRequests /></CanAccessRoute>,
            },
            {
                path: "forbidden",
                element: <Forbidden />,
            },
        ]
    },
    {
        path: "/access-desktop",
        element: <PrivateRoute><AccessDesktop /></PrivateRoute>,
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    }
])
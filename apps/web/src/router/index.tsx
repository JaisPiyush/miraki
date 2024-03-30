import {
    createBrowserRouter
} from "react-router-dom"
import LoginView from "@/views/login_view.tsx";
import HomeView from "@/views/home";
import SpaceView from "@/views/space_view";
import AppsView from "@/views/apps";

const browserRouter = createBrowserRouter([
    {
        path: "/login",
        element: <LoginView />
    },
    {
        path: '/',
        element: <HomeView />
    },
    {
        path: '/spaces',
        element: <SpaceView />
    },
    {
        path: '/apps',
        element: <AppsView />
    }
]);

export {browserRouter};
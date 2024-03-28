import {
    createBrowserRouter
} from "react-router-dom"
import LoginView from "@/views/login_view.tsx";
import HomeView from "@/views/home";
import SpaceView from "@/views/space_view";

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
    }
]);

export {browserRouter};
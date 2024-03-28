import {
    createBrowserRouter
} from "react-router-dom"
import LoginView from "@/views/login_view.tsx";
import HomeView from "@/views/home";

const browserRouter = createBrowserRouter([
    {
        path: "/login",
        element: <LoginView />
    },
    {
        path: '/',
        element: <HomeView />
    }
]);

export {browserRouter};
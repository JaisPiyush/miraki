import {
    createBrowserRouter
} from "react-router-dom"
import App from '../App.tsx'

const browserRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />
    }
]);

export {browserRouter};
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Todos from "./pages/Todos";

const browserRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/todos",
        element: <Todos />,
    },
]);

function App() {
    return <RouterProvider router={browserRouter} />;
}

export default App;

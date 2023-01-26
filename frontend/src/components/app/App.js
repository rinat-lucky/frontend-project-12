import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "../homePage/HomePage";
import LoginPage from "../loginPage/LoginPage";
import NotFoundPage from "../404/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "404",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

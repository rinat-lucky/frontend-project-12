import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
    errorElement: <NotFoundPage />,
	},
	{
		path: "login",
		element: <LoginPage />,
	},
	{
		path: "signup",
		element: <SignupPage />,
	},
]);

export default router;

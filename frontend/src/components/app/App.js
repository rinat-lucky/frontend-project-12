import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "../../contexts/AuthContext";
import HomePage from "../homePage/HomePage";
import LoginPage from "../loginPage/LoginPage";
import SignupPage from "../signupPage/SignupPage";
import NotFoundPage from "../404/NotFoundPage";

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

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;

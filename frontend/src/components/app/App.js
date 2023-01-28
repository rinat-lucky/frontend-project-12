import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "../../contexts/AuthContext";
import HomePage from "../homePage/HomePage";
import LoginPage from "../loginPage/LoginPage";
import SignupPage from "../signupPage/SignupPage";
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
		path: "signup",
		element: <SignupPage />,
	},
	{
		path: "404",
		element: <NotFoundPage />,
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

import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import router from "../pages";
import store from "../slices"

function App() {
	return (
		<Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
	);
}

export default App;

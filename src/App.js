import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoutes from "./components/PrivateRoute";
import MainPage from "./pages/MainPage";
import OrdersPage from "./pages/OrdersPage";
import RegPage from "./pages/RegPage";
import NewOrderCreate from "./pages/NewOrderCreate";
import OrderDetailPage from "./pages/OrderDetailPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import UserProfile from "./pages/UserProfile";
import Notice from "./pages/Notice";

import "./style/style.scss";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route element={<MainPage />} path="/" exact />
					<Route element={<PrivateRoutes />}>
						<Route element={<OrdersPage />} path="/orders" />
						<Route element={<NewOrderCreate />} path="/new_order_create" />
						<Route element={<OrderDetailPage />} path="/order_detail/:uuid" />
						<Route element={<UserPage />} path="/profile" />
						<Route element={<UserProfile />} path="/user_profile/:user" />
						<Route element={<Notice />} path="/notice" />
						<Route element={<LoginPage />} path="/login" />
						<Route element={<RegPage />} path="/registration" />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;

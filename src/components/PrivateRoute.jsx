import React from "react";
import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
	const navigate = useNavigate();

	return (
		<Route
			{...rest}
			element={
				isAuthenticated ? (
					<Element />
				) : (
					// Используем navigate для перенаправления на маршрут /login
					navigate("/login", { replace: true })
				)
			}
		/>
	);
};

export default PrivateRoute;

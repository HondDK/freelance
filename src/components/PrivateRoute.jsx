import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
	const auth = { token: localStorage.getItem("access_token") };
	const location = useLocation();

	const isLoginPage = location.pathname === "/login";
	const isRegistrationPage = location.pathname === "/registration";

	if (!auth.token) {
		return <Navigate to="/login" />;
	} else if (isLoginPage || isRegistrationPage) {
		return <Navigate to="/profile" />;
	} else {
		return <Outlet />;
	}
};

export default PrivateRoutes;

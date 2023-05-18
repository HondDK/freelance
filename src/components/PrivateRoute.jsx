import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
	const auth = { token: localStorage.getItem("access_token") };
	const location = useLocation();

	const isLoginPage = location.pathname === "/login";
	const isRegistrationPage = location.pathname === "/registration";

	if (!auth.token) {
		if (isLoginPage || isRegistrationPage) {
			return <Outlet />;
		} else {
			return <Navigate to="/login" />;
		}
	} else {
		return <Outlet />;
	}
};

export default PrivateRoutes;

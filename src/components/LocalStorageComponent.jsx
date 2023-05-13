import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const LocalStorageComponent = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("access_token");

		if (token) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	if (isLoggedIn) {
		return <>{children}</>;
	} else {
		return (
			<>
				<Link to="/registration" relative="path">
					<button>Регистрация</button>{" "}
				</Link>
				<Link to="/login" relative="path">
					<button>Вход</button>
				</Link>
			</>
		);
	}
};

export default LocalStorageComponent;

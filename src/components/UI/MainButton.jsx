import React from "react";
import { Link } from "react-router-dom";

const MainButton = ({ children }) => {
	return (
		<Link to="/orders" relative="path">
			<button>{children}</button>
		</Link>
	);
};

export default MainButton;

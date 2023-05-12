import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
	return (
		<header>
			<Link to="/orders" relative="path">
				<h1>FREELANCE</h1>
			</Link>
			<div>
				<Link to="/registration" relative="path">
					<button>+ cоздать заказ</button>
				</Link>
				<Link to="/registration" relative="path">
					<button>Регистрация</button>{" "}
				</Link>
				<button>Вход</button>
			</div>
		</header>
	);
};

export default Header;

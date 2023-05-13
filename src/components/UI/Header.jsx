import React from "react";
import { Link } from "react-router-dom";
import LocalStorageComponent from "../LocalStorageComponent";
const Header = () => {
	return (
		<header>
			<Link to="/orders" relative="path">
				<h1>FREELANCE</h1>
			</Link>
			<div>
				<button>Уведомления</button>
				<Link to="/new_order_create" relative="path">
					<button>+ cоздать заказ</button>
				</Link>
				<LocalStorageComponent>
					<Link to="/profile" relative="path">
						<button>Профиль</button>
					</Link>
				</LocalStorageComponent>
				
			</div>
		</header>
	);
};

export default Header;

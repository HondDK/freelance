import React, { useState } from "react";
import useFetch from "./../../hooks/useFetch";
const DropdownNotice = () => {
	const [isOpen, setIsOpen] = useState(false);

	const items = useFetch(
		"http://165.232.118.51:8001/freelance/orders/order_responses/"
	);
	console.log(items);
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="dropdown">
			<button className="dropdown-toggle" onClick={toggleDropdown}>
				Уведомления
			</button>
			{isOpen && (
				<ul className="dropdown-menu">
					<li>Option 1</li>
					<li>Option 2</li>
					<li>Option 3</li>
				</ul>
			)}
		</div>
	);
};

export default DropdownNotice;

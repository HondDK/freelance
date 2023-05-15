import React, { useState } from "react";

const DropdownNotice = () => {
	const [isOpen, setIsOpen] = useState(false); // состояние для открытия/закрытия выпадающего списка

	const toggleDropdown = () => {
		setIsOpen(!isOpen); // обновляем состояние isOpen при каждом клике на выпадающий список
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

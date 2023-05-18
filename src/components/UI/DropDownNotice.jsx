import React, { useState } from "react";
import useFetch from "./../../hooks/useFetch";
import { Link } from "react-router-dom";
const DropdownNotice = () => {
	const [isOpen, setIsOpen] = useState(false);

	const items = useFetch(
		"http://165.232.118.51:8001/freelance/orders/order_responses/"
	);
	console.log(items);
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	if (!items || !items.results) {
		return null; // Пока данные загружаются, не отображаем ничего или можно показать спиннер загрузки
	}
	const unseenData = items.results.filter((item) => !item.is_seen);

	return (
		<div className="dropdown">
			<button className="dropdown-toggle" onClick={toggleDropdown}>
				Уведомления ({items.count})
			</button>
			{isOpen && (
				<ul className="dropdown-menu">
					{unseenData.map((item) => (
						<Link to={`/notice/`} key={item.uuid}>
							<li>
								<p>Пользователь готов выполнить заказ!</p>
								<p>Заказ: {item.order.title}</p>
								<p>Сообщение: {item.text}</p>
								<p>Цена: {item.suggest_price}</p>
								<p>Дедлайн: {item.proposed_deadline}</p>
							</li>
						</Link>
					))}
				</ul>
			)}
		</div>
	);
};

export default DropdownNotice;

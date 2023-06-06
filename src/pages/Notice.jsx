import React, { useEffect, useState } from "react";
import Header from "../components/UI/Header";
import useFetch from "../hooks/useFetch";
import axios from "axios";

import { Link } from "react-router-dom";
const Notice = () => {
	const data = useFetch(
		"http://freelance_web/freelance/orders/order_responses/"
	);
	useEffect(() => {
		console.log(data);
	}, [data]);

	function markAsSeen(uuid) {
		axios
			.delete(
				`http://freelance_web/freelance/orders/order_responses/${uuid}/`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				}
			)
			.then((response) => {
				// Обработка успешного обновления
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	const [isSent, setIsSent] = useState(false);
	function submitOrder(user, deadline, uuid) {
		const post = {
			employee_id: user,
			deadline_date: deadline,
		};
		console.log(uuid);
		axios
			.post(
				`http://freelance_web/freelance/orders/orders/${uuid}/choose_employee/`,
				post,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				}
			)
			.then((response) => {
				console.log(response);
				setIsSent(true);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	if (!data || !data.results) {
		return null; // Пока данные загружаются, не отображаем ничего или можно показать спиннер загрузки
	}

	const unseenData = data.results.filter((item) => !item.is_seen);

	return (
		<div>
			<Header></Header>

			<div className="userprofile_orders">
				<h1>Ответы на заказы</h1>
				{unseenData.length > 0 ? (
					unseenData.map((item) => (
						<div key={item.uuid} className="userprofile_order">
							<span>Заказ: {item.order.title}</span>
							<span>Сообщение: {item.text}</span>
							<span>Дедлайн: {item.proposed_deadline}</span>
							<span>Цена: {item.suggest_price}</span>
							<div>
								<Link to={`/user_profile/${item.user}`} relative="path">
									<button>Посмотреть профиль исполнителя</button>
								</Link>
								<button onClick={() => markAsSeen(item.uuid)}>Удалить</button>
							</div>
							<button
								disabled={isSent}
								onClick={() =>
									submitOrder(
										item.user,
										item.proposed_deadline,
										item.order.uuid
									)
								}
							>
								{!isSent ? "Принять" : "Заказ принят!"}
							</button>
						</div>
					))
				) : (
					<div>Ответов не найдено...</div>
				)}
			</div>
		</div>
	);
};

export default Notice;

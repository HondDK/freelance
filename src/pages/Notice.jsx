import React, { useEffect } from "react";
import Header from "../components/UI/Header";
import useFetch from "../hooks/useFetch";
import axios from "axios";

import { Link } from "react-router-dom";
const Notice = () => {
	const data = useFetch(
		"http://165.232.118.51:8001/freelance/orders/order_responses/"
	);
	useEffect(() => {
		console.log(data);
	}, [data]);

	function submitOrder(user, deadline, uuid) {
		const post = {
			employee_id: user,
			deadline_date: deadline,
		};
		console.log(uuid);
		axios
			.post(
				`http://165.232.118.51:8001/freelance/orders/orders/${uuid}/choose_employee/`,
				post,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				}
			)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<div>
			<Header></Header>

			<div className="userprofile_orders">
				<h1>Ответы на заказы</h1>
				{data &&
					data.results &&
					data.results.map((item) => (
						<div key={item.uuid} className="userprofile_order">
							<span>Заказ: {item.order.title}</span>
							<span>Сообщение: {item.text}</span>
							<span>Дедлайн: {item.proposed_deadline}</span>
							<span>Цена: {item.suggest_price}</span>
							<Link to={`/user_profile/${item.user}`} relative="path">
								<button>Посмотреть профиль исполнителя</button>
							</Link>
							<button
								onClick={() =>
									submitOrder(
										item.user,
										item.proposed_deadline,
										item.order.uuid
									)
								}
							>
								Принять
							</button>
						</div>
					))}
			</div>
		</div>
	);
};

export default Notice;

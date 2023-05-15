import React, { useEffect } from "react";
import Header from "../components/UI/Header";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
const UserProfile = () => {
	const { user } = useParams();
	const items = useFetch(
		`http://165.232.118.51:8001/freelance/auth/users/${user}`
	);

	const data = useFetch(
		"http://165.232.118.51:8001/freelance/orders/order_responses/"
	);

	useEffect(() => {
		console.log(items);
		console.log(data);
	}, [items, data]);

	function submitOrder(uuid, deadline) {
		const post = {
			employee_id: user,
			deadline_date: deadline,
		};

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
			<Header />
			<main className="userpage">
				{items && (
					<>
						<h1>{items.customer_description}</h1>
						<p>{items.employee_description}</p>
						<div className="userpage_contact">
							<div className="userpage_active_contact">
								<h1>Контакты для связи с пользователем</h1>
								{items.links_to_communicate &&
									items.links_to_communicate.map((item) => (
										<div key={item.name}>
											{item.name}
											{item.link}
										</div>
									))}
							</div>
						</div>
					</>
				)}
				<h1>Ответы на заказы</h1>
				<div className="userprofile_orders">
					{data &&
						data.results &&
						data.results.map((item) => (
							<div key={item.uuid} className="userprofile_order">
								<span>Заказ: {item.order.title}</span>
								<span>Сообщение: {item.text}</span>
								<span>Дедлайн: {item.proposed_deadline}</span>
								<span>Цена: {item.suggest_price}</span>
								<button
									onClick={() => submitOrder(item.uuid, item.proposed_deadline)}
								>
									Принять
								</button>
							</div>
						))}
				</div>
			</main>
		</div>
	);
};

export default UserProfile;

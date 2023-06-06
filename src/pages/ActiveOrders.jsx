import React, { useEffect, useState } from "react";
import Header from "../components/UI/Header";
import useFetch from "../hooks/useFetch";
import axios from "axios";

import { Link } from "react-router-dom";

const ActiveOrders = () => {
	const data = useFetch(
		"http://freelance_web:8001/freelance/orders/order_responses/"
	);
	useEffect(() => {
		console.log(data);
	}, [data]);

	function markAsSeen(uuid) {
		axios
			.delete(
				`http://freelance_web:8001/freelance/orders/order_responses/${uuid}/`,
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

	function payOrder(uuid, price, orderTitle) {
		const url = "https://api.yookassa.ru/v3/payments";
		const auth = {
			shopId: "503897",
			secretKey: "test_*gql0X8xgb6-W1Prdbpyxjtndx6c6tsyFG9D1OzaHs2FI",
		};
		const headers = {
			"Idempotence-Key": uuid,
			"Content-Type": "application/json",
		};
		const data = {
			amount: {
				value: price,
				currency: "RUB",
			},
			capture: true,
			confirmation: {
				type: "redirect",
				return_url: "https://www.example.com/return_url",
			},
			description: orderTitle,
		};

		axios
			.post(url, data, {
				u: auth,
				headers: headers,
			})
			.then((response) => {
				console.log("Ответ сервера:", response.data);
			})
			.catch((error) => {
				console.error("Ошибка:", error);
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
				<h1>Принятые заказы</h1>
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
									payOrder(item.uuid, item.suggest_price, item.order.title)
								}
							>
								Оплатить заказ
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

export default ActiveOrders;

import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Header from "../components/UI/Header";
import Time from "../components/Time";
import { useParams } from "react-router-dom";
import axios from "axios";
const OrderDetailPage = () => {
	const { uuid } = useParams(); // retrieve the UUID from the URL
	const items = useFetch(
		`http://165.232.69.211:8001/freelance/orders/orders/${uuid}`
	);
	console.log(items);

	const [isSent, setIsSent] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	function openSubmitOrder() {
		setIsOpen(!isOpen);
	}

		const [text, setText] = useState("");

		function handleChangeText(e) {
			setText(e.target.value);
		}

		const [price, setPrice] = useState("");

		function handleChangePrice(e) {
			setPrice(e.target.value);
		}

		const [deadline, setDeadline] = useState("");

		function handleChangeDeadline(e) {
			setDeadline(e.target.value);
		}

	function submitOrder(e) {
		e.preventDefault();
		setIsOpen(!isOpen);
		if (!isSent) {
			const post = {
				text: text,
				suggest_price: price,
				proposed_deadline: deadline,
				order: uuid,
			};

			axios
				.post(
					"http://165.232.69.211:8001/freelance/orders/order_responses/",
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
	}

	return (
		<>
			<Header />
			<main className="order_detail_page">
				<article className="order_detail_page_detail">
					<div>
						<div className="order_detail_page_detail_text_head">
							<h1>{items.title}</h1>
							<h1>{items.price}₸</h1>
						</div>
						<Time props={items.created}></Time>
						<p>{items.is_done ? "Выполнено" : "Не выполнено"}</p>
					</div>
					<div>{items.description}</div>

					{!isOpen && (
						<div className="tags_btn">
							<div className="order_detail_page_detail_text_tags">
								{items &&
									items.tags &&
									items.tags.map((tag) => (
										<div className="tag">{tag.name}</div>
									))}
							</div>
							{!items.is_done && (
								<button
									className="btn_send"
									disabled={isSent}
									onClick={openSubmitOrder}
								>
									{(!isSent && <span>Откликнуться </span>) || (
										<span>Отклик отправлен!</span>
									)}
								</button>
							)}
						</div>
					)}
					{isOpen && (
						<div className="order_detail_page_detai_dropdown">
							<input
								type="text"
								onChange={handleChangeText}
								placeholder="Сообщение заказчику"
							/>
							<input
								type="number"
								onChange={handleChangePrice}
								placeholder="За какую цену готовы взяться"
							/>
							<input
								type="date"
								onChange={handleChangeDeadline}
								placeholder="Предлагаемый дедлайн (Писать в формате год-месяц-день)"
							/>
							<button onClick={submitOrder}>Отправить</button>
						</div>
					)}
				</article>

				<aside className="order_detail_page_contacts">
					<p>{items.creator_username}</p>
					<p>Контакты заказчика</p>
					{items &&
						items.links_to_communicate &&
						items.links_to_communicate.map((item) => <span>{item.link}</span>)}
				</aside>
			</main>
		</>
	);
};

export default OrderDetailPage;

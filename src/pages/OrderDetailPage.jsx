import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Header from "../components/UI/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
const OrderDetailPage = () => {
	const { uuid } = useParams(); // retrieve the UUID from the URL
	const items = useFetch(
		`http://165.232.118.51:8001/freelance/orders/orders/${uuid}`
	);

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
		const post = {
			text: text,
			suggest_price: price,
			proposed_deadline: deadline,
			order: uuid,
		};

		axios
			.post(
				"http://165.232.118.51:8001/freelance/orders/order_responses/",
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
		<>
			<Header />
			<main className="order_detail_page">
				<article className="order_detail_page_detail">
					<div className="order_detail_page_detail_text_head">
						<h1>{items.title}</h1>
						<h1>{items.price}₸</h1>
					</div>
					<p>{items.created}</p>
					<p>{items.description}</p>
					{!isOpen && (
						<>
							<div className="order_detail_page_detail_text_tags">
								{items &&
									items.tags &&
									items.tags.map((tag) => (
										<div className="tag">{tag.name}</div>
									))}
							</div>
							<button onClick={openSubmitOrder}>Откликнуться</button>
						</>
					)}

					{isOpen && (
						<div className="order_detail_page_detai_dropdown">
							<input
								type="text"
								onChange={handleChangeText}
								placeholder="Сообщение заказчику"
							/>
							<input
								type="text"
								onChange={handleChangePrice}
								placeholder="За какую цену готовы взяться"
							/>
							<input
								type="text"
								onChange={handleChangeDeadline}
								placeholder="Предлагаемый дедлайн"
							/>
							<button onClick={submitOrder}>Отправить</button>
						</div>
					)}
				</article>

				<aside className="order_detail_page_contacts">
					<p>{items.creator_username}</p>
					<p>Контакты заказчика</p>
				</aside>
			</main>
		</>
	);
};

export default OrderDetailPage;

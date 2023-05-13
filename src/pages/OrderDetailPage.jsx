import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Header from "../components/UI/Header";
import { useParams } from "react-router-dom";
const OrderDetailPage = () => {
	const { uuid } = useParams(); // retrieve the UUID from the URL
	const items = useFetch(
		`http://165.232.118.51:8001/freelance/orders/orders/${uuid}`
	);

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
					<div className="order_detail_page_detail_text_tags">
						{items &&
							items.tags &&
							items.tags.map((tag) => <div className="tag">{tag.name}</div>)}
						<button>Откликнуться</button>
					</div>
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

import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
const OrderDetailPage = () => {
	const items = useFetch(
		"http://165.232.118.51:8001/freelance/orders/orders" +
			"8088dfc5-6443-4409-a289-74b1c723bdbe"
	);

	return (
		<>
			<header>
				<h1>FREELANCE</h1>{" "}
				<div>
					<button>Регистрация</button> <button>Вход</button>{" "}
				</div>
			</header>
			<main className="order_detail_page">
				<article className="order_detail_page_detail">
					<div className="">
						<p>title</p>
						<span>10000tg</span>
					</div>
					<p></p><button>Откликнуться</button>
				</article>
				<aside className="order_detail_page_contacts"></aside>
			</main>
		</>
	);
};

export default OrderDetailPage;
import React from "react";
import useFetch from "../hooks/useFetch";

const OrdersPage = () => {
	const items = useFetch("http://165.232.118.51:8001/freelance/orders/orders");

	return (
		<>
			<header>
				<h1>FREELANCE</h1>
				<div>
					<button>Регистрация</button> <button>Вход</button>
				</div>
			</header>
			<main className="orders_page">
				{items &&
					items.results &&
					items.results.map((item) => (
						<>
							<article className="block_orders">
								<h1>Заказы({items.count})</h1>

								<div className="block_order">
									<p className="head">{item.title}</p>
									<img className="block_order_img" src="" alt="" />
									<div className="tags">
										{item.tags.map((tag) => (
											<div className="tag">{tag.name}</div>
										))}
									</div>
									<span className="price">{item.price}₸</span>
								</div>
							</article>
							<aside className="aside_orders_page">
								<input type="text" />
								<div className="aside_tags">
									<div className="aside_tag">Разработка</div>
									<div className="aside_tag">Тестирование</div>
									<div className="aside_tag">Дизайн</div>
									<div className="aside_tag">Контент</div>
									<div className="aside_tag">Верстка</div>
									<div className="aside_tag">Верстка</div>
								</div>
							</aside>
						</>
					))}
			</main>
		</>
	);
};

export default OrdersPage;

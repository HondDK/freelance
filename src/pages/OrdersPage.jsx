import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const OrdersPage = () => {
	const itemsCategory = useFetch(
		"http://165.232.118.51:8001/freelance/orders/categories"
	);

	const itemsTags = useFetch(
		"http://165.232.118.51:8001/freelance/orders/tags"
	);

	const [items, setItems] = useState([]);
	const noSortedItems = useFetch(
		"http://165.232.118.51:8001/freelance/orders/orders"
	);
	useEffect(() => {
		setItems(noSortedItems);
	}, [noSortedItems]);

	function selectTag(e) {
		const tagUuids = e;
		fetch(`http://165.232.118.51:8001/freelance/orders/orders?tags=${tagUuids}`)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}

	return (
		<>
			<header>
				<h1>FREELANCE</h1>
				<div>
					<button>Регистрация</button> <button>Вход</button>
				</div>
			</header>
			<main className="orders_page">
				<article className="block_orders">
					<h1>Заказы({items.count})</h1>
					{items &&
						items.results &&
						items.results.map((item) => (
							<div className="block_order">
								<>
									<p className="head">{item.title}</p>
									<img className="block_order_img" src="" alt="" />
									<div className="tags">
										{item.tags.map((tag) => (
											<div className="tag">{tag.name}</div>
										))}
									</div>
									<span className="price">{item.price}₸</span>
								</>
							</div>
						))}
				</article>

				<aside className="aside_orders_page">
					<input type="text" />

					{/* <div className="aside_tags">
						{itemsCategory &&
							itemsCategory.results &&
							itemsCategory.results.map((item) => (
								<div
									key={item.uuid}
									onClick={() => selectCategory(item.uuid)}
									className="aside_tag"
								>
									{item.name}
								</div>
							))}
					</div> */}

					<div className="aside_tags">
						{itemsTags &&
							itemsTags.results &&
							itemsTags.results.map((item) => (
								<div
									key={item.uuid}
									onClick={() => selectTag(item.uuid)}
									className="aside_tag"
								>
									{item.name}
								</div>
							))}
					</div>
				</aside>
			</main>
		</>
	);
};

export default OrdersPage;

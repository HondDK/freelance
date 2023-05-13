import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import { Link } from "react-router-dom";
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

	const [tags, setTags] = useState([]);

	function selectTag(e) {
		const selectedTags = [e, ...tags]; // добавляем новый тег в список выбранных
		setTags(selectedTags); // сохраняем список выбранных тегов в состоянии
		const tagUuids = selectedTags.join("&tags="); // объединяем все выбранные теги в строку
		fetch(`http://165.232.118.51:8001/freelance/orders/orders?tags=${tagUuids}`)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}

	const [categories, setCategories] = useState([]);

	function selectCategory(e) {
		const selectedCategory = [e, ...tags];
		setCategories(selectedCategory);
		const categoryUuids = selectedCategory.join("&categories=");
		fetch(
			`http://165.232.118.51:8001/freelance/orders/orders?categories=${categoryUuids}`
		)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}

	function clearTags() {
		setItems(noSortedItems);
		setCategories([]);
		setTags([]);
	}

	return (
		<>
			<Header />
			<main className="orders_page">
				<article className="block_orders">
					<h1>Заказы({items.count})</h1>

					{items &&
						items.results &&
						items.results.map((item) => (
							<Link to={`/order_detail/${item.uuid}`}>
								<div key={item.uuid} className="block_order">
									<>
										<p className="head">{item.title}</p>
										<img className="block_order_img" src="" alt="" />
										<div className="tags">
											{item.tags.map((tag) => (
												<div key={tag.uuid} className="tag">
													{tag.name}
												</div>
											))}
										</div>
										<span className="price">{item.price}₸</span>
									</>
								</div>
							</Link>
						))}
				</article>

				<aside className="aside_orders_page">
					<input type="text" />
					<button onClick={clearTags}>Cбросить фильтрацию</button>
					<div className="aside_text">
						<p>Выбор по категориям</p>
					</div>
					<hr />
					<div className="aside_tags">
						{itemsCategory &&
							itemsCategory.results &&
							itemsCategory.results.map((item) => (
								<div
									key={item.uuid}
									onClick={() => selectCategory(item.uuid)}
									className="aside_tag"
									style={{
										backgroundColor: categories.includes(item.uuid)
											? "black"
											: "",
										color: categories.includes(item.uuid) ? "white" : "",
									}}
								>
									{item.name}
								</div>
							))}
					</div>
					<div className="aside_text">
						<p>Выбор по тегам</p>
					</div>
					<hr />
					<div className="aside_tags">
						{itemsTags &&
							itemsTags.results &&
							itemsTags.results.map((item) => (
								<div
									key={item.uuid}
									onClick={() => selectTag(item.uuid)}
									className="aside_tag"
									style={{
										backgroundColor: tags.includes(item.uuid) ? "black" : "",
										color: tags.includes(item.uuid) ? "white" : "",
									}}
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

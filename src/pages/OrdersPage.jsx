import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import { Link } from "react-router-dom";

const OrdersPage = () => {
	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);

	const itemsCategory = useFetch(
		"http://165.232.118.51:8001/freelance/orders/categories"
	);

	const itemsTags = useFetch(
		"http://165.232.118.51:8001/freelance/orders/tags"
	);

	const [items, setItems] = useState([]);
	const offset = (currentPage - 1) * itemsPerPage;
	const noSortedItems = useFetch(
		`http://165.232.118.51:8001/freelance/orders/orders?offset=${offset}&limit=${itemsPerPage}`
	);

	useEffect(() => {
		setItems(noSortedItems);
	}, [noSortedItems]);

	const [tags, setTags] = useState([]);
	const [categories, setCategories] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	function selectTag(e) {
		const selectedTags = [e, ...tags];
		setTags(selectedTags);
		const tagUuids = selectedTags.join("&tags=");
		fetch(`http://165.232.118.51:8001/freelance/orders/orders?tags=${tagUuids}`)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}

	function selectCategory(e) {
		const selectedCategory = [e, ...categories];
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

	const filteredItems = items.results
		? items.results.filter(
				(item) =>
					item.title &&
					item.title.toLowerCase().includes((searchQuery ?? "").toLowerCase())
		  )
		: [];

	function goToPreviousPage() {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	}

	function goToNextPage() {
		setCurrentPage(currentPage + 1);
	}

	return (
		<>
			<Header />
			<main className="orders_page">
				<article className="block_orders">
					<h1>Заказы({filteredItems.length})</h1>

					{filteredItems.length > 0 ? (
						filteredItems.map((item) => (
							<Link to={`/order_detail/${item.uuid}`} key={item.uuid}>
								<div className="block_order">
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
						))
					) : (
						<div className="block_order">
							<p>ПУСТО</p>
						</div>
					)}
					<div className="pagination_buttons">
						<button onClick={goToPreviousPage} disabled={currentPage === 1}>
							Предыдущая страница
						</button>
						<button
							onClick={goToNextPage}
							disabled={filteredItems.length < itemsPerPage}
						>
							Следующая страница
						</button>
					</div>
				</article>

				<aside className="aside_orders_page">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>

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
			<Footer />
		</>
	);
};

export default OrdersPage;

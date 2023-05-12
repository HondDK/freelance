import React, { useState } from "react";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import useFetch from "../hooks/useFetch";
const NewOrderCreate = () => {
	const itemsCategory = useFetch(
		"http://165.232.118.51:8001/freelance/orders/categories"
	);

	const itemsTags = useFetch(
		"http://165.232.118.51:8001/freelance/orders/tags"
	);

	const [activeButton, setActiveButton] = useState(false);
	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);

	function selectTag(e) {
		const selectedTags = [e, ...tags];
		setTags(selectedTags);

		setActiveButton(true);
	}

	function selectCategory(e) {
		const selectedCategory = [e, ...tags];
		setCategories(selectedCategory);

		setActiveButton(true);
	}

	function clearTags() {
		setCategories([]);
		setTags([]);
	}

	return (
		<>
			<Header />
			<main className="new_order_create">
				<form className="new_order_create_form" action="submit">
					<h1>Cоздание нового заказа</h1>
					<label>Краткое описание заказа</label>
					<input type="text" />
					<label>Детальное описание заказа, техническое задание </label>
					<input type="text" className="new_order_create_form_input" />
					<label>Цена за заказ в тенге </label>
					<input type="number" />
				</form>

				<aside className="aside_orders_page">
					<input type="text" />
					<button onClick={clearTags}>Cбросить выбор</button>
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
									style={{
										backgroundColor: categories.includes(item.uuid)
											? "black"
											: "",
										color: categories.includes(item.uuid) ? "white" : "",
									}}
									className="aside_tag"
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
									style={{
										backgroundColor: tags.includes(item.uuid) ? "black" : "",
										color: tags.includes(item.uuid) ? "white" : "",
									}}
									className="aside_tag"
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

export default NewOrderCreate;

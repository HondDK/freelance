import React, { useState } from "react";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import useFetch from "../hooks/useFetch";
import axios from "axios";
const NewOrderCreate = () => {
	const itemsCategory = useFetch(
		"http://165.232.118.51:8001/freelance/orders/categories"
	);

	const itemsTags = useFetch(
		"http://165.232.118.51:8001/freelance/orders/tags"
	);

	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);

	function selectTag(e) {
		const selectedTags = [e, ...tags];
		setTags(selectedTags);
	}

	function selectCategory(e) {
		const selectedCategory = [e, ...tags];
		setCategories(selectedCategory);
	}

	function clearTags() {
		setCategories([]);
		setTags([]);
	}

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState();

	function handleChangeTitle(e) {
		setTitle(e.target.value);
	}

	function handleChangeDesctiption(e) {
		setDescription(e.target.value);
	}
	function handleChangePrice(e) {
		setPrice(e.target.value);
	}

	const [err, setErr] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();

		if (
			title.trim() === "" ||
			description.trim() === "" ||
			price.trim() === ""
		) {
			setErr(true);
			return;
		}

		const post = {
			title: title,
			description: description,
			price: price,
			tags: tags,
			categories: categories,
		};

		axios
			.post("http://165.232.118.51:8001/freelance/orders/orders/", post, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			})
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
			<main className="new_order_create">
				<form className="new_order_create_form" action="submit">
					<h1>Cоздание нового заказа</h1>
					<label>Краткое описание заказа</label>
					<input onChange={handleChangeTitle} type="text" />
					<label>Детальное описание заказа, техническое задание </label>
					<input
						type="text"
						onChange={handleChangeDesctiption}
						className="new_order_create_form_input"
					/>
					<label>Цена за заказ в тенге </label>
					<input type="number" onChange={handleChangePrice} />
					{err && (
						<span style={{ color: "red" }}>
							Пожалуйста, заполните все поля.
						</span>
					)}
					<button onClick={handleSubmit}>Создать заказ</button>
				</form>

				<aside className="aside_orders_page">
					<button onClick={clearTags}>Cбросить выбор</button>
					<div className="aside_text">
						<p>Выбрать категории</p>
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
						<p>Выбрать теги</p>
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

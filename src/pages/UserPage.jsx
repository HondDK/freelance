import React, { useState } from "react";
import Header from "../components/UI/Header";
import useFetch from "../hooks/useFetch";
import axios from "axios";
const UserPage = () => {
	const items = useFetch(
		`http://165.232.118.51:8001/freelance/auth/users/profile`
	);

	function leaveUser() {
		localStorage.clear();
	}
	console.log(items);

	const [contact, setContact] = useState("");
	const [link, setLink] = useState("");

	function handleChangeContact(e) {
		setContact(e.target.value);
	}
	function handleChangeContactLink(e) {
		setLink(e.target.value);
	}

	function newContact(e) {
		e.preventDefault();
		const post = {
			name: contact,
			link: link,
		};

		axios
			.post(
				"http://165.232.118.51:8001/freelance/orders/link_communicate/",
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
		<div>
			<Header></Header>
			<main className="userpage">
				<h1>{items.customer_description}</h1>
				<div>
					<p>Контакты для связи</p>
					{items &&
						items.links_to_communicate &&
						items.links_to_communicate.map((item) => (
							<>
								{item.name}
								{item.link}
							</>
						))}
					<input
						placeholder="Название контакта"
						onChange={handleChangeContact}
					/>
					<input placeholder="Сам контакт" onChange={handleChangeContactLink} />
					<button onClick={newContact}>Создать контакт для связи </button>
				</div>

				<p>Созданные заказы</p>
				<div className="userpage_orders">
					{items &&
						items.customer_orders &&
						items.customer_orders.map((item) => (
							<div className="userpage_order">
								{item.title} {item.price}₸ {item.is_done}
								<div className="tags">
									{item.tags.map((tag) => (
										<div key={tag.uuid} className="tag">
											{tag.name}
										</div>
									))}
								</div>
							</div>
						))}
				</div>

				<button onClick={leaveUser}>Выйти из аккаунта</button>
			</main>
		</div>
	);
};

export default UserPage;

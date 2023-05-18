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
	const [detailProfile, setDetailProfile] = useState("");

	function handleChangeContact(e) {
		setContact(e.target.value);
	}
	function handleChangeContactLink(e) {
		setLink(contact + ": " + e.target.value);
	}

	function handleChangeProfile(e) {
		setDetailProfile(e.target.value);
	}

	function newDetailProfile() {
		const post = {
			customer_description: items.customer_description,
			employee_description: detailProfile,
		};

		axios
			.post(
				"http://165.232.118.51:8001/freelance/auth/users/update_profile/",
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

	function newContact() {
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

	function deleteOrder(uuid) {
		axios
			.delete(`http://165.232.118.51:8001/freelance/orders/orders/${uuid}`, {
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
		<div>
			<Header></Header>
			<main className="userpage">
				<h1>{items.customer_description}</h1>
				<p>{items.employee_description}</p>
				{/* <p>{items.rate_as_employee}</p>
				<p>{items.rate_as_customer}</p> */}
				<div className="userpage_new_description">
					<textarea
						placeholder="Добавить/изменить описание профиля"
						onChange={handleChangeProfile}
					/>
					<button onClick={newDetailProfile}>Добавить</button>
				</div>
				<div className="userpage_contact">
					<div className="userpage_active_contact">
						<h1>Контакты для связи</h1>
						{items &&
							items.links_to_communicate &&
							items.links_to_communicate.map((item) => (
								<div>
									{item.name}
									{item.link}
								</div>
							))}
					</div>
					<div className="userpage_new_contact">
						<p>Cоздать новый контакт для связи</p>
						<input
							placeholder="Название контакта"
							onChange={handleChangeContact}
						/>
						<input
							placeholder="Сам контакт"
							onChange={handleChangeContactLink}
						/>
						<button onClick={newContact}>Создать контакт для связи </button>
					</div>
				</div>

				<h1>Созданные заказы</h1>
				<div className="userpage_orders">
					{items &&
						items.customer_orders &&
						items.customer_orders.map((item) => (
							<div className="userpage_order">
								{item.title} {item.is_done}
								<button onClick={() => deleteOrder(item.uuid)}>
									Удалить заказ
								</button>
							</div>
						))}
				</div>

				<button onClick={leaveUser}>Выйти из аккаунта</button>
			</main>
		</div>
	);
};

export default UserPage;

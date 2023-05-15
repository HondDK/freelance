import React, { useEffect } from "react";
import Header from "../components/UI/Header";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
const UserProfile = () => {
	const { user } = useParams();
	const items = useFetch(
		`http://165.232.118.51:8001/freelance/auth/users/${user}`
	);

	useEffect(() => {
		console.log(items);
	}, [items]);

	return (
		<div>
			<Header></Header>
			<main className="userpage">
				<h1>{items.customer_description}</h1>
				<p>{items.employee_description}</p>
				<div className="userpage_contact">
					<div className="userpage_active_contact">
						<h1>Контакты для связи с пользователем</h1>
						{items &&
							items.links_to_communicate &&
							items.links_to_communicate.map((item) => (
								<div>
									{item.name}
									{item.link}
								</div>
							))}
					</div>
				</div>
				<h1>Созданные пользователем заказы</h1>
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
			</main>
		</div>
	);
};

export default UserProfile;

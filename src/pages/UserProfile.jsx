import React, { useEffect } from "react";
import Header from "../components/UI/Header";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

const UserProfile = () => {
	const { user } = useParams();

	const items = useFetch(
		`http://165.232.69.211:8001/freelance/auth/users/${user}`
	);

	const data = useFetch(
		"http://165.232.69.211:8001/freelance/orders/order_responses/"
	);

	useEffect(() => {
		console.log(items);
		console.log(data);
	}, [items, data]);


	return (
		<div>
			<Header />
			<main className="userpage">
				{items && (
					<>
						<h1>{items.customer_description}</h1>
						<p>{items.employee_description}</p>
						<div className="userpage_contact">
							<div className="userpage_active_contact">
								<h1>Контакты для связи с пользователем</h1>
								{items.links_to_communicate &&
									items.links_to_communicate.map((item) => (
										<div key={item.name}>
											{item.name}
											{item.link}
										</div>
									))}
							</div>
						</div>
					</>
				)}
			</main>
		</div>
	);
};

export default UserProfile;

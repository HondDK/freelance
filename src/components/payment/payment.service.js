import axios from "axios";

const YooKassa = require("yookassa");

const yooKassa = new YooKassa({
	shopId: "<Идентификатор магазина>",
	secretKey: "test_*gql0X8xgb6-W1Prdbpyxjtndx6c6tsyFG9D1OzaHs2FI",
});

export default function pay() {
	const payment = yooKassa.createPayment({
		amount: {
			value: "2.00",
			currency: "RUB",
		},
		payment_method_data: {
			type: "bank_card",
		},
		confirmation: {
			type: "redirect",
			return_url: "https://www.merchant-website.com/return_url",
		},
		description: "Заказ №72",
	});

	axios
		.post(
			`http://165.232.118.51:8001/freelance/orders/orders/${uuid}/choose_employee/`,
			payment,
			{
				headers: {
					yooKassa,
				},
			}
		)
		.then((response) => {
			console.log(response);
			setIsSent(true);
		})
		.catch((error) => {
			console.error(error);
		});
}

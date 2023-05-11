import React from "react";

const OrderDetailPage = () => {
	return (
		<>
			<header>
				<h1>FREELANCE</h1>{" "}
				<div>
					<button>Регистрация</button> <button>Вход</button>{" "}
				</div>
			</header>
			<main className="order_detail_page">
				<article className="order_detail_page_detail">
					<div className="">
						<p>title</p>
						<span>10000tg</span>
					</div>
					<p></p>
					<button>Откликнуться</button>
				</article>
				<aside className="order_detail_page_contacts"></aside>
			</main>
		</>
	);
};

export default OrderDetailPage;

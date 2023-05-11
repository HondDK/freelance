import React from "react";

const OrdersPage = () => {
	return (
		<>
			<header>
				<h1>FREELANCE</h1>
				<div>
					<button>Регистрация</button> <button>Вход</button>
				</div>
			</header>
			<main className="orders_page">
				<article className="block_orders">
					<h1>Заказы(1212)</h1>
					<div className="block_order">
						<p className="head">Сверстать 1 страницу с двумя вкладками</p>
						<img className="block_order_img" src="" alt="" />
						<div className="tags">
							<div className="tag">js</div>
							<div className="tag">web</div>
							<div className="tag">css</div>
						</div>
						<span className="price">10000₸</span>
					</div>
					<div className="block_order">
						<p className="head">Сверстать 1 страницу с двумя вкладками</p>
						<img className="block_order_img" src="" alt="" />
						<div className="tags">
							<div className="tag">js</div>
							<div className="tag">web</div>
							<div className="tag">css</div>
						</div>
						<span className="price">10000₸</span>
					</div>
					<div className="block_order">
						<p className="head">Сверстать 1 страницу с двумя вкладками</p>
						<img className="block_order_img" src="" alt="" />
						<div className="tags">
							<div className="tag">js</div>
							<div className="tag">web</div>
							<div className="tag">css</div>
						</div>
						<span className="price">10000₸</span>
					</div>
				</article>
				<aside className="aside_orders_page">
					<input type="text" />
					<div className="aside_tags">
						<div className="aside_tag">Разработка</div>
						<div className="aside_tag">Тестирование</div>
						<div className="aside_tag">Дизайн</div>
						<div className="aside_tag">Контент</div>
						<div className="aside_tag">Верстка</div>
						<div className="aside_tag">Верстка</div>
					</div>
				</aside>
			</main>
		</>
	);
};

export default OrdersPage;

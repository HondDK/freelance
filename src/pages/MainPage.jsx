import React from "react";

import Header from "../components/UI/Header";
import MainButton from "../components/UI/MainButton";
const MainPage = () => {
	return (
		<>
			<Header />
			<main>
				<aside>
					<div>
						<p>
							Разработчики, дизайнеры и другие профессионалы ИТ-рынка готовы
							выполнить вашу задачу сейчас.
						</p>

						<MainButton>Найти специалиста</MainButton>
					</div>
					<div className="container">
						Помогаем работать эффективнее.
						<br /> Мы точно знаем, что фриланс — это больше, чем разовые заказы
						или поиск более низкой ставки. <br />
						Фриланс — это удобный, масштабируемый инструмент для компаний. А для
						специалистов — возможность
					</div>
				</aside>
				<article>
					<div className="container">
						<p>Разработка</p> <p>Сайты “Под ключ”, Бэкенд, Фронтенд и другое</p>{" "}
						<MainButton>Посмотреть</MainButton>
					</div>
					<div className="container">
						<p>Дизайн</p> <p>Сайты, лендинги, логотипы и другое</p>{" "}
						<button>Посмотреть</button>
					</div>
					<div className="container">
						<p>Тестирование</p>{" "}
						<p>Сайты, мобильная разработка, софт и другое</p>{" "}
						<MainButton>Посмотреть</MainButton>
					</div>
					<div className="container">
						<p>Маркетинг</p> <p>SMM, SEO, Контекстная реклама и другое</p>{" "}
						<MainButton>Посмотреть</MainButton>
					</div>
					<div className="container">
						<p>Контент</p>{" "}
						<p>Копирайтинг, рератинг, расшифровка аудио и видео и другое</p>{" "}
						<MainButton>Посмотреть</MainButton>
					</div>
					<div className="container">
						<p>Администрирование</p>{" "}
						<p>Серверы, компьютерные сети, базы данных и другое</p>{" "}
						<MainButton>Посмотреть</MainButton>
					</div>
				</article>
			</main>
			<footer></footer>
		</>
	);
};

export default MainPage;

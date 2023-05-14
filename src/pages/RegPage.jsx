import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/UI/Header";
const RegPage = () => {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const [err, setErr] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		const post = {
			username: login,
			password: password,
			customer_description: username,
			employee_description: "Описание пустое",
		};

		axios
			.post("http://165.232.118.51:8001/freelance/auth/register/", post)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
				setErr(true);
			});
	}

	function handleChangeLogin(e) {
		setLogin(e.target.value);
	}
	function handleChangePass(e) {
		setPassword(e.target.value);
	}
	function handleChangeName(e) {
		setUsername(e.target.value);
	}

	return (
		<>
			<Header />
			<main className="main_form">
				<form onSubmit={handleSubmit}>
					<label>Регистрация</label>
					<input
						type="text"
						name="name"
						placeholder="Логин"
						value={login}
						onChange={handleChangeLogin}
					></input>
					<input
						type="text"
						name="name"
						placeholder="Имя пользователя"
						value={username}
						onChange={handleChangeName}
					></input>
					<input
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={handleChangePass}
					></input>
					{err ? (
						<span style={{ color: "red" }}>
							Нужно больше 8 символов в пароле
						</span>
					) : (
						<span></span>
					)}

					<button>Зарегистроваться</button>
				</form>
			</main>
		</>
	);
};

export default RegPage;

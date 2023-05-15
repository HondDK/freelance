import React, { useState } from "react";
import axios from "axios";
import Header from "../components/UI/Header";
import { useNavigate } from "react-router-dom";
const RegPage = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [err, setErr] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		if (
			login.trim() === "" ||
			password.trim() === "" ||
			username.trim() === ""
		) {
			setErr(true);
			return;
		}
		if (password.length < 8) {
			setErr(true);
			return;
		}
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
				navigate("/login");
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
					/>
					<input
						type="text"
						name="name"
						placeholder="Имя пользователя"
						value={username}
						onChange={handleChangeName}
					/>
					<input
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={handleChangePass}
					/>
					{err && (
						<span style={{ color: "red" }}>
							{password.length < 8
								? "Пароль должен содержать минимум 8 символов."
								: "Пожалуйста, заполните все поля."}
						</span>
					)}
					<button>Зарегистрироваться</button>
				</form>
			</main>
		</>
	);
};

export default RegPage;

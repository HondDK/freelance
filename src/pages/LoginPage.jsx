import React, { useState } from "react";
import Header from "../components/UI/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		if (username.trim() === "" || password.trim() === "") {
			setErr("Пожалуйста, заполните все поля.");
			return;
		}
		if (password.length < 8) {
			setErr("Пароль должен содержать минимум 8 символов.");
			return;
		}
		axios
			.post("http://165.232.69.211:8001/freelance/token/", {
				username: username,
				password: password,
			})
			.then((response) => {
				localStorage.setItem("access_token", response.data.access);
				localStorage.setItem("refresh_token", response.data.refresh);
				navigate("/orders");
			})
			.catch((error) => {
				console.error(error);
				setErr(error.response.data.detail);
			});
		console.log(
			localStorage.getItem("access_token"),
			localStorage.getItem("refresh_token")
		);
	};

	function handleChangeUser(e) {
		setUsername(e.target.value);
	}

	function handleChangePass(e) {
		setPassword(e.target.value);
	}

	return (
		<>
			<Header />
			<main className="main_form">
				<form onSubmit={handleLogin}>
					<label>Вход в аккаунт</label>
					<input
						type="text"
						name="name"
						placeholder="Логин"
						value={username}
						onChange={handleChangeUser}
					/>
					<input
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={handleChangePass}
					/>

					{err && <span style={{ color: "red" }}>{err}</span>}
					<button>Войти</button>
				</form>
			</main>
		</>
	);
};

export default LoginPage;

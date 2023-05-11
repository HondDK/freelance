import React, { useEffect, useState } from "react";
import axios from "axios";
const RegPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState(false);
	function handleSubmit(e) {
		e.preventDefault();
		const post = {
			username: username,
			password: password,
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

	function handleChangeUser(e) {
		setUsername(e.target.value);
	}
	function handleChangePass(e) {
		setPassword(e.target.value);
	}

	return (
		<>
			<header>
				<h1>FREELANCE</h1>
				<div>
					<button>Вход</button>
				</div>
			</header>
			<main className="main_form">
				<form onSubmit={handleSubmit}>
					<label>Регистрация</label>
					<input
						type="text"
						name="name"
						placeholder="Логин"
						value={username}
						onChange={handleChangeUser}
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

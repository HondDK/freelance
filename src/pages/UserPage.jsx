import React from "react";
import Header from "../components/UI/Header";

const UserPage = () => {
	function leaveUser() {
		localStorage.clear();
	}

	return (
		<div>
			<Header></Header>
			<main>
				<button onClick={leaveUser}>Выйти из аккаунта</button>
			</main>
		</div>
	);
};

export default UserPage;

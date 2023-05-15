import React from "react";

export default function TimeComponent({ props }) {
	const timeString = props;
	const dateTime = new Date(timeString);

	const year = dateTime.getFullYear();
	const month = dateTime.getMonth() + 1;
	const day = dateTime.getDate();
	const hours = dateTime.getHours();
	const minutes = dateTime.getMinutes();
	const seconds = dateTime.getSeconds();

	return (
		<div>
			<p>Дата создания: {`${day}-${month}-${year}`}</p>
			<p>Время: {`${hours}:${minutes}:${seconds}`}</p>
		</div>
	);
}

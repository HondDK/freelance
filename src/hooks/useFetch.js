import { useState, useEffect } from "react";
import axios from "axios";

function useFetchData(url) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(url);
				setData(result.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [url]);

	return data;
}

export default useFetchData;

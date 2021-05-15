import axios from "axios";

export function retrieveRoomsName() {
	return axios.get("http://localhost:8000/api/rooms");
}

export function retrieveRoomsPrice({ rooms, dates }) {
	return axios.get("http://localhost:8000/api/custom", {
		params: {
			rooms, dates
		}
	});
}

export function saveRoomsCustomPrice({id, dates, price}) {
	return axios.post("http://localhost:8000/api/custom", {
		rooms_id: id,
		dates, price
	})
}
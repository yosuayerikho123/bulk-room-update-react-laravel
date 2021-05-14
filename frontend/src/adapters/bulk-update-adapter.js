import axios from "axios";

export function retrieve() {
	return axios.get("http://localhost:8000/api/retrieve");
}
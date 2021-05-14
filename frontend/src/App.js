import { useState, Fragment } from "react";
import BulkUpdate from "./components/MainComponent/BulkUpdate";
import { Context as ModalContext } from "./context/modal/context";

function App() {
	const [form, setForm] = useState(0);

	return (
		<Fragment>
			<ModalContext.Provider value={{ form, setForm }}>
				<BulkUpdate/>
			</ModalContext.Provider>
		</Fragment>
	);
}

export default App;
export function reducer(state, action) {
	console.log(action);
	switch (action.type) {
		case 'open':
			return { open: true };
		case 'close':
			return { open: false };
		default:
			break;
	}

	return {};
};
export async function getCurrencies(fetch, delegate, params?) {
	let result = new Set()
	const json = await delegate(fetch, params);
	if (json) {
		json.forEach(element => {
			result.add({ symbol: element.from.currency.symbol, name: element.from.currency.name });
		});
	}
	return result;
}

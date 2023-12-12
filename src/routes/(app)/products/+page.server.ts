export const load = async (serverLoadEvent: any) => {
	const { fetch } = serverLoadEvent;
	const response = await fetch('https://dummyjson.com/products');
	return await response.json();
};

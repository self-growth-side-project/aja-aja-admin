export const load = async (loadEvent: any) => {
	console.log('Universal Load() 실행');
	const { fetch } = loadEvent;
	const products = await fetch('https://dummyjson.com/products');
	return await products.json();
};

import { error, redirect } from '@sveltejs/kit';

export const load = async (serverLoadEvent: any) => {
	const { fetch, params, url, route } = serverLoadEvent;

	//console.log({ params, url, route: route.id });

	const { productId } = params;

	if (productId > 10000) {
		//throw error(404, 'Product not found');
		throw redirect(307, '/products');
	}

	const response = await fetch(`https://dummyjson.com/products/${productId}`);
	const product = await response.json();
	return { product };
};

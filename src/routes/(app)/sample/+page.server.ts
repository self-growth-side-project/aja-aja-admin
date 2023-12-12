export async function load({ fetch }: { fetch: (url: string) => Promise<Response> }) {
	const response = await fetch('https://dummyjson.com/products/1');
	return await response.json();
}

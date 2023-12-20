<script>
	export let data;
	const products = data.products;
</script>

<h1>제품 리스트 페이지</h1>

{#each products as product}
	<div>
		<h2><a href={`/products/${product.id}`}><li>{product.title}</li></a></h2>
		<p>{product.description}</p>
		<hr/>
	</div>
{/each}

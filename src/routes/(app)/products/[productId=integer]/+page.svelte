<script>
	export let data;

    const product = data.product;
</script>

<div>
    <h2>{product.title}</h2>
    <h3>가격 : {product.price}원</h3>
    <h3>설명 : {product.description}</h3>
</div>

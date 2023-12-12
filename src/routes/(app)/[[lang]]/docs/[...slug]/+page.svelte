<script>
	import { page } from '$app/stores';

	const slugList = $page.params.slug.split('/');
	console.log(slugList);

	const {lang = 'ko'} = $page.params;
</script>

{#if lang === 'ko'}
	<h1>안녕하세요</h1>
{:else if lang === 'en'}
	<h1>Hello</h1>
{/if}

<hr/>

{#if slugList.length === 1}
	<h1>Docs 페이지, 주제 {slugList[0]}</h1>
{:else if slugList.length === 2}
	<h1>Docs 페이지, 주제 {slugList[0]}, 소주제 {slugList[1]}</h1>
{/if}
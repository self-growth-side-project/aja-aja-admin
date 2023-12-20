<script lang="ts">
	import Member, {MemberRole} from "$lib/model/member.js";
	import {goto} from "$app/navigation";

	export let data;

	$: members = data.data.items.map(
			(data: Member) =>
					new Member(data.id, data.email, data.createdAt as string, new MemberRole(data.role.code, data.role.name))
	);

	$: currentPage = data.data.page;
	$: totalPages = data.data.totalPages;
	$: totalElements = data.data.totalElements;

	function changePage(newPage: any) {
		goto(`/members?page=${newPage}&size=10&sort=id:ASC`);
	}
</script>

<h4 class="py-3 mb-4">가입한 회원</h4>
<h4 class="py-3 mb-4">가입한 회원 (총 {totalElements}명)</h4>

<div class="card">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<thead>
			<tr>
				<th>아이디</th>
				<th>이메일</th>
				<th>권한</th>
				<th>가입 일시</th>
			</tr>
			</thead>
			<tbody class="table-border-bottom-0">
			{#each members as member}
				<tr>
					<td>
						{member.id}
					</td>
					<td>{member.email}</td>
					<td>
						<span class="badge bg-label-success me-1">{member.role.name}</span>
					</td>
					<td>{member.createdAt}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>

	<div>

		{#each Array.from({ length: totalPages }, (_, i) => i + 1) as pageNum}
			<button class:current-page = {pageNum === currentPage} on:click={() => changePage(pageNum)}>
				{pageNum}
			</button>
		{/each}
	</div>

</div>

<style>
	.current-page {
		font-weight: bold;
		text-decoration: underline;
	}
</style>
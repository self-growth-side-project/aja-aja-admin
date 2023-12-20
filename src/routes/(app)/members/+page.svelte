<script lang="ts">
	import Member, {MemberRole} from "$lib/model/member.js";
	import {goto} from "$app/navigation";

	export let data;

	$: members = data.data.items.map(
			(data: Member) =>
					new Member(data.id, data.email, data.createdAt as string, new MemberRole(data.role.code, data.role.name))
	);

	$: currentPage = data.data.page;
	$: currentSize = data.data.size;
	$: totalPages = data.data.totalPages;
	$: totalElements = data.data.totalElements;

	$: currentPageGroup = Math.ceil(currentPage / 5);
	$: startPage = (currentPageGroup - 1) * 5 + 1;
	$: endPage = Math.min(startPage + 4, totalPages);

	$: pageNumbers = Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);

	function changePage(newPage: any) {
		goto(`/members?page=${newPage}&size=${currentSize}&sort=id:DESC`);
	}
</script>

<h4 class="py-3 mb-4">가입한 회원 (총 {totalElements}명)</h4>

<div class="card">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<thead>
			<tr>
				<th>고유 식별 아이디</th>
				<th>이메일</th>
				<th>권한</th>
				<th>가입 일시</th>
			</tr>
			</thead>
			<tbody>
			{#each members as member}
				<tr>
					<td>
						{member.id}
					</td>
					<td>{member.email}</td>
					<td>
						<span class="badge bg-label-success me-1">{member.role.name}</span>
					</td>
					<td>{`${member.createdAt} +09:00`}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>
	<div class="demo-inline-spacing d-flex justify-content-center">
		<nav aria-label="Page navigation">
			<ul class="pagination">
				<li class="page-item first">
					<a class="page-link" href="#" on:click={() => changePage(1)}>
						<i class="tf-icon bx bx-chevrons-left"></i>
					</a>
				</li>
				<li class="page-item prev">
					<a class="page-link" href="#" on:click={() => changePage(Math.max(currentPage - 1, 1))}>
						<i class="tf-icon bx bx-chevron-left"></i>
					</a>
				</li>
				{#each pageNumbers as pageNum}
					<li class="page-item {pageNum === currentPage ? 'active' : ''}">
						<a class="page-link" href="#" on:click={() => changePage(pageNum)}>{pageNum}</a>
					</li>
				{/each}
				<li class="page-item next">
					<a class="page-link" href="#" on:click={() => changePage(Math.min(currentPage + 1, totalPages))}>
						<i class="tf-icon bx bx-chevron-right"></i>
					</a>
				</li>
				<li class="page-item last">
					<a class="page-link" href="#" on:click={() => changePage(totalPages)}>
						<i class="tf-icon bx bx-chevrons-right"></i>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</div>

<style>
	.pagination .page-link {
		width: 35px;
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
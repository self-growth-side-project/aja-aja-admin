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
				<th>회원 고유 아이디</th>
				<th>이메일</th>
				<th>권한</th>
				<th>가입 일시</th>
				<th>Actions</th>
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
					<td>
						<div class="dropdown">
							<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
								<i class="bx bx-dots-vertical-rounded"></i>
							</button>
							<div class="dropdown-menu">
								<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exLargeModal"><i class="bx bx-edit-alt me-1"></i>나만의 생각 현황</a>
							</div>
						</div>
					</td>
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

<div class="modal fade" id="exLargeModal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel4">나만의 생각 현황</h5>
				<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md mb-4 mb-md-2">
						<div class="accordion mt-3" id="accordionExample">
							<div class="margin-bottom">
							<small class="text-primary fw-medium">작성일 : 2023-12-21 15:09:25 +09:00</small>
							<div class="card accordion-item">
								<h2 class="accordion-header">
									<button
											type="button"
											class="accordion-button"
											data-bs-toggle="collapse"
											data-bs-target="#one"
											aria-expanded="false"
											aria-controls="one">
										나는 언제 가장 살아있다고 느끼나요?
									</button>
								</h2>

								<div
										id="one"
										class="accordion-collapse collapse"
										data-bs-parent="#accordionExample">
									<div class="accordion-body">
										우리는 실제로 살아있지만,
										항상 존재하고 있다는 느낌은 갖기란 참 어려워요.
										간혹 명확하게 내가 ‘살아있다’는 느낌을 받을대가 있는데요.
										맛있는 음식을 먹을 때, 내가 원하는 무언가를 성취한 순간일
										수도 있을 거예요.
										주체적인 삶을 살아야 한다고 믿었던 실존주의 철학자
										사르트르는 노벨 문학상을 거부한 것으로도 유명한데요.
										인간이 자신의 모습을 있는 그대로 대면하고, 주체적인
										결정으로 인생이 정해진다고 믿어요.
										살아있다는 것은 무엇일까요? 이 질문에 답할 수 있다면
										어떻게 살아야 할지 방향을 잡는 데에 도움이 될 거예요.
									</div>
								</div>
							</div>
							</div>
							<div class="margin-bottom">
							<small class="text-primary fw-medium">작성일 : 2023-12-21 15:09:25 +09:00</small>
							<div class="card accordion-item">
								<h2 class="accordion-header">
									<button
											type="button"
											class="accordion-button collapsed"
											data-bs-toggle="collapse"
											data-bs-target="#two"
											aria-expanded="false"
											aria-controls="two">
										질문 2
									</button>
								</h2>
								<div
										id="two"
										class="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
									<div class="accordion-body">
										답변 2
									</div>
								</div>
							</div>
						</div>
							<div class="margin-bottom">
							<div class="card accordion-item">
								<h2 class="accordion-header">
									<button
											type="button"
											class="accordion-button collapsed"
											data-bs-toggle="collapse"
											data-bs-target="#three"
											aria-expanded="false"
											aria-controls="three">
										질문 3
									</button>
								</h2>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
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

	.margin-bottom {
		margin-bottom: 20px;
	}
</style>
<script lang="ts">
	import Member, {MemberRole} from "$lib/model/member.js";

	export let data;

	const members = data.data.map(
			(data: Member) =>
					new Member(data.id, data.email, data.createdAt as string, new MemberRole(data.role.code, data.role.name))
	);
</script>

<h4 class="py-3 mb-4">가입한 회원</h4>

<!-- Basic Bootstrap Table -->
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
</div>
import Member, { MemberRole } from '../../../lib/model/member';

export const load = async ({ cookies }: { cookies: any }) => {
	const accessToken = cookies.get('accessToken');

	if (accessToken) {
		const response = await fetch('http://15.165.249.34:8602/v1/admin/members', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (response.status !== 200) {
			throw response;
		}

		const responseData = await response.json();
		const members = responseData.data.map(
			(data: Member) =>
				new Member(data.id, data.email, new MemberRole(data.role.code, data.role.name))
		);

		console.log(members);

		return null;
	}
};

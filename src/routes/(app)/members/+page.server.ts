import Member, { MemberRole } from '../../../lib/model/member';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }: { cookies: any }) => {
	let accessToken = cookies.get('accessToken');

	if (!accessToken) {
		accessToken = await renewAccessToken(cookies);
	}

	let response = await fetch('http://15.165.249.34:8602/v1/admin/members', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (response.status === 401) {
		accessToken = await renewAccessToken(cookies);
		response = await fetch('http://15.165.249.34:8602/v1/admin/members', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
	}

	return await response.json();
};

async function renewAccessToken(cookies: any) {
	const refreshToken = cookies.get('refreshToken');

	const response = await fetch('http://15.165.249.34:8602/v1/auths/refresh', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ refreshToken })
	});

	if (response.status === 200) {
		const data = await response.json();

		cookies.set('accessToken', data.data.accessToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false,
			maxAge: 60 * 60 * 24 * 30
		});

		cookies.set('refreshToken', data.data.refreshToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false,
			maxAge: 60 * 60 * 24 * 30
		});

		return data.data.accessToken;
	}

	throw redirect(302, '/login');
}

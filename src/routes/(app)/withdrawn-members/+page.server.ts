import { redirect } from '@sveltejs/kit';
import { baseUrl } from '$lib/constant';

export const load = async ({ cookies, url }: { cookies: any; url: any }) => {
	let accessToken = cookies.get('accessToken');

	if (!accessToken) {
		accessToken = await renewAccessToken(cookies);
	}

	const page = url.searchParams.get('page') || '1';
	const size = url.searchParams.get('size') || '10';
	const sort = url.searchParams.get('sort') || 'id:DESC';

	let response = await fetch(
		`${baseUrl}/v1/admin/withdrawn-members?page=${page}&size=${size}&sort=${sort}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	);

	if (response.status === 401) {
		accessToken = await renewAccessToken(cookies);
		response = await fetch(
			`${baseUrl}/v1/admin/withdrawn-members?page=${page}&size=${size}&sort=${sort}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);
	}

	return await response.json();
};

async function renewAccessToken(cookies: any) {
	const refreshToken = cookies.get('refreshToken');

	const response = await fetch(`${baseUrl}/v1/auths/refresh`, {
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

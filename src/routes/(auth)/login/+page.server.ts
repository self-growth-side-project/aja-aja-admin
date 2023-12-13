import type { Action, Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes/(app)/$types';
import { fail, redirect } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export const load: PageServerLoad = async ({ locals }) => {
	// 나중에 작성필요
};

const login: Action = async ({ cookies, request }) => {
	const formData = await request.formData();

	const email = formData.get('email');
	const password = formData.get('password');

	const response = await fetch('http://15.165.249.34:8602/v1/sign-in', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!response.ok) {
		return fail(400, { invalid: true });
	}

	const data = await response.json();

	const accessToken = data.data.accessToken;
	const refreshToken = data.data.refreshToken;

	if (!checkRole(accessToken)) {
		return fail(400, { invalid: true });
	}

	cookies.set('accessToken', accessToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		maxAge: 60 * 60 * 24 * 30
	});

	cookies.set('refreshToken', refreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/products');
};

function checkRole(token: string): boolean {
	const decodedToken = jwtDecode<JwtPayload>(token);
	return decodedToken.role === 'ADMIN';
}

interface JwtPayload {
	role: string;
}

export const actions: Actions = { login };

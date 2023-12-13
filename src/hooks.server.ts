import type { Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('accessToken');

	if (!accessToken) {
		return resolve(event);
	}

	const member = jwtDecode<JwtPayload>(accessToken);

	if (!member) {
		return resolve(event);
	}

	event.locals.member = {
		role: member.role
	};

	return await resolve(event);
};

export interface JwtPayload {
	role: string;
}

import type { Request, Response } from '@sveltejs/kit';
import { REST_URL } from '$lib/config';

export async function post(req: Request): Promise<Response> {
	const token = req.body.token;
	const url = `${REST_URL}/members/me`;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Authorization': `Basic ${token}`,
		}
	});
	if (res.ok) {
		const user = await res.json();
		return {
			body: user,
			headers: { 'set-cookie': `token=${token};path=/;HttpOnly;expires=Fri, 31 Dec 9999 23:59:59 GMT` },
			status: 200,
		};
	} else {
		return {
			headers: {},
			status: 401,
		};
	}
}

export async function del(req: Request): Promise<Response> {
	return {
		headers: { 'set-cookie': `token=;path=/;HttpOnly;expires=Thu, 01 Jan 1970 00:00:00 GMT` },
		status: 200,
	};
}

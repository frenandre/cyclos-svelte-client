import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';
import { REST_URL, PUBLIC_PAGES } from '$lib/config';

export const handle: Handle = async ({ request, resolve }) => {
    const cookies = cookie.parse(request.headers.cookie || '');

    if (!request.locals.authenticated && cookies.token) {
        const url = `${REST_URL}/members/me`;
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${cookies.token}`,
            }
        });
        if (res.ok) {
            const user = await res.json();
            request.locals.token = cookies.token;
            request.locals.authenticated = true;
            request.locals.user = user;
        }
    } else if (!PUBLIC_PAGES.includes(request.path)) {
        request.locals.referer = request.path
        request.path = '/login'
    }

    return await resolve(request);
}

export const getSession: GetSession = (request) => {
    let params = {
        authenticated: request.locals.authenticated,
        username: request.locals.user?.username,
        name: request.locals.user?.name,
    }
    if (request.locals.referer) {
        params = {
            ...params,
            referer: request.locals.referer,
        }
    }
    return params;
}

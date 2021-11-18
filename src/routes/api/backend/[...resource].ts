import type { Request, Response } from '@sveltejs/kit';
import { REST_URL } from '$lib/config';

export async function get(req: Request): Promise<Response> {
    const query = req.query.toString();
    const url = `${REST_URL}/${req.params.resource}` + (query ? '?' + query : '');
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${req.locals.token}`,
        },
    });
    return {
        status: res.ok ? 200 : 500,
        body: res.ok ? await res.json() : '',
        headers: {},
    };
}

export async function post(req: Request): Promise<Response> {
    const url = `${REST_URL}/${req.params.resource}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${req.locals.token}`,
        },
        body: JSON.stringify(req.body),
    });
    return {
        status: res.ok ? 200 : 500,
        body: res.ok ? await res.json() : '',
        headers: {},
    };
}

export async function put(req: Request): Promise<Response> {
    const url = `${REST_URL}/${req.params.resource}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${req.locals.token}`,
        },
        body: JSON.stringify(req.body),
    });
    return {
        status: res.ok ? 200 : 500,
        body: '',
        headers: {},
    };
}

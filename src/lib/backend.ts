const BACKEND_URL = '/api/backend';

export const getGeneral = async (fetch) => get('/general', fetch);

export const getMe = async (fetch) => get('/members/me', fetch);

export const getAdCategories = (fetch) => get('/adCategories', fetch);

export const getAds = (fetch, params) => get('/ads', fetch, params);

export const getAd = (fetch, id: string) => get('/ads/' + id, fetch);

export const getMembers = (fetch, params) => get('/members', fetch, params);

export const getMember = (fetch, id: string) => id ? get('/members/' + id, fetch) : null;

export const getTransferTypes = (fetch, params) => get('/transferTypes', fetch, params);

export const postMe = (fetch, body) => post('/members/me', fetch, body, false);

export const postMemberPayment = (fetch, body: Object) => post('/payments/memberPayment', fetch, body, true);

export const postConfirmMemberPayment = (fetch, body: Object) => post('/payments/confirmMemberPayment', fetch, body, true);

async function get(resource: string, fetch: Function, params?: Record<string, string>): Promise<any> {
	const url = BACKEND_URL + resource + (params ? '?' + new URLSearchParams(params) : '');
	const res = await fetch(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
	return res.ok ? await res.json() : null;
}

async function post(resource: string, fetch: Function, body: Object, hasResponse?: boolean): Promise<any> {
	const url = BACKEND_URL + resource;
	const res = await fetch(url, {
		body: JSON.stringify(body),
		method: hasResponse ? 'POST' : 'PUT',
		headers: { 'Content-Type': 'application/json' }
	});
	return !hasResponse ? res.ok : res.ok ? await res.json() : null;
}

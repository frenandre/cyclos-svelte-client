export async function login(token: string) {
	const res = await fetch('/api/login', {
		method: 'POST',
		body: JSON.stringify({ token }),
		headers: { 'Content-Type': 'application/json' }
	});
	return res.ok ? await res.json() : null;
}

export async function logout() {
	const res = await fetch('/api/login', {
		method: 'DELETE'
	});
	return res.ok ? await res.json() : null;
}

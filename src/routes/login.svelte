<script lang="ts">
	import { Button, TextInput, PasswordInput, ToastNotification } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { login } from '$lib/auth';

	let username, password, notifyError;

	async function loginUser() {
		const token = btoa(username + ':' + password);
		const user = await login(token);
		if (user) {
			const referer = $session.referer;
			$session.token = token;
			$session.username = user.username;
			$session.authenticated = true;
			$session.referer = undefined;
			await goto(referer ? referer : '/');
		} else {
			notifyError = true;
		}
	}
</script>

<div>
	<TextInput labelText="User name" bind:value={username} />
	<br />
	<PasswordInput required type="password" labelText="Password" bind:value={password} />
	<br />
	<Button size="small" type="submit" on:click={loginUser}>Login</Button>
	<br />
</div>

{#if notifyError}
	<ToastNotification kind="error" lowContrast title="Login fehlerhaft" timeout={2500} on:close={() => (notifyError = false)} />
{/if}

<style>
	div {
		line-height: 1.5rem;
	}
</style>

<script context="module" lang="ts">
	import { getMe } from '$lib/backend';
	export async function load({ fetch }) {
		return {
			props: {
				member: await getMe(fetch)
			}
		};
	}
</script>

<script lang="ts">
	import { Button, TextInput, DatePicker, DatePickerInput, ToastNotification } from 'carbon-components-svelte';
	import { postMe } from '$lib/backend';

	export let member;

	let success, notify;

	let username = member.username;
	let name = member.name;
	let email = member.email;
	let birthday;
	for (let custom of member.customValues) {
		if (custom.internalName == 'birthday') birthday = custom.value;
	}

	async function submit() {
		let body = { username, name, email };
		let customValues = [];
		if (birthday) {
			customValues[customValues.length] = { internalName: 'birthday', value: birthday };
		}
		if (customValues) {
			body = { ...body, customValues };
		}
		success = await postMe(fetch, body);
		notify = true;
	}
</script>

<div>
	<TextInput type="text" bind:value={name} labelText="Name" />
	<br />
	<TextInput type="text" bind:value={email} labelText="Email" />
	<br />
	<DatePicker datePickerType="single" dateFormat="d/m/Y" bind:value={birthday}>
		<DatePickerInput placeholder="tt/mm/jjjj" labelText="Geburtsdatum" />
	</DatePicker>
	<br />
	<Button on:click={submit}>Speichern</Button>
	<br />
	{#if notify}
		{#if success}
			<ToastNotification kind="success" lowContrast title="Dein Profil wurde aktualisiert." timeout={2500} on:close={() => (notify = false)} />
		{:else}
			<ToastNotification kind="error" lowContrast title="Dein Profil konnte nicht aktualisiert werden." timeout={2500} on:close={() => (notify = false)} />
		{/if}
	{/if}
</div>

<style>
	div {
		line-height: 1.5rem;
	}
</style>

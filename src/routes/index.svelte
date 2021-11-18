<script context="module" lang="ts">
	import { getGeneral } from '$lib/backend';
	export async function load({ fetch }) {
		return {
			props: {
				general: await getGeneral(fetch)
			}
		};
	}
</script>

<script lang="ts">
	import { Tile } from 'carbon-components-svelte';
	import { session } from '$app/stores';
	export let general;
</script>

<Tile>
	{#if $session.authenticated}
		<p>Willkommen {$session.name}!</p>
	{:else}
		<p>Bitte anmelden!</p>
	{/if}
</Tile>

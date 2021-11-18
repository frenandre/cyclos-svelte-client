<script context="module" lang="ts">
	import { getMember } from '$lib/backend';
	export async function load({ page, fetch }) {
		return {
			props: {
				item: await getMember(fetch, page.params.id)
			}
		};
	}
</script>

<script lang="ts">
	import { Tile, Button, ButtonSet } from 'carbon-components-svelte';
	import MoneyIcon from 'carbon-icons-svelte/lib/Money16';
	import IconUndo from 'carbon-icons-svelte/lib/Undo16';
	export let item;
</script>

<Tile>Mitglied {item.id}</Tile>

<div>
	Benutzer: {item.username}<br />
	Name: {item.name}<br />
	Email: {item.email}<br />
	{#if item.customValues}
		{#each item.customValues as customValue}
			{customValue.displayName}: {customValue.value} <br />
		{/each}
	{/if}
	<br />
</div>

<ButtonSet>
	<Button on:click={() => window.history.back()} icon={IconUndo}>Zurück</Button>
	<Button kind="secondary" icon={MoneyIcon} href="/pay?member={item.id}">Zahlung</Button>
</ButtonSet>

<style>
	div {
		line-height: 2rem;
	}
</style>

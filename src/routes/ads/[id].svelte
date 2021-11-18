<script context="module" lang="ts">
	import { getAd } from '$lib/backend';
	export async function load({ page, fetch }) {
		return {
			props: {
				item: await getAd(fetch, page.params.id)
			}
		};
	}
</script>

<script lang="ts">
	import { Tile, Button, ButtonSet } from 'carbon-components-svelte';
	import IconMoney from 'carbon-icons-svelte/lib/Money16';
	import IconUndo from 'carbon-icons-svelte/lib/Undo16';
	export let item;
</script>

<Tile>Inserat {item.id}</Tile>

<div>
	Titel: {item.title}<br />
	Beschreibung: {@html item.description}<br />
	Kategorie: {item.category.name}<br />
	Verkäufer: {item.owner.name}<br />
	Preis: {item.price}<br />
	<br />
</div>

<ButtonSet>
	<Button on:click={() => window.history.back()} icon={IconUndo}>Zurück</Button>
	<Button kind="secondary" icon={IconMoney} href="/pay?member={item.owner.id}&amount={item.price}">Kaufen</Button>
</ButtonSet>

<style>
	div {
		line-height: 2rem;
	}
</style>

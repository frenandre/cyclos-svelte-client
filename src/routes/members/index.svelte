<script lang="ts">
	import { Tile, Search, DataTable } from 'carbon-components-svelte';
	import InfiniteLoading from 'svelte-infinite-loading';
	import { getMembers } from '$lib/backend';
	import { RowLoader } from '$lib/RowLoader';
	import { goto } from '$app/navigation';

	let name = '';
	let rows = [];

	const headers = [
		{ key: 'username', value: 'Benutzer' },
		{ key: 'name', value: 'Name' }
	];
	const loader = new RowLoader(fetch, getMembers, rows);

	async function reload() {
		rows = await loader.get({ keywords: name }, true);
	}

	async function infinite({ detail: { loaded, complete } }) {
		if (loader.completed) {
			complete();
		} else {
			rows = await loader.get({ keywords: name });
			loaded();
		}
	}

	function select(row) {
		goto(`/members/${row.detail.id}`);
	}
</script>

<Tile>Mitglieder</Tile>
<br />

<Search placeholder="Suche" type="text" bind:value={name} on:change={reload} />
<br />

<DataTable on:click:row={select} size="tall" {headers} {rows} />

<InfiniteLoading on:infinite={infinite}>
	<div slot="noMore" />
</InfiniteLoading>

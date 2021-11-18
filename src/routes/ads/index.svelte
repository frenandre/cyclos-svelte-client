<script lang="ts">
	import { Tile, DataTable } from 'carbon-components-svelte';
	import InfiniteLoading from 'svelte-infinite-loading';
	import { getAds } from '$lib/backend';
	import { RowLoader } from '$lib/RowLoader';
	import { goto } from '$app/navigation';

	let rows = [];

	const headers = [
		{ key: 'id', value: 'Id' },
		{ key: 'title', value: 'Titel' }
	];
	const loader = new RowLoader(fetch, getAds, rows);

	async function infinite({ detail: { loaded, complete } }) {
		if (loader.completed) {
			complete();
		} else {
			rows = await loader.get();
			loaded();
		}
	}

	function select(row) {
		goto(`/ads/${row.detail.id}`);
	}
</script>

<Tile>Inserate</Tile>
<br />

<DataTable on:click:row={select} size="tall" {headers} {rows} />

<InfiniteLoading on:infinite={infinite}>
	<div slot="noMore" />
</InfiniteLoading>

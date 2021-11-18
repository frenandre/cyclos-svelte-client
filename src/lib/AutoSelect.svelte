<script lang="ts">
	import Svelecte from 'svelecte';
	import { createEventDispatcher } from 'svelte';
	export let labelText;
	export let value;
	export let items;
	export let valueField = 'id';
	export let labelField = 'name';
	export let placeholder = '';
	export let styleClass = 'svelecte-custom';

	const dispatch = createEventDispatcher();

	const change = (value) => dispatch('select', value.detail);
</script>

<label class="bx--label" for="">{labelText}</label>
<Svelecte
	fetch={items}
	bind:value
	{valueField}
	{labelField}
	{placeholder}
	class="svelecte-control {styleClass}"
	valueAsObject
	clearable
	disableSifter
	disableHighlight
	on:change={change}
/>

<style>
	:global(.svelecte-custom > .sv-control) {
		--sv-color: rgb(22, 22, 22);
		--sv-icon-color: rgb(126, 126, 126);
		min-height: 40px;
		background-color: #fff;
		padding-left: 10px;
		border: none;
		border-radius: 0;
		border-bottom: 1px solid rgb(141, 141, 141);
	}
	:global(.svelecte-custom > .sv-control.is-active) {
		outline: 2px solid #0f62fe;
		outline-offset: -2px;
		border: 0;
		border-bottom: 1px solid transparent;
	}
</style>

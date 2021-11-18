<script lang="ts">
	import { Modal, Grid, Row, Column } from 'carbon-components-svelte';

	export let payment;
	export let open;
	export let delegate;

	function onClose() {
		open = false;
	}

	function onSubmit() {
		delegate();
		onClose();
	}
</script>

<Modal
	bind:open
	preventCloseOnClickOutside
	modalHeading="Zahlung übermitteln"
	primaryButtonText="Bestätigen"
	secondaryButtonText="Abbrechen"
	on:click:button--secondary={onClose}
	on:submit={onSubmit}
>
	<Grid padding>
		<Row>
			<Column>An:</Column>
			<Column>{payment?.to.name}<br />({payment?.to.username})</Column>
		</Row>
		<Row>
			<Column>Von:</Column>
			<Column>{payment?.from.name}<br />({payment?.from.username})</Column>
		</Row>
		<Row>
			<Column>Beschreibung:</Column>
			<Column>{payment?.transferType.name}</Column>
		</Row>
		<Row>
			<Column>Betrag:</Column>
			<Column>{payment?.formattedFinalAmount}</Column>
		</Row>
	</Grid>
</Modal>

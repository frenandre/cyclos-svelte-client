<script context="module" lang="ts">
	import { getMember, getTransferTypes } from '$lib/backend';
	import { getCurrencies } from '$lib/DataLoader';
	export async function load({ page, fetch }) {
		const amount = page.query.get('amount');
		const memberId = page.query.get('member');
		const member = await getMember(fetch, memberId);
		const currencies = await getCurrencies(fetch, getTransferTypes);
		return {
			props: {
				member,
				amount,
				currencies
			}
		};
	}
</script>

<script lang="ts">
	import { TextInput, NumberInput, Button, ButtonSet, Select, SelectItem, ToastNotification } from 'carbon-components-svelte';
	import AutoSelect from '$lib/AutoSelect.svelte';
	import IconMoney from 'carbon-icons-svelte/lib/Money16';
	import IconUndo from 'carbon-icons-svelte/lib/Undo16';
	import { getMembers, postMemberPayment, postConfirmMemberPayment } from '$lib/backend';
	import ModalConfirm from './_confirm.svelte';

	export let member;
	export let amount;
	export let currencies;

	let username, description, payment, currency, body, openConfirm, notifyError, notifyTrasaction, transactionId;

	username = member ? member.username : null;

	const items = async (name) => {
		let json;
		if (name && name.trim().length > 2) {
			json = await getMembers(fetch, { keywords: name, pageSize: 100 });
		}
		return json?.elements ? json.elements : Promise.reject();
	};

	const onConfirm = async () => {
		notifyError = false;
		body = { toMemberId: member?.id, amount, description, currencySymbol: currency };
		const result = await postMemberPayment(fetch, body);
		if (result) {
			payment = result;
			openConfirm = true;
		} else {
			notifyError = true;
		}
	};

	const onSubmit = async () => {
		const result = await postConfirmMemberPayment(fetch, body);
		if (result) {
			transactionId = result.id;
			notifyTrasaction = true;
			member = null;
			amount = 0;
			description = null;
		}
	};

	const onSelect = (value) => (username = value.detail ? value.detail.username : null);
</script>

<div>
	<AutoSelect labelText="Empfänger" bind:value={member} {items} on:select={onSelect} />
	<br />
	<TextInput labelText="Mitglied" value={username} disabled />
	<br />
	<NumberInput label="Betrag" bind:value={amount} />
	<br />
	<Select labelText="Einheit" bind:value={currency}>
		{#each [...currencies] as currency}
			<SelectItem value={currency.symbol}>{currency.name}</SelectItem>
		{/each}
	</Select>
	<br />
	<TextInput labelText="Beschreibung" bind:value={description} />
	<br />
	<ButtonSet>
		<Button on:click={onConfirm} icon={IconMoney}>Übermitteln</Button>
		<Button on:click={() => window.history.back()} icon={IconUndo} kind="secondary">Zurück</Button>
	</ButtonSet>
	<br />
</div>

{#if notifyTrasaction}
	<ToastNotification kind="success" lowContrast title="Zahlung erfolgreich" caption="Transaktion {transactionId}" on:close={() => (notifyTrasaction = false)} />
{/if}

{#if notifyError}
	<ToastNotification kind="error" lowContrast title="Daten fehlerhaft" on:close={() => (notifyError = false)} />
{/if}

<ModalConfirm bind:open={openConfirm} bind:payment delegate={onSubmit} />

<style>
	div {
		line-height: 2rem;
	}
</style>

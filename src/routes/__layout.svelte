<script type="ts">
	import { Header, HeaderUtilities, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink, SkipToContent, Content } from 'carbon-components-svelte';
	import { session, page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { logout } from '$lib/auth';

	import LoginIcon from 'carbon-icons-svelte/lib/Login16';
	import LogoutIcon from 'carbon-icons-svelte/lib/Logout16';
	import HomeIcon from 'carbon-icons-svelte/lib/Home16';
	import EventsIcon from 'carbon-icons-svelte/lib/Events16';
	import MoneyIcon from 'carbon-icons-svelte/lib/Money16';
	import BullhornIcon from 'carbon-icons-svelte/lib/Bullhorn16';
	import UserProfileIcon from 'carbon-icons-svelte/lib/UserProfile16';

	let isSideNavOpen = false;

	const navLinks = [
		{ href: '/', text: 'Home', icon: HomeIcon, public: true },
		{ href: '/me', text: 'Mein Profil', icon: UserProfileIcon },
		{ href: '/members', text: 'Mitglieder', icon: EventsIcon },
		{ href: '/ads', text: 'Inserate', icon: BullhornIcon },
		{ href: '/pay', text: 'Zahlungen', icon: MoneyIcon }
	];

	const onLink = () => {
		isSideNavOpen = false;
	};

	const onLogin = () => {
		isSideNavOpen = false;
		goto('/login');
	};

	const onLogout = () => {
		isSideNavOpen = false;
		$session.authenticated = false;
		$session.username = null;
		$session.token = null;
		logout();
		goto('/');
	};
</script>

<Header bind:isSideNavOpen platformName="OpenCylos" expandedByDefault={false} persistentHamburgerMenu={true}>
	<div slot="skip-to-content">
		<SkipToContent />
	</div>
	<HeaderUtilities>
		{#if $session.authenticated}
			<HeaderGlobalAction aria-label="Settings" icon={LogoutIcon} on:click={onLogout} />
		{:else}
			<HeaderGlobalAction aria-label="Settings" icon={LoginIcon} on:click={onLogin} />
		{/if}
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		{#each navLinks as navLink}
			{#if $session.authenticated || navLink.public}
				<SideNavLink icon={navLink.icon} href={navLink.href} isSelected={navLink.href == $page.path} text={navLink.text} on:click={onLink} />
			{/if}
		{/each}
	</SideNavItems>
</SideNav>

<Content><slot /></Content>

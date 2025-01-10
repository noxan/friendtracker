<script lang="ts">
	import type { ComponentType } from 'svelte';

	interface Props {
		type?: 'button' | 'submit';
		variant?: 'primary' | 'icon';
		icon?: ComponentType | null;
		onClick?: (() => void) | undefined;
		children?: import('svelte').Snippet;
	}

	let {
		type = 'button',
		variant = 'primary',
		icon = null,
		onClick = undefined,
		children
	}: Props = $props();

	const variants = {
		primary:
			'w-full rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
		icon: 'rounded-full p-1 text-gray-400 opacity-0 transition-all hover:text-red-600 active:scale-90 group-hover:opacity-100'
	};
</script>

<button {type} onclick={onClick} class={variants[variant]}>
	{#if icon}
		{@const SvelteComponent = icon}
		<SvelteComponent size={20} />
	{:else}
		{@render children?.()}
	{/if}
</button>

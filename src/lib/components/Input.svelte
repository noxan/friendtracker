<script lang="ts">
	type InputType = 'text' | 'number';

	interface Props {
		id: string;
		label: string;
		type?: InputType;
		value: string | number;
		placeholder?: string;
		error?: string;
	}

	let {
		id,
		label,
		type = 'text',
		value = $bindable(),
		placeholder = '',
		error = ''
	}: Props = $props();
</script>

<div class="space-y-2">
	<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
	<input
		{id}
		{type}
		bind:value
		{placeholder}
		class="block w-full rounded-lg border {error
			? 'border-red-300'
			: 'border-gray-300'} bg-white px-3 py-2 shadow-sm
            focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
	/>
	{#if error}
		<p class="text-sm text-red-600">{error}</p>
	{/if}
</div>

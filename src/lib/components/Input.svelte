<script lang="ts">
	type InputType = 'text' | 'number';

	export let id: string;
	export let label: string;
	export let type: InputType = 'text';
	export let value: string | number;
	export let placeholder: string = '';
</script>

<div class="space-y-2">
	<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
	<input
		{id}
		{type}
		bind:value
		{placeholder}
		class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm
            focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
	/>
</div>

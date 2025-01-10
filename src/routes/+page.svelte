<script lang="ts">
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';

	let formDefaults = {
		name: '',
		age: ''
	};

	let form = $state(formDefaults);

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		const formValues = $state.snapshot(form);
		await db.friends.add({
			name: formValues.name,
			age: parseInt(formValues.age)
		});
		form = formDefaults;
	}

	let friends = liveQuery(() => db.friends.toArray());
</script>

<h1 class="mb-6 text-center text-3xl font-extrabold text-gray-900">Friend Tracker</h1>

<div class="mb-8">
	<h2 class="mb-4 text-xl font-semibold">Friends List</h2>
	<ul class="space-y-2">
		{#if $friends}
			{#each $friends as friend (friend.id)}
				<li class="rounded-md bg-gray-100 p-2 shadow-sm">
					{friend.name}, {friend.age}
				</li>
			{/each}
		{/if}
	</ul>
</div>

<form {onsubmit} class="space-y-4">
	<div>
		<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
		<input
			type="text"
			name="name"
			id="name"
			placeholder="Enter name"
			bind:value={form.name}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
		/>
	</div>
	<div>
		<label for="age" class="block text-sm font-medium text-gray-700">Age</label>
		<input
			type="number"
			name="age"
			id="age"
			placeholder="Enter age"
			bind:value={form.age}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
		/>
	</div>
	<button
		type="submit"
		class="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	>
		Add friend
	</button>
</form>

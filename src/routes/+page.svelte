<script lang="ts">
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';
	import { Trash2 } from 'lucide-svelte';

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

	async function deleteFriend(id: number) {
		await db.friends.delete(id);
	}

	let friends = liveQuery(() => db.friends.toArray());
</script>

<h1 class="mb-6 text-center text-3xl font-extrabold text-gray-900">Friend Tracker</h1>

<div class="mb-8">
	<h2 class="mb-4 text-xl font-semibold">Friends List</h2>
	<ul class="space-y-2">
		{#if $friends}
			{#each $friends as friend (friend.id)}
				<li class="group flex items-center justify-between rounded-md bg-gray-100 p-2 shadow-sm">
					<span>{friend.name}, {friend.age}</span>
					<button
						onclick={() => deleteFriend(friend.id)}
						class="rounded-full p-1 text-gray-400 opacity-0 transition-all hover:text-red-600 active:scale-90 group-hover:opacity-100"
					>
						<Trash2 size={20} />
					</button>
				</li>
			{/each}
		{/if}
	</ul>
</div>

<form {onsubmit} class="space-y-4">
	<div class="space-y-2">
		<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
		<input
			id="name"
			type="text"
			bind:value={form.name}
			placeholder="Enter friend's name"
			class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm
				focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
		/>
	</div>
	<div class="space-y-2">
		<label for="age" class="block text-sm font-medium text-gray-700">Age</label>
		<input
			id="age"
			type="number"
			bind:value={form.age}
			placeholder="Enter friend's age"
			class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm
				focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
		/>
	</div>
	<button
		type="submit"
		class="w-full rounded-lg bg-gray-600 px-4 py-2 text-white
			hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
	>
		Add Friend
	</button>
</form>

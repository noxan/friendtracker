<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
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
					<Button variant="icon" icon={Trash2} onClick={() => deleteFriend(friend.id)} />
				</li>
			{/each}
		{/if}
	</ul>
</div>

<form {onsubmit} class="space-y-4">
	<Input
		id="name"
		label="Name"
		type="text"
		bind:value={form.name}
		placeholder="Enter friend's name"
	/>
	<Input
		id="age"
		label="Age"
		type="number"
		bind:value={form.age}
		placeholder="Enter friend's age"
	/>
	<Button type="submit">Add Friend</Button>
</form>

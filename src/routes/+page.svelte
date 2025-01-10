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

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div>
	<ul>
		{#if $friends}
			{#each $friends as friend (friend.id)}
				<li>{friend.name}, {friend.age}</li>
			{/each}
		{/if}
	</ul>

	<form {onsubmit}>
		<label for="name">Name</label>
		<input type="text" name="name" id="name" placeholder="Name" bind:value={form.name} />
		<label for="age">Age</label>
		<input type="number" name="age" id="age" placeholder="Age" bind:value={form.age} />
		<button type="submit">Add friend</button>
	</form>
</div>

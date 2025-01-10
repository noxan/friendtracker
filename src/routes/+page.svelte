<script lang="ts">
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';

	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const name = formData.get('name') as string;
		const age = parseInt(formData.get('age') as string);
		db.friends.add({ name, age });
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
		<input type="text" name="name" id="name" placeholder="Name" />
		<label for="age">Age</label>
		<input type="number" name="age" id="age" placeholder="Age" />
		<button type="submit">Add friend</button>
	</form>
</div>

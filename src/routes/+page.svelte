<script lang="ts">
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';

	function addFriend() {
		db.friends.add({
			name: 'John Doe',
			age: 30
		});
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

	<button onclick={addFriend}>Add friend</button>
</div>

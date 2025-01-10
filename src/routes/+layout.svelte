<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12">
	<div class="relative py-3 sm:mx-auto sm:max-w-xl">
		<div
			class="to-light-blue-500 absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-cyan-400 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"
		></div>
		<div class="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
			<div class="mx-auto max-w-md">
				<div class="divide-y divide-gray-200">
					<div class="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
						{@render children()}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	let id = '';
	let step = 0;

	let items = [] as string[];
	let guess = [] as string[];

	function chunks(items: string[]): string[][] {
		const result = [[], [], []] as string[][];
		for (let i = 0; i < items.length; i++) {
			result[i % 3].push(items[i]);
		}
		return result;
	}

	function flat(chunks: string[][], i: number): string[] {
		guess = guess.filter((g) => chunks[i].includes(g));
		return [...chunks[(i + 2) % 3], ...chunks[(i + 3) % 3], ...chunks[(i + 4) % 3]];
	}

	function shuffle(arr: string[]): string[] {
		const result = Array.from(arr);
		for (let i = 0; i < result.length; i++) {
			const j = (Math.random() * result.length) | 0;
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	}
</script>

<section
	class="flex min-w-60 max-w-72 flex-col gap-4 rounded-md border-2 border-black bg-sky-500 p-4 font-sans"
>
	{#if !id}
		<h1 class="text-xl font-semibold">Aku bisa menebak pikiran mu</h1>
		<button
			type="button"
			on:click={() => {
				id = Math.random().toString();
				items = Array.from({ length: 18 }, (_, i) => (i ** 3).toString(36) + id);
				guess = items;
			}}
			class="w-full rounded border bg-green-500 hover:bg-green-500/80">mulai</button
		>
	{/if}

	{#if id && step === 0}
		<h1 class="text-xl font-semibold">Ingat salah satu emoji, lalu klik mulai</h1>
		<div class="grid grid-cols-3 gap-2 rounded-md bg-sky-400 p-4">
			{#each items as item}
				<img
					class="h-14 w-14 rounded border"
					alt={item}
					src="https://api.dicebear.com/8.x/fun-emoji/svg?seed={item}&backgroundColor=059ff2,71cf62,d84be5,d9915b,f6d594,fcbc34,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=solid,gradientLinear&backgroundRotation[]"
				/>
			{/each}
		</div>
		<button
			type="button"
			on:click={() => {
				step++;
			}}
			class="w-full rounded border bg-green-500 hover:bg-green-500/80">mulai</button
		>
	{/if}

	{#if step >= 1 && step < 4}
		<h1 class="text-xl font-semibold">Pilih kotak yang ada emoji mu</h1>
		{#each chunks(items) as c, i}
			<div class="rounded border bg-sky-400 pt-2">
				<div class="flex flex-row flex-wrap justify-center gap-2 rounded px-4">
					{#each shuffle(c) as item}
						<img
							alt={item}
							class="h-14 w-14 rounded border"
							src="https://api.dicebear.com/8.x/fun-emoji/svg?seed={item}&backgroundColor=059ff2,71cf62,d84be5,d9915b,f6d594,fcbc34,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=solid,gradientLinear&backgroundRotation[]"
						/>
					{/each}
				</div>
				<button
					type="button"
					on:click={() => {
						items = flat(chunks(items), i);
						step++;
					}}
					class="mt-2 w-full rounded-b border-t bg-green-500 text-lg font-bold hover:bg-green-500/80"
					>disini</button
				>
			</div>
		{/each}
	{/if}

	{#if step === 4}
		{@const item = guess[0]}
		<img
			alt={item}
			class="mx-auto h-32 w-32 rounded border"
			src="https://api.dicebear.com/8.x/fun-emoji/svg?seed={item}&backgroundColor=059ff2,71cf62,d84be5,d9915b,f6d594,fcbc34,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=solid,gradientLinear&backgroundRotation[]"
		/>
		<button
			type="button"
			on:click={() => {
				step = 0;
				id = '';
			}}
			class="w-full rounded border bg-green-500 hover:bg-green-500/80">kembali</button
		>
	{/if}
</section>

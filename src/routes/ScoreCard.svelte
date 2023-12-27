<script lang="ts">
    import { slide } from "svelte/transition";

    let score = 0;

    function increment() {
        score++
    }

    function decrement() {
        if(score < 1) return
        score--
    }
</script>


<button class="w-40 h-40 shadow-lg border border-2 border-gray-100 rounded-sm flex items-center justify-center bg-white" style:font-size="4rem" on:click={increment} on:contextmenu|preventDefault={decrement}>
    {#key score}
        <div in:slide>
            {score}
        </div>
    {/key}
</button>

<script lang="ts">
    import type { Beat } from "$lib/songs";

    export let beat: Beat;

    function getBackground(beat: Beat) {
      if(!beat.opened) return '#64dcfb'
      if(beat.friendly) return '#06117c'
      return '#e67599'
    }

    function getTextColor(beat: Beat) {
      if(!beat.opened) return '#0020ee'
      return 'white'
    }

    function getFontSize(beat: Beat) {
      if(!beat.opened) return '6rem'
      const wordLength = beat.word.length
      const size = (4 +  Math.max(0, 10 - wordLength)) / 4
      return `${size}vw`
    }

    function reveal() {
      if(!beat.friendly) new Audio('/miss.mp3').play()
      beat.opened = true
    }

    function onClick() {
      reveal()
    }

    function onKeydown(e: KeyboardEvent) {
      if(e.key === beat.number.toString()) reveal()
    }

    $: background = getBackground(beat)
    $: color = getTextColor(beat)
    $: fontSize = getFontSize(beat)
</script>

<svelte:body on:keydown={onKeydown}/>
<button 
  on:click={onClick} 
  style:background 
  style:color 
  style:font-size={fontSize} 
  class="uppercase cursor-pointer w-40 h-40 bg-orange-600 flex items-center justify-center text-white border border-10 border-gray-900"
>
  {#if beat.opened}
      {beat.word}
  {:else}
      {beat.number}
  {/if}
</button>
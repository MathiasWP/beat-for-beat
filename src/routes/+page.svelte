<script lang="ts">
  import { fireConffeti } from "$lib/confetti";
    import { songs } from "$lib/songs";
    import BeatPanel from "./BeatPanel.svelte";
    import InfoTooltip from "./InfoTooltip.svelte";
    import ScoreCard from "./ScoreCard.svelte";
    import logo from './logo.png'


    let audioIsPlaying = false
    let playing = false
    let songHasBeenRevealed = false

    let index = 0;

    async function wait(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    async function playIntroSong() {
        if(audioIsPlaying) return
        audioIsPlaying = true
        new Audio('/intro.mp3').play()
    }

    function goToNextSongIfPossible() {
        if(index < songs.length - 1) {
            index++
            songHasBeenRevealed = false
        }
    }

    function revealSong() {
        const allBeatsOpened = song.beats.every(beat => beat.opened)
        if(allBeatsOpened) {
            songHasBeenRevealed = true
            fireConffeti()
        }
    }

    async function openAllBeats() {
        for await (const beat of song.beats) {
            song.beats = song.beats.map(b => {
                if(beat.number === b.number) b.opened = true
                return b;
            })
            await wait(250)
        }
    }
    
    function onBodyKeydown(e: KeyboardEvent) {
        if(e.key.toLowerCase() === 'a') {
            openAllBeats()
        }

        if(e.key === ' ') {
            if(!playing) playing = true
            
            if(songHasBeenRevealed) {
                goToNextSongIfPossible()
            } else {
                revealSong()
            }
        }
    }

    $: song = songs[index]
</script>

<svelte:body on:keydown={onBodyKeydown}/>
<div class="bg-white h-screen w-full flex-col flex items-center justify-center p-8 gap-20">
    {#if playing}
        <div class:opacity-100={songHasBeenRevealed} class:opacity-0={!songHasBeenRevealed} class="flex flex-col gap-2 text-3xl">
            <p>
                <b>Artist:</b> {song.artist}
            </p>
            <p>
                <b>Song:</b> {song.name}
            </p>
        </div>
        <div class="flex flex-wrap justify-center">
            {#each song.beats as beat, i (i)}    
                <BeatPanel {beat} />
            {/each}
        </div>
        <div class="flex w-full items-center justify-evenly">
            <ScoreCard />
            <ScoreCard />
        </div>
        <div class="absolute right-4 bottom-4">
            <InfoTooltip />
        </div>
    {:else}
        <button class="w-screen h-screen flex flex-col items-center justify-center" on:click={playIntroSong}>
            <img src={logo} alt="Beat for Beat" class="relative w-68 z-1"/>
            <p>Press space to play</p>
        </button>
    {/if}
</div>
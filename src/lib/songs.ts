export type Beat = {
    word: string, 
    friendly: boolean
    opened: boolean
    number: number
}

export type Song = {
    artist: string
    name: string
    beats: Beat[]
}

export const songs: Song[] = createSongs([
    {
        artist: `Crowded House`,
        name: `Don't dream it's over`,
        words: `Hey now Hey now, don't dream it's over`
    },
    {
        artist: `Klovner i kamp`,
        name: `Langt å gå`,
        words: `En bit av gangen`
    },
    {
        artist: `Kelly`,
        name: `Grace Kelly`,
        words: `So I tried a little Freddie, mmh`
    },
    {
        artist: `Journey`,
        name: `Don't stop believin'`,
        words: `Hidin', somewhere in the night`
    },
    {
        artist: `Bjelleklang`,
        name: `Gud, hvor du er deilig`,
        words: `Gud, hvor du er dejlig`
    },
    {
        artist: `Carly Rae Jepsen`,
        name: `Call Me Maybe`,
        words: `Where you think you're going, baby?`
    },
])

function createSongs(input: (Omit<Song, 'beats'> & { words: string })[]) {
    const songs: Song[] = []

    for(const song of input) {
        songs.push({
            artist: song.artist,
            name: song.name,
            beats: createBeats(song.words)
        })
    }

    return songs
}

function createBeats(words: string): Beat[] {
    const wordsSplitted = words.split(' ')
    const amountOfNotFriendliesAllowed = Math.floor(wordsSplitted.length / 3.3)
    let notFriendliesCreated = 0;

    function setFriendly() {
        if(amountOfNotFriendliesAllowed === notFriendliesCreated) return true
        const shouldBeNotFriendly = Math.random() > 0.5
        return shouldBeNotFriendly
    }

    return wordsSplitted.map((word, i) => ({
        number: i + 1,
        word,
        opened: false,
        friendly: setFriendly()
    }))
}
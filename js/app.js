// "characters": "https://rickandmortyapi.com/api/character",
// "locations": "https://rickandmortyapi.com/api/location",
// "episodes": "https://rickandmortyapi.com/api/episode"

const page = 4
const baseURL = 'https://rickandmortyapi.com/api/'

const loadCharacter = async () =>{
    const res = await fetch(`${baseURL}/character?page=${page}`)
    const data = await res.json();
    //limitar dados da API
    const limitData = data.results.slice(0,9) //seleciona do indice que é o 0 e a quantia de informações requeridas
    return {results: limitData}
}

const loadLocation = async () =>{
    const res = await fetch(`${baseURL}/location`)
    return await res.json()
}

const loadEpisode = async () =>{
    const res = await fetch(`${baseURL}/episode`)
    return await res.json()
}

const loadAllWithPromiseAll = async () =>{
    const [character, location, episode] = await Promise.all([
        loadCharacter(),
        loadLocation(),
        loadEpisode(),

    ])
    console.log(character)
    showCharacters(character.results)
    console.log("Location: ", location)
    console.log("Episodes: ", episode)
}

loadAllWithPromiseAll()

function showCharacters(character, episodes){
    const characterContainer = document.getElementById('character-container')
    character.map((character) => {
        const divCharacter = document.createElement('div')
        divCharacter.id = `character-${character.id}`
        divCharacter.innerHTML = `
        <img src="${character.image}" alt='Imagem do ${character.name}'>
        <article class='character-info'>
            <a href="https://rickandmortyapi.com/api/character/${character.id}">
                <h3>${character.name}</h3>
            </a>

            <span class=''>${character.status} - ${character.species}</span>

            <span class='location subtext'>Last Seen Location:</span>
            <a href='${character.location.url}'>${character.location.name}</a>

            <span class='origin subtext'>Local Origin:</span>
            <a href='${character.origin.url}'>${character.origin.name}</a>
            </article>

        `
        divCharacter.classList.add('character-box')
        characterContainer.appendChild(divCharacter)
        divCharacter.addEventListener('click', async() =>{
            characterPage(character.id)
        })
    })
}

function characterPage(id){
    console.log(id)

    window.location.href = `../pages/character.html?id${id}`
}
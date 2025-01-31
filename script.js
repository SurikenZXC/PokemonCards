// old API (https://pokeapi.co/api/v2/pokemon/)
const api = "https://pokeapi.co/api/v2/pokemon-species/?&limit=200" // all pokemons (https://pokeapi.co/api/v2/pokemon-species/?&limit=200)
const form = document.querySelector("#form")
const selectTag = document.querySelector("#pokemon")
const infoContainer = document.querySelector(".infoContainer")
const music = document.querySelector("#music")


const img = document.createElement("img")

// delete if needed
//const speciesURL = "https://pokeapi.co/api/v2/pokemon-species/"



const pokeNames = []

let pokemonID
let urlPokemonID

// Запуск Программы
start()

// Нахождение юрл АПИ по айди покемона
async function start() {
  const firstResponse = await fetch(api)
  const firstData = await firstResponse.json()

  //
  const pokemonCollection = firstData.results

  // Pokemon API's (names and url for pokemon-species)

  getNames(pokemonCollection)

  createSelection(pokeNames)


                                                        // SUBMIT
  form.addEventListener("submit",event => {
    event.preventDefault()
    pokemonID = selectTag.value
    urlPokemonID = +pokemonID+1

    displayPokemonInfo(pokemonCollection[pokemonID].url)


    
  })

  
}

// Какая то главная функция будет все обрабатывать
async function displayPokemonInfo(url) {
  // species data
  const speciesResponse = await fetch(url)
  const speciesData = await speciesResponse.json()

  // pokemon data
  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${urlPokemonID}`)
  const pokemonData = await pokemonResponse.json()

  setBackgroundColor(speciesData)

  createImg(pokemonData, infoContainer)
  startMusic(pokemonData)
}

// Функция для получения имен
function getNames(pokemonCollection){
  for (let i = 0; i < pokemonCollection.length; i++){
    pokeNames[i] = pokemonCollection[i].name.toUpperCase()
  }
}

function createSelection(names){
  for(let i = 0;i < names.length; i++){
    createOption(names[i],i)
  }
}

function createOption(name, i){
  const optionElement = document.createElement("option")
  optionElement.innerHTML = name
  optionElement.value = i
  selectTag.append(optionElement)
}

 // img settings
function createImg(data, place){
  place.prepend(img)
  img.src = data.sprites.other["official-artwork"].front_default
  img.style.width = "1000px"
}

  //music settings
function startMusic(data){
  music.src = data.cries.latest
  music.volume = 0.05
  music.play()
}

function setBackgroundColor(data){
  infoContainer.style.backgroundColor = data.color.name
}
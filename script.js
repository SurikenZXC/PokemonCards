const api = "https://pokeapi.co/api/v2/pokemon/"
const form = document.querySelector("#form")
const selectTag = document.querySelector("#pokemon")
const infoContainer = document.querySelector(".infoContainer")

const img = document.createElement("img")


const pokeNames = []

// Запуск Программы
start()

// Нахождение юрл АПИ по айди покемона
async function start() {
  const firstResponse = await fetch(api)
  const firstData = await firstResponse.json()
  const pokemonCollection = firstData.results

  // Pokemon API's
  // console.log(pokemonCollection)

  getNames(pokemonCollection)

  createSelection(pokeNames)

  form.addEventListener("submit",event => {
    event.preventDefault()
    const pokemonID = selectTag.value
    showPokemonInfo(pokemonCollection[pokemonID].url)
  })

  
}

// Какая то главная функция будет все обрабатывать
async function showPokemonInfo(url) {
  const response = await fetch(url)
  const data = await response.json()
  createImg(data.sprites.other["official-artwork"].front_default, infoContainer)
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


function createImg(src, place){
  place.prepend(img)
  img.src = src
  img.style.width = "1000px"
}

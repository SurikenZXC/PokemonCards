const jokeContainer = document.querySelector(".joke")
const button = document.querySelector(".button")
const urlAPI = "https://v2.jokeapi.dev/joke/Programming?type=single"

async function makeJoke() {
  const response = await fetch(urlAPI)
  const data = await response.json()
  jokeContainer.innerHTML = data.joke
}

button.addEventListener("click", ()=>{
  makeJoke()
})

makeJoke()


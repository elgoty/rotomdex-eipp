import './App.css'
import {useState, useEffect} from "react"
function App() {
  const [pokemones, setPokemones] = useState([])
  useEffect(() => {
    const fetchPokemones = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      const data = await response.json()
      const { results } = data
      
    const detallesPokemon = await Promise.all(
      results.map(async (pokemon)=>{
        const respuesta = await  fetch(pokemon.url)
        const datos = await respuesta.json()
        return{
          id:datos.id,
          nombre:datos.name,
          imagen:datos.sprites.front_default,
          altura:datos.height,
          peso:datos.weight,
          types: datos.types.map((t) => t.type.name),
          abilities: datos.abilities.map((a) => a.ability.name),
        }
      })
    )
  setPokemones(detallesPokemon)
  }
    fetchPokemones()
  }, [])

  return (
    <>
      <h1>Rotomdex</h1>
      <h2>Welcome to the rotomdex</h2>
      <h3>pokegod</h3>
      <p>Here you can find information of all the pokemons</p>
      {pokemones.map(pokemon =>(
      <div className='tutifruti' key={pokemon.id}>
        <h2>{pokemon.nombre} ({pokemon.id})</h2>
        <img src={pokemon.imagen} alt="" />
        <p>altura: {pokemon.altura/10}m</p>
        <p>{pokemon.peso/10}kg</p>
        <p>{pokemon.types}</p>
        <p>{pokemon.abilities}</p>
      </div>
    ))}
      <div>
        <p>Developed by E.I.P.P</p>
        <p>2025</p>
        <p>Al, rights reserved</p>
      </div>
    </>
  )
}

export default App

import './App.css'
import {useState, useEffect} from "react"
import Pokemon from "./components/Pokemon";
function App() {
  const [pokemones, setPokemones] = useState([]);
  const [busquedaPokemon, setBusquedaPokemon] = useState("")
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
  const pokemonesFiltrados = pokemones. filter((p) => {
    return p.nombre.toLowerCase().includes(busquedaPokemon  )
  })

  return (
    <>
      <h1>Rotomdex</h1>
      <Pokemon/>

      <h2>Welcome to the rotomdex</h2>
      <p>find your favorite pokemon!</p>
      <input classname='search' 
      type="text" 
      placeholder="Search your pokemon" 
      value={busquedaPokemon} 
      onChange={(e) => setBusquedaPokemon(e.target.value.toLowerCase())} />
      
      {pokemonesFiltrados.map(pokemon =>(
      <Pokemon key={pokemon.id}/>
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

import React from 'react'
import "./Pokemon.css"

function Pokemon({datos}) {
  return (
     <div className='tutifruti'>
        <h2>{datos.nombre} ({datos.id})</h2>
        <img src={datos.imagen} alt="" />
        <p>altura: {datos.altura/10}m</p>
        <p>{datos.peso/10}kg</p>
        <p>{datos.types}</p>
        <p>{datos.abilities}</p>
      </div>
  )
}

export default Pokemon
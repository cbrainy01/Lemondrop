import React from 'react'
import ItemHat from './ItemHat'
function HatList({hats}) {
    const renderHats = hats.map( (hat)=>{
        return <ItemHat key={hat.id} name={hat.name} image={hat.image} price={hat.price} stock={hat.stock}/>
    } ) 
    return (
        <div>
            HAT COMPONENT
            {renderHats}
        </div>
    )
}

export default HatList

import React from 'react'
import ItemHat from './ItemHat'
import {v4 as uuid} from "uuid"

function HatList({hats}) {
    const renderHats = hats.map( (hat)=>{
        return <ItemHat key={uuid()} name={hat.name} image={hat.image} price={hat.price} stock={hat.stock}/>
    } ) 
    return (
        <div>
            HAT COMPONENT
            {renderHats}
        </div>
    )
}

export default HatList

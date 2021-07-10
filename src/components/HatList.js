import React, { useState } from 'react'
import ItemHat from './ItemHat'
import {v4 as uuid} from "uuid"

function HatList({hats, onHatPurchase, onHatSort}) {

    //const [hatSort, setHatSort] = useState()

    const renderHats = hats.map( (hat)=>{
        return <ItemHat key={uuid()} 
                        name={hat.name} 
                        image={hat.image} 
                        price={hat.price} 
                        stock={hat.stock}
                        id={hat.id}
                        onHatPurchase={onHatPurchase}
                />
    } ) 

    function handleChange(e) {
        onHatSort(e.target.value);
    }

    return (
        <div>
            
            HAT COMPONENT
            <select onChange={handleChange}>
                <option value="A-Z">Name(A-Z)</option>
                <option value="Z-A">Name(Z-A)</option>
                <option value="hilo">Price(high-low)</option>
                <option value="lohi">Price(low-high)</option>
            </select>
            {renderHats}
        </div>
    )
}

export default HatList

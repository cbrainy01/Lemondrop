import React from 'react'
import ItemGlass from './ItemGlass';
import {v4 as uuid} from "uuid"

function GlassesList({glasses, onGlassPurchase}) {
    
    const renderGlasses = glasses.map( (glass)=> {
       return <ItemGlass key={uuid()}
                   name={glass.name} 
                   image={glass.image}
                   price={glass.price}
                   stock={glass.stock}
                   id = {glass.id}
                   onGlassPurchase={onGlassPurchase}
                 />
    } );
    
    return (
        <div>
            GLASSES COMPONENT
            {renderGlasses}
        </div>
    )
}

export default GlassesList
import React from 'react'
import ItemGlass from './ItemGlass';

function GlassesList({glasses}) {
    console.log("glasses is: ", glasses);
    const renderGlasses = glasses.map( (glass)=> {
       return <ItemGlass key={glass.id}
                   name={glass.name} 
                   image={glass.image}
                   price={glass.price}
                   stock={glass.stock}
         />
    } );
    
    return (
        <div>
            glasseslist component
            {renderGlasses}
        </div>
    )
}

export default GlassesList
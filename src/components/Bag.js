import React from 'react'
import BagItem from './BagItem'
import {v4 as uuid} from "uuid"

function Bag({ onReturnAll, onPartialReturn , purchasedGlasses}) {
    //use .map to create component for each purchased glass
    const renderGlassesPurchases = purchasedGlasses.map( (glass) => {
      return <BagItem 
        key={uuid()}
        onReturnAll={onReturnAll}
        onPartialReturn={onPartialReturn}
        name={glass.name}
        quantity={glass.quantity}
        id={glass.id}
        totalCost={glass.totalCost}
        image={glass.image}
        price={glass.price}
        stock={glass.stock}
       />
    } )
    console.log("purchased glasses located in bag", purchasedGlasses);
    return (
        <div>
            Bag component
            {renderGlassesPurchases}
        </div>
    )
}

export default Bag

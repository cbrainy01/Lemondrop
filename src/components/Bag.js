import React from 'react'
import BagItem from './BagItem'
import {v4 as uuid} from "uuid"
import BagItemHats from './BagItemHats'
import "./shopitems.css"

function Bag({ onReturnAll,
            onPartialReturn,
            purchasedGlasses,
            onReturnAllHats,
            onPartialReturnHats,
            purchasedHats,
            }) {
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

    const renderHatsPurchases = purchasedHats.map( (hat) => {
      return <BagItemHats 
        key={uuid()}
        onReturnAllHats={onReturnAllHats}
        onPartialReturnHats={onPartialReturnHats}
        name={hat.name}
        quantity={hat.quantity}
        id={hat.id}
        totalCost={hat.totalCost}
        image={hat.image}
        price={hat.price}
        stock={hat.stock}
       />
    } )

    return (
        <div>
            <h1 className="headerbag">Your Purchases</h1>
            {/* <div className="shopcontainer"> */}
              
            {/* </div> */}
              
            <div>
              {renderHatsPurchases}
              {renderGlassesPurchases}
            </div>
        </div>
    )
}

export default Bag
// className="shopcontainer"
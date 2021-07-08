import React from 'react'
import BagItem from './BagItem'

function Bag({purchasedGlasses}) {
    //use .map to create component for each purchased glass
    //const renderGlassesPurchases = 
    console.log("purchased glasses located in bag", purchasedGlasses);
    return (
        <div>
            Bag component
            {/* {renderGlassesPurchases} */}
        </div>
    )
}

export default Bag

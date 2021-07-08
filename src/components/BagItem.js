import React from 'react'

function BagItem({name, quantity, id, totalCost, image, price}) {
    return (
        <div>
            <h3>name</h3>
            <img alt=""/>
            <p>quantity bought: </p>
            <p>total cost: </p>

            {/* {dropdown with quantity bought} */}
            {/*create patch request then modify moneyLeft accordingly */}
            <button>Return item</button>
        </div>
    )
}

export default BagItem

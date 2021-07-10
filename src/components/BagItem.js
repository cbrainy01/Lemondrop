import React, { useState } from 'react'
import {v4 as uuid} from "uuid"


function BagItem({onReturnAll, onPartialReturn, name, quantity, id, totalCost, image, stock, price}) {
   
    const [returnQty, setReturnQty] = useState(0)
    const [selectedOption, setSelectedOption] = useState("qty")
    //const [moneyLeft, setMoneyLeft] = useContext(MoneyContext)
    //const [qtyBought, setQtyBought] = useState(quantity)

    function handleChange(event) {
        const parsedValue = parseInt(event.target.value, 10)
        console.log("parsed value is: ", parsedValue );
        setReturnQty(parsedValue)
        setSelectedOption(event.target.value)
        console.log("non parse is: ", event.target.value );

    }

    function optionDropdown() {
        const options = [];
        for(let i = 1; i <= quantity; i++) {
            options.push(i)    
        }
        const renderOptions = options.map( (val) => {
            return <option key={uuid()} value={val}>{val}</option>
        } )
        return renderOptions;
    }
    //create patch to change stock count of item
   function handleClick() {
        if(selectedOption === "qty") {
            alert("please select a return quantity");
        }





        else if(returnQty === quantity) {
            const updatedStock = (stock - quantity) + returnQty
            const returnAmt = returnQty * price
            onReturnAll(id, updatedStock, returnAmt)
        }






        else {
            
            //setQtyBought( (qtyBought) => qtyBought - returnQty )
            //alert("patch glasses");
            const returnAmt = returnQty * price
            //set newtotalCost value 
            const newtotalCost = totalCost - (returnAmt)
            //set newquantity value
            const newQ = quantity - returnQty
           
            const updatedStock = (stock - quantity) + returnQty
            onPartialReturn(id, updatedStock, newQ, newtotalCost, returnAmt)
           
        }
   }
   
    return (
        <div>
            <h3>name: {name}</h3>
            <img src={image} alt=""/>
            <p>quantity bought: {quantity}</p>
            <p>total cost: {totalCost} </p>

            {/* {dropdown with quantity bought} */}
            <select name="return" value={returnQty} onChange={handleChange}>
                <option value="qty">qty</option>
                {optionDropdown()}
            </select>
            {/*create patch request then modify moneyLeft accordingly */}
            <button onClick={handleClick} >Return item</button>
        </div>
    )
}

export default BagItem

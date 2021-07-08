import React, { useState, useContext } from 'react'
import { MoneyContext } from '../context/moneycount'

function ItemGlass({name, image, price, stock, id}) {
    const [quantity, setQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    
    function handleChange(event) {
        setQuantity(event.target.value);
        setTotalCost(event.target.value * price);
    }
 
    console.log("selected quantity: ", quantity)
    console.log("total cost: ", totalCost);

    function optionDropdown() {
        const options = [];
        for(let i = 1; i <= stock; i++) {
                options.push(<option key={id} value={i}>{i}</option>)
        }
        return options
    }

    const [moneyLeft, setMoneyLeft] = useContext(MoneyContext)
    /*when clicked, check to make sure item is in 
    stock(if not, use alert),
     before allowing purchase to go through*/
    function handleClick() {
        if(stock <= 0) {
            console.log("item is out of stock")
        }
        else if(moneyLeft < price) {
            console.log("not enough money")
        }
        else{
            //create patch request which reduces stock num
            console.log("creating patch request");
        }
    }

    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <p>{stock} in stock</p>
            <p>{price}$</p>
            <select onChange={handleChange}>
                {optionDropdown()}
            </select>
            <button onClick={handleClick}>Add to bag</button>
        </div>
    )
}

export default ItemGlass

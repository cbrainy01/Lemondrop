import React, { useState, useContext } from 'react'
import { MoneyContext } from '../context/moneycount'
import {v4 as uuid} from "uuid"
import "./shopitems.css"


function ItemGlass({name, image, price, stock, id, onGlassPurchase}) {
    const [quantity, setQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [selectedOption, setSelectedOption] = useState("select quantity")
    const [moneyLeft, setMoneyLeft] = useContext(MoneyContext)
    
    function handleChange(event) {
        const parsedValue = parseInt(event.target.value, 10)
        setSelectedOption(parsedValue)
        setQuantity(parsedValue);
        setTotalCost(parsedValue * price);
    }
 

    function optionDropdown() {
        const options = [];
        for(let i = 1; i <= stock; i++) {
            options.push(i)    
            //options.push(<option key={uuid()} value={i}>{i}</option>)
        }
        const renderOptions = options.map( (val) => {
            return <option key={uuid()} value={val}>{val}</option>
        } )
        return renderOptions;
        //return options
    }

    
    /*when clicked, check to make sure item is in 
    stock(if not, use alert),
     before allowing purchase to go through*/
    function handleClick() {
        if(stock <= 0) {
            alert("item is out of stock")
        }
        else if(selectedOption === "select quantity") {
            alert("please select a quantity")
        }
        else if(moneyLeft < totalCost) {
            alert("not enough money")
        }
        else{
            //create patch request which reduces stock num
            //thisll require passing id and updated stock count up
           const updatedStock = stock - quantity
            //deduct totalCost from moneyLeft
            setMoneyLeft((moneyLeft)=> moneyLeft - totalCost)
            //add item/items to bag
            const newPurchase = {
                name: name,
                quantity: quantity,
                id: id,
                totalCost: totalCost,
                image: image,
                price: price,
                stock: stock
            }
            onGlassPurchase(id, updatedStock, newPurchase, quantity, );
        }
    }

    return (
        <div className="cart">
            
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <h5>{stock} in stock</h5>
            <label></label>
            <select name="quantity" value={selectedOption} onChange={handleChange}>
                <option>select qty</option>
                {optionDropdown()}
            </select>
            <br></br>
            <h5>{price}$</h5>
            <button onClick={handleClick}>Add to bag</button>
        </div>
    )
}

export default ItemGlass
//className="glasses"
import React, { useState } from 'react'
import ItemHat from './ItemHat'
import {v4 as uuid} from "uuid"

function HatList({hats, onHatPurchase}) {

    const [sortType, setSortType] = useState("All")

    function hatSort() {
        if(sortType === "All") {
            return hats;
        }
        else if(sortType === "hilo") {
          const hiloSort = hats.sort( (hatA, hatB)=>{
              if(hatA.price < hatB.price) {return 1}
              else if(hatA.price > hatB.price) {return -1}
              else {return 0}
          } );
          return hiloSort;
        }
        else if(sortType === "lohi") {
          const lohiSort = hats.sort( (hatA, hatB)=>{
            if(hatA.price > hatB.price) {return 1}
            else if(hatA.price < hatB.price) {return -1}
            else {return 0}
        } );
        return lohiSort;
        }
        else if(sortType === "A-Z") {
          const nameSortAZ = hats.sort( (hatA, hatB)=> {
             if(hatA.name.toLowerCase() > hatB.name.toLowerCase()) {return 1}
             else if(hatA.name.toLowerCase() < hatB.name.toLowerCase()) {return -1}
             else {return 0}
          } )
          return nameSortAZ
        }
        else if(sortType === "Z-A") {
          const nameSortZA = hats.sort( (hatA, hatB)=> {
            if(hatA.name.toLowerCase() < hatB.name.toLowerCase()) {return 1}
            else if(hatA.name.toLowerCase() > hatB.name.toLowerCase()) {return -1}
            else {return 0}
         } )
         console.log("namesortZA", nameSortZA)
         return nameSortZA
        }
        else{alert("error")}
    }



    const renderHats = hatSort().map( (hat)=>{
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
        setSortType(e.target.value);
    }

   

    return (
        <div>
            
            HAT COMPONENT
            <label>Sort by:</label>
            <select name="hatsort" onChange={handleChange}>
                <option value="All">Sortby</option>
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

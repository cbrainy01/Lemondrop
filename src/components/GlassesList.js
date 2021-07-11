import React, { useState } from 'react'
import ItemGlass from './ItemGlass';
import {v4 as uuid} from "uuid"

function GlassesList({glasses, onGlassPurchase}) {
    
    const [sortType, setSortType] = useState("All")

    function glassesSort() {
        if(sortType === "All") {
            return glasses;
        }
        else if(sortType === "hilo") {
          const hiloSort = glasses.sort( (glassA, glassB)=>{
              if(glassA.price < glassB.price) {return 1}
              else if(glassA.price > glassB.price) {return -1}
              else {return 0}
          } );
          return hiloSort;
        }
        else if(sortType === "lohi") {
          const lohiSort = glasses.sort( (glassA, glassB)=>{
            if(glassA.price > glassB.price) {return 1}
            else if(glassA.price < glassB.price) {return -1}
            else {return 0}
        } );
        return lohiSort;
        }
        else if(sortType === "A-Z") {
          const nameSortAZ = glasses.sort( (glassA, glassB)=> {
             if(glassA.name.toLowerCase() > glassB.name.toLowerCase()) {return 1}
             else if(glassA.name.toLowerCase() < glassB.name.toLowerCase()) {return -1}
             else {return 0}
          } )
          return nameSortAZ
        }
        else if(sortType === "Z-A") {
          const nameSortZA = glasses.sort( (glassA, glassB)=> {
            if(glassA.name.toLowerCase() < glassB.name.toLowerCase()) {return 1}
            else if(glassA.name.toLowerCase() > glassB.name.toLowerCase()) {return -1}
            else {return 0}
         } )
         return nameSortZA
        }
        else{alert("error")}
    }

    const renderGlasses = glassesSort().map( (glass)=> {
       return <ItemGlass key={uuid()}
                   name={glass.name} 
                   image={glass.image}
                   price={glass.price}
                   stock={glass.stock}
                   id = {glass.id}
                   onGlassPurchase={onGlassPurchase}
                 />
    } );
    
    function handleChange(e) {
        setSortType(e.target.value);
    }

    return (
        <div>
            GLASSES COMPONENT
            {/* <create search bar> */}
            <select name="hatsort" onChange={handleChange}>
                <option value="All">Sortby</option>
                <option value="A-Z">Name(A-Z)</option>
                <option value="Z-A">Name(Z-A)</option>
                <option value="hilo">Price(high-low)</option>
                <option value="lohi">Price(low-high)</option>
            </select>
            {renderGlasses}
        </div>
    )
}

export default GlassesList
import React, { useState } from 'react'
import { useRouteMatch } from 'react-router'
import { Route } from "react-router-dom"
import GlassesList from './GlassesList';
import HatList from './HatList';
import { NavLink } from 'react-router-dom'


function Shop({ hats, glasses, onGlassPurchase, onHatPurchase}) {
    //split screen with half being a link to hats and other half being link to glasses
    const [searchValue, setSearchValue] = useState("")

    function filterHats() {
        const filtered = hats.filter( (hat)=> {
            if(searchValue === "") {return hat}
            else if( hat.name.toLowerCase().includes(searchValue.toLowerCase()) ) {return hat }
            }  )
            return filtered;
    }

    function handleHatSearch(userInput) {
        setSearchValue(userInput)
    }

   const match = useRouteMatch();
    return (
        <div>
            <NavLink to="/shop/hats">hat section</NavLink>
            <NavLink to={`${match.url}/glasses`}>glasses section</NavLink>
           <Route path={'/shop/hats'}>
                <HatList onHatSearch={handleHatSearch} onHatPurchase={onHatPurchase} hats={filterHats()}/>
           </Route>
           <Route exact path={`${match.url}/glasses`}>
                <GlassesList onGlassPurchase={onGlassPurchase} glasses={glasses}/>
           </Route>
        </div>
    )
}

export default Shop

//<NavLink to={`${match.url}/glasses`>Shop Glasses </NavLink>
//<NavLink to={`${match.url}/hats`}>Shop Hats</NavLink>
//<NavLink to="/shop/hats">test</NavLink>

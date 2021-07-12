import React, { useState } from 'react'
import { useRouteMatch } from 'react-router'
import { Route } from "react-router-dom"
import GlassesList from './GlassesList';
import HatList from './HatList';
import { NavLink } from 'react-router-dom'
import "./splitscreen.css"

function Shop({ hats, glasses, onGlassPurchase, onHatPurchase}) {
    //split screen with half being a link to hats and other half being link to glasses
    const [searchValueHats, setSearchValueHats] = useState("")
    const [searchValueGlasses, setSearchValueGlasses] = useState("")

    function filterHats() {
        const filtered = hats.filter( (hat)=> {
            if(searchValueHats === "") {return hat}
            else if( hat.name.toLowerCase().includes(searchValueHats.toLowerCase()) ) {return hat }
            }  )
            return filtered;
    }

    function handleHatSearch(userInput) {
        setSearchValueHats(userInput)
    }

    function handleGlassesSearch(userInput) {
        setSearchValueGlasses(userInput)
    }

    function filterGlasses() {
        const filtered = glasses.filter( (glass)=> {
            if(searchValueGlasses === "") {return glass}
            else if( glass.name.toLowerCase().includes(searchValueGlasses.toLowerCase()) ) {return glass }
            }  )
            return filtered;
    }

   const match = useRouteMatch();
    return (
        <div>
            {/* style the navlinks */}
            <div className="container">
                <section className="hats"><NavLink to="/shop/hats">Shop Hats</NavLink></section>
                <section className="glasses"><NavLink to={`${match.url}/glasses`}>Shop Glasses</NavLink></section>
            </div>
               
          
           <Route path={'/shop/hats'}>
                <HatList onHatSearch={handleHatSearch} onHatPurchase={onHatPurchase} hats={filterHats()}/>
           </Route>
           <Route exact path={`${match.url}/glasses`}>
                <GlassesList onGlassesSearch={handleGlassesSearch} onGlassPurchase={onGlassPurchase} glasses={filterGlasses()}/>
           </Route>
        </div>
    )
}

export default Shop


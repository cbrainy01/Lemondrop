import React, {useState, useEffect, useContext} from "react"
import { Route, Switch } from "react-router-dom"
import Navbar from "./Navbar";
import Shop from "./Shop";
import Bag from "./Bag";
import { MoneyContext } from '../context/moneycount'

function App() {

  const [hats, setHats] = useState([])
  const [glasses, setGlasses] = useState([])
  const [purchasedGlasses, setPurchasedGlasses] = useState([]);
  const [moneyLeft, setMoneyLeft] = useContext(MoneyContext)

  
  useEffect( ()=> {
    fetch("http://localhost:3004/hats")
    .then((response)=>response.json() )
    .then( (responseData)=>setHats(responseData) )
    .catch((error)=>console.log(error));
  }, [] )
  useEffect( ()=> {
    fetch("http://localhost:3004/glasses")
    .then((response)=>response.json() )
    .then( (responseData)=>setGlasses(responseData) )
    .catch((error)=>console.log(error));
  }, [] )

  function handleGlassPurchase(id, updatedStock, newlyPurchased) {
    console.log("updated stock: ", updatedStock)
    console.log("typeofupdated stock: ", typeof updatedStock)
    fetch(`http://localhost:3004/glasses/${id}`, 
    {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"stock": updatedStock})
    })
    .then( (r)=>r.json() )
    .then( (rData) => {
    const respIndex = glasses.findIndex( (glass) => glass.id === rData.id );
    const beforeItemArray = glasses.slice(0, respIndex);
    const afterItemArray = glasses.slice(respIndex + 1);
    setGlasses([...beforeItemArray, rData, ...afterItemArray]);
    })

  
    setPurchasedGlasses([...purchasedGlasses, newlyPurchased])
  }
  console.log("purchasedGlasses: ", purchasedGlasses);

  return (
    <div>
      Money left: {moneyLeft}
      <Navbar/>
      <Switch>
        <Route path="/shop">
          <Shop onGlassPurchase={handleGlassPurchase} hats={hats} glasses={glasses}/>
        </Route>
        <Route exact path="/bag"><div><Bag purchasedGlasses={purchasedGlasses}/></div></Route>
        <Route path="/" exact>
          <div>Home component</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

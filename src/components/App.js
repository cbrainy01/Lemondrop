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

  function handleGlassPurchase(id, updatedStock, newlyPurchased, purchaseQuantity, purchasePrice) {
    console.log("updated stock: ", updatedStock)
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

    //   const newPurchase = {
    //     name: name,
    //     quantity: quantity,
    //     id: id,
    //     totalCost: totalCost,
    //     image: image,
    //     price: price,
    //     stock: stock
    // }
    // const purchasedGlasses = [ {}, {}, {} ]

    const indexOfExisting = purchasedGlasses.findIndex( (glass)=> glass.id === id )
    /*if indexofexisting === -1, then theres no preexisting glass in
     purchasedGlasses so a newlyPurchased is gonna have to be added

      if indexofexisting doesnt === -1, then use that index to increase quantity
       of that glass. purchasedGlasses[indexofExisting].quantity = purchaseQuantity  
    */
   console.log("indexof existing", indexOfExisting)
   
   let newPg;
    console.log(id)
   if(indexOfExisting === -1) {
      newPg = [...purchasedGlasses, newlyPurchased]
    }
    else if(indexOfExisting !== -1 ) {
        //const modifiedPurchasedGlasses = purchasedGlasses[indexOfExisting].quantity = purchaseQuantity;
        //const update = {...formData, category: e.target.value}    
        // purchasedGlasses[indexOfExisting] is an object
        //here were modifying that object
        //now how do i get that modified obj as part of the array its in?
        //acess the already existing quantity and store in a variable
        const existingPrice = purchasedGlasses[indexOfExisting].totalCost
        console.log("existingp: ", existingPrice)
         console.log("purchasep: ", newlyPurchased.price)
        const newPrice = existingPrice + (newlyPurchased.price * purchaseQuantity)
        const existingQuantity = purchasedGlasses[indexOfExisting].quantity
        const newQuantity = existingQuantity + purchaseQuantity
        const updateQuantity = {...purchasedGlasses[indexOfExisting], quantity: newQuantity, totalCost: newPrice }
          //const modifiedPurchasedGlasses = [...purchasedGlasses, updateQuantity]
         newPg =  purchasedGlasses.map( (purchase)=>{
            if(purchase.id === updateQuantity.id) {
              return updateQuantity
            }
            else {return purchase};
          })
    }
    else{alert("flop")}

      setPurchasedGlasses(newPg)
      //setPurchasedGlasses([...purchasedGlasses, newlyPurchased])
  }
  console.log("purchasedGlasses: ", purchasedGlasses);

  function handleReturnAll(itemId, returnQty) {
    //create patch and delete request
    console.log("");

  }

  function handlePartialReturn(itemId, updatedStock, newQuantity) {
    //patch request only
    fetch(`http://localhost:3004/glasses/${itemId}`, 
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

    //set purchasedglasses here with different quantity
    const index = purchasedGlasses.findIndex( (glass)=> glass.id === itemId)
    //purchasedGlasses[index].quantity = newQuantity
    const change = {...purchasedGlasses[index], quantity: newQuantity}
    const beforeChange = purchasedGlasses.slice(0, index)
    const afterChange = purchasedGlasses.slice(index + 1)
    console.log("index is: ", index)  
    // console.log("change: ", change);
    // console.log("before Change: ", beforeChange);
    // console.log("after change: ", afterChange);
    //setPurchasedGlasses([...beforeChange, ...change, ...afterChange ])

    })
  }

  return (
    <div>
      Money left: {moneyLeft}
      <Navbar/>
      <Switch>
        <Route path="/shop">
          <Shop onGlassPurchase={handleGlassPurchase} hats={hats} glasses={glasses}/>
        </Route>
        <Route exact path="/bag"><div><Bag onReturnAll={handleReturnAll} onPartialReturn={handlePartialReturn} purchasedGlasses={purchasedGlasses}/></div></Route>
        <Route path="/" exact>
          <div>Home component</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

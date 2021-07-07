import React, {useState, useEffect} from "react"
import { Route, Switch } from "react-router-dom"
import Navbar from "./Navbar";
import Shop from "./Shop";
import Bag from "./Bag";
function App() {

  const [hats, setHats] = useState([])
  const [glasses, setGlasses] = useState([])
  
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
  console.log(hats);
  console.log(glasses);


  return (
    <div>
      <Navbar/>
      <Switch>
        <Route path="/shop">
          <Shop hats={hats} glasses={glasses}/>
        </Route>
        <Route exact path="/bag"><div><Bag/></div></Route>
        <Route path="/" exact>
          <div>Home component</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

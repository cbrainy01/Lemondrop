import React from 'react'

function ItemHat({name, image, stock, price, id}) {
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <p>{stock} in stock</p>
            <p>{price}$</p>
            <button>Add to bag</button>
        </div>
    )
}

export default ItemHat

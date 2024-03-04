import React, { useState } from "react";

function PlantCard({ plant, onDelete, plants, setPlants }) {
  const [inStock, setInStock] = useState(true);
  const [update, setUpdate] = useState(false);
  const [price, setPrice] = useState(plant.price);

  function handleClick() {
    setInStock(!inStock)
  }
  
  function handlePriceClick() {
    setUpdate(!update)
  }

  function handleEnter(e) {
    if(e.key === 'Enter') {
      setUpdate(!update)
      fetch(`http://localhost:6001/plants/${plant.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({ price: price })
      })
      .then(res => res.json())
      .then(plant => {
        const newPlants = plants.map(p => {
          if(p.id === plant.id) {
            return {...p, price: plant.price }
          } else {
            return p
          }
        })
        setPlants(newPlants)
      })
    }
  }

  const inputPrice = <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} onKeyDown={handleEnter}/>
  const displayPrice = <p onClick={handlePriceClick}>Price: {plant.price}</p>

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {update ? inputPrice : displayPrice}
      {inStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={() => onDelete(plant.id)}>X</button>
    </li>
  );
}

export default PlantCard;

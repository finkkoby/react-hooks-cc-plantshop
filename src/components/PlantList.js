import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, setPlants }) {
  function handleDelete(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => setPlants(plants.filter(plant => plant.id !== id)))
  }

  const renderPlants = plants.map(plant => <PlantCard key={plant.id} plant={plant} onDelete={handleDelete} plants={plants} setPlants={setPlants}/>)

  return (
    <ul className="cards">{renderPlants}</ul>
  );
}

export default PlantList;

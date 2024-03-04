import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(res => res.json())
    .then(plants => setPlants(plants));
  }, [])

  const filteredPlants = plants.filter(plant => plant.name.toLowerCase().includes(search));

  return (
    <main>
      <NewPlantForm plants={plants} setPlants={setPlants}/>
      <Search search={search} setSearch={setSearch}/>
      <PlantList plants={filteredPlants} setPlants={setPlants}/>
    </main>
  );
}

export default PlantPage;

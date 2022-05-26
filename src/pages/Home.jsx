import React, { useState } from "react";
import SearchBar from '../components/home/SearchBar/index'
import FilterPanel from '../components/home/FilterPanel/index'
import List from '../components/home/List/index'
// import EmptyView from '../components/common/EmptyView/index'
import { dataList } from '../constants/index'
import './styles.css'

const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000,5000]);
  const [list, setList] = useState(dataList);
  const [cuisines, setCuisines] = useState([
    {
      id: 1,
      checked: false,
      label: 'American'
    },
    {
      id: 2,
      checked: false,
      label: 'Italian'
    },
    {
      id: 3,
      checked: false,
      label: 'Chinese'
    },
  ])

  const handleSelectCategory = (e, value) => !value ? null : setSelectedCategory(value);
  const handleSelectRating = (e, value) => !value ? null : setSelectedRating(value);
  const handlePriceChange = (e, value) => setSelectedPrice(value);
  const handleChangeChecked = id => {
    const cuisinesList = cuisines;
    const newCusineList = cuisinesList.map( item =>
      item.id === id  ? {...item, checked: !item.checked }: item
    ) 
    setCuisines(newCusineList);
  }

  return (
    <div className="home">
      {/* Search bar */}
      <SearchBar />

      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">

          {/* Side pannel */}
          <FilterPanel
            selectToggle={handleSelectCategory}
            selectedCategory={selectedCategory}
            selectRating={handleSelectRating}
            selectedRating={selectedRating}
            cuisines={cuisines}
            changeChecked = {handleChangeChecked}
            selectedPrice = {selectedPrice}
            changedPrice = {handlePriceChange}
          />
        </div>
        <div className="home_list-wrap">

          {/* List and empty view */}
          <List list = {list}/>
          
        </div>
      </div>


    </div>
  );
};

export default Home;

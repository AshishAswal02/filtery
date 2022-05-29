import React, { useEffect, useState } from "react";
import SearchBar from '../components/home/SearchBar/index'
import FilterPanel from '../components/home/FilterPanel/index'
import List from '../components/home/List/index'
import EmptyView from '../components/common/EmptyView/index'
import { dataList } from '../constants/index'
import { useDebounce } from 'use-debounce'
import './styles.css'

const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const [debouncedSelectedPrice] = useDebounce(selectedPrice, 1000);
  const [list, setList] = useState(dataList);
  const [inputSearch, setInputSearch] = useState('');
  const [debouncedInputSearch] = useDebounce(inputSearch, 1000);
  const [resultFound, setResultFound] = useState(false);
  const [cuisines, setCuisines] = useState([
    {
      id: 1,
      checked: false,
      label: 'Indian'
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

  const handleSelectCategory = (e, value) => {
    if (value === null) return setSelectedCategory(null);
    return !value ? null : setSelectedCategory(value)
  };
  const handleSelectRating = (e, value) => {
    if (value === null) return setSelectedRating(null);
    return !value ? null : setSelectedRating(value);
  }
  const handlePriceChange = (e, value) => setSelectedPrice(value);
  const handleChangeChecked = id => {
    const cuisinesList = cuisines;
    const newCusineList = cuisinesList.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )
    setCuisines(newCusineList);
  }



  const applyFilters = () => {
    let updatedList = dataList;

    //category filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        item => item.category === selectedCategory
      )
    }

    // cuisines filter
    const cuisinesChecked = cuisines
      .filter(item => item.checked)
      .map(item => item.label.toLocaleLowerCase());

    if (cuisinesChecked.length) {
      updatedList = updatedList.filter(
        item => cuisinesChecked.includes(item.cuisine)
      )
    }

    // price filter
    let minPrice = selectedPrice[0];
    let maxPrice = selectedPrice[1];
    updatedList = updatedList.filter(
      item => item.price >= minPrice && item.price <= maxPrice
    );

    // rating filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        item => parseInt(item.rating) === parseInt(selectedRating)
      )
    }

    // search filter
    if (debouncedInputSearch) {
      updatedList = updatedList.filter(
        item => {
          const itemTitle = item.title.toLocaleLowerCase();
          const inputString = debouncedInputSearch.toLocaleLowerCase().trim();

          return itemTitle.search(inputString) !== -1;
        }
      )
    }

    setList(updatedList);

    // if there are no results found after applying filters
    updatedList.length ? setResultFound(true) : setResultFound(false);
  }


  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedCategory, cuisines, debouncedSelectedPrice, debouncedInputSearch])


  return (
    <div className="home">
      {/* Search bar */}
      <SearchBar value={inputSearch} changeInput={e => setInputSearch(e.target.value)} />

      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">

          {/* Side pannel */}
          <FilterPanel
            selectToggle={handleSelectCategory}
            selectedCategory={selectedCategory}
            selectRating={handleSelectRating}
            selectedRating={selectedRating}
            cuisines={cuisines}
            changeChecked={handleChangeChecked}
            selectedPrice={selectedPrice}
            changedPrice={handlePriceChange}
          />
        </div>
        <div className="home_list-wrap">

          {/* List and empty view */}
          {
            resultFound ? <List list={list} /> : <EmptyView />
          }

        </div>
      </div>


    </div>
  );
};

export default Home;

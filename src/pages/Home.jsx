import React, { useEffect, useState } from "react";
import SearchBar from '../components/home/SearchBar/index'
import FilterPanel from '../components/home/FilterPanel/index'
import List from '../components/home/List/index'
import EmptyView from '../components/common/EmptyView/index'
import { dataList } from '../constants/index'
import { Drawer, Box, IconButton } from '@material-ui/core'
import {  } from '@material-ui/icons'
import { useDebounce } from 'use-debounce'
import { makeStyles } from "@material-ui/core"
import { FilterList, ExpandLess, ExpandMore} from "@material-ui/icons"
import './styles.css'

const useStyles = makeStyles({
  drawer: {
    height: "50%",
    width: '100%',
  },
  drawerPaper: {
    height: '50%',
    width: '100%',
    borderTopLeftRadius: '5%',
    borderTopRightRadius: '5%'
  },
  drawerPaper1: {
    height: "10%",
    width: '100%',
    borderTopLeftRadius: '5%',
    borderTopRightRadius: '5%'
  },
  filterBox: {
    margin: 22,
  },
  arrowBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: -25
  },
  arrow: {
    fontSize: 45,
    color: 'primary'
  },
  filterIcon: {
    fontSize: 30,
    // color: '#000',
    color: '#0000007d'
  }


})

const Home = () => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const [debouncedSelectedPrice] = useDebounce(selectedPrice, 1000);
  const [list, setList] = useState(dataList);
  const [inputSearch, setInputSearch] = useState('');
  const [debouncedInputSearch] = useDebounce(inputSearch, 1000);
  const [resultFound, setResultFound] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [drawerTutorial, setDrawerTutorial] = useState(false);
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
    if (value == null && window.screen.width >= 875) return setSelectedCategory(null);
    return !value ? null : setSelectedCategory(value)
  };
  const handleSelectRating = (e, value) => {
    if (value === null && window.screen.width >= 875) return setSelectedRating(null);
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


  //for tutorial purpose
  useEffect(() => {
    setTimeout(() => {
      setToggleDrawer(true);
      setDrawerTutorial(true);
    }, 1000)
    setTimeout(() => {
      setToggleDrawer(false);
    }, 2000);
    setTimeout(() => {
      setDrawerTutorial(false);
    }, 2500);
  },[])


  return (
    <div className="home">
      <header className="header">

        {/* Search bar */}
        <div className="searchbar">
          <SearchBar value={inputSearch} changeInput={e => setInputSearch(e.target.value)} />
        </div>
        <div className='options'>
          <IconButton className={classes.IconButton}
            onClick={() => setToggleDrawer(true)}
          >
            <FilterList className={classes.filterIcon}/>
          </IconButton>
        </div>

      </header>
      <body>

        <div className="home_panelList-wrap">

          {/* Side pannel */}
          <Drawer
            anchor="bottom"
            className={`${'classes.drawer show_drawer'} `}
            open={toggleDrawer}
            onOpen={() => setToggleDrawer(true)}
            onClose={() => setToggleDrawer(false)}
            classes={{ paper: drawerTutorial ? classes.drawerPaper1 : classes.drawerPaper }}
            >
            <Box className={classes.filterBox}>
              <Box className={classes.arrowBox} >
                {toggleDrawer ?
                  <ExpandMore className={classes.arrow} color='disabled'  />
                  :
                  <ExpandLess className={classes.arrow} color='disabled' />
                }
              </Box>
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
            </Box>
          </Drawer>

          <div className='home_panel-wrap'>
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
          {/* List and empty view */}
          <div className="home_list-wrap">
            {
              resultFound ? <List list={list} /> : <EmptyView />
            }
          </div>
        </div>
      </body>


    </div>
  );
};

export default Home;

import React from 'react'
import { SearchSharp } from '@material-ui/icons'
import './styles.css'
const SearchBar = ({ value, changeInput }) => {
  return (
    <div className="searchBar_wrap">
      <SearchSharp className='searchBar_icon' />
      <input type="text" placeholder='search...' value={value} onChange={changeInput} />
    </div>
  )
}

export default SearchBar
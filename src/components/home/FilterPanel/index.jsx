import React from 'react'
import FilterListToggle from '../../common/FilterListToggle'
import { categoryList, ratingList } from '../../../constants/index'
import CheckboxFilter from '../../common/CheckboxFilter/index'
import SliderFilter from '../../common/SliderFilter/index'
import './styles.css'

const FilterPanel = ({
  selectToggle,
  selectedCategory,
  selectRating,
  selectedRating,
  cuisines,
  changeChecked,
  selectedPrice,
  changedPrice
}) => {
  return (
    <div className='filter-panel'>
      {/* Category */}
      <div className="input-group">
        <p className="label">Category</p>
        <FilterListToggle
          options={categoryList}
          value={selectedCategory}
          selectToggle={selectToggle}
        />
      </div>
      {/* Cuisines */}
      <div className="input-group">
        <p className="label">Cuisines</p>
        {
          cuisines.map(cuisine => <CheckboxFilter key={cuisine.id} cuisine={cuisine} changeChecked={changeChecked} />)
        }
      </div>
      {/* Price Range */}
      <div className="input-group">
        <SliderFilter value={selectedPrice} changedPrice={changedPrice} />
      </div>

      {/* Star rating */}
      <div className="input-group">
        <p className="label">Start Rating</p>
        <FilterListToggle
          options={ratingList}
          value={selectedRating}
          selectToggle={selectRating}
        />

      </div>
    </div>
  )
}

export default FilterPanel
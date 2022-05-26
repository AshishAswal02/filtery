import React from 'react'
import './styles.css'
import  ListItem  from './ListItem/index'
const List = ({ list }) => {
  return (
    <div className='list-wrap'>
      {
        list.map(item => <ListItem key={item.id} item={item} />)
      }
    </div>
  )
}

export default List
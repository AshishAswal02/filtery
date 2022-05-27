import React from 'react'
import './styles.css'
const ListItem = ({ item: { title, serviceTime, deliveryFee, category, cuisine, rating, price, coverSrc } }) => {
    return (
        <div className='listItem-wrap'>
            <img src={coverSrc} alt="item image" />
            <header>
                <h4>{title}</h4>
                <span>⭐{rating}</span>
            </header>
            <footer>
                <p><b>{serviceTime}</b> &nbsp; <span> Delivery fee ${deliveryFee}</span></p>
                <p><b>${price}</b></p>
            </footer>
        </div>
    )
}

export default ListItem
import React, { useState } from "react";
import "./Card.css";
import Button from "../Button/Button";

function Card({ food, onAdd, onRemove }) {
    const [count, setCount] = useState(0)
    const { title, Image, price, id } = food;

    const handleIncrement = () => {
        setCount(count + 1)
        onAdd(food)
    }

    const handleDecrement = () => {
        setCount(count - 1)
        onRemove(food)
    }

    return (
        <div className='card'>
            <span className={`${count !== 0 ? 'card_badge' : 'card_badge--hidden'}`}>
                {count}
            </span>
            <div className="image_container">
                <img src={Image} alt={title} />
            </div>
            <div className="title_container">
                <div>
                    <h1 className='card_title'>{title}</h1>
                    <h4 className='card_title'><span className='card_price'>{price}</span></h4>
                </div>
                <div className="btn_container">
                    <Button title={'+'} type={'add'} onClick={handleIncrement} />
                    {count !== 0 ? (<Button title={'-'} type={'remove'} onClick={handleDecrement} />) : ("")}
                </div>
            </div>
        </div>
    )
}

export default Card
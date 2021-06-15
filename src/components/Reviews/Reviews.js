import React from 'react';
import "./Reviews.css";
import ReactPlayer from 'react-player';

export default function Reviews(props) {
    return (
        <div className="container">
            <h3>Ratings</h3>
            <h4>{props.rating}</h4>
            <p>{props.desc}</p>
            
        </div>
    )
}

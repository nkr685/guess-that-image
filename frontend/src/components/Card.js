import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, thumbnail, linkTo, onClick }) => {
  return (
    <div className="card">
      <Link to={linkTo} className="card-link" onClick={onClick}>
        <div className="card-overlay">
          <h3 className="card-title">{title}</h3>
        </div>
        <img src={thumbnail} alt={`Thumbnail for ${title}`} className="card-thumbnail" />
      </Link>
    </div>)
};

export default Card;
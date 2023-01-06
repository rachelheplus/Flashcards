import './Card.scss';

// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React from 'react';

const Card = ({ data }) => {
  const { back, difficulty, front, hints, scheduled, title, user_id, _id } =
    data;
  // const navigate = useNavigate();
  return (
    <Link to={`/flashcard/${_id}`} style={{ textDecoration: 'none' }}>
      <div className="flashcard-container">
        <div className="flashcard-title">{title ?? 'no title'}</div>
        <div className="flashcard-front">{front ?? 'no front'}</div>
      </div>
    </Link>
  );
};

export default Card;
